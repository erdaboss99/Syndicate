import {
	ACTION_APPOINTMENT_AUTO_DELETION_DISABLED_INFO,
	ACTION_ONLY_ADMIN_ERROR,
	ACTION_ONLY_AUTHENTICATED_ERROR,
} from '@/constants';
import { getAutoBookingDeletionStatus, getExpiredBookings } from '@/data/booking';
import { type BookingDeletionTemplateProps } from '@/emails/BookingDeletion';
import { getCurrentUser } from '@/lib/auth';
import { database } from '@/lib/database';
import { formatDatesInObject } from '@/lib/date';
import { sendBookingDeletionReport } from '@/lib/mail';

export async function DELETE() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return new Response(JSON.stringify({ message: ACTION_ONLY_AUTHENTICATED_ERROR }), {
			status: 401,
		});
	}

	if (currentUser.role !== 'ADMIN')
		return new Response(JSON.stringify({ message: ACTION_ONLY_ADMIN_ERROR }), {
			status: 403,
		});

	const autoExpiredBookingDeletion = await getAutoBookingDeletionStatus();

	if (Boolean(autoExpiredBookingDeletion)) {
		const expiredBookings = await getExpiredBookings();

		const deletedBookings = [];
		for (const booking of expiredBookings) {
			deletedBookings.push(
				await database.booking.delete({
					where: {
						id: booking.id,
					},
					select: {
						description: true,
						User: {
							select: {
								name: true,
								email: true,
							},
						},
						Appointment: {
							select: {
								startTime: true,
							},
						},
						Issue: {
							select: {
								name: true,
							},
						},
					},
				}),
			);
		}
		const purgedBookings = deletedBookings.map((booking) => {
			return {
				userName: booking.User.name!,
				userEmail: booking.User.email!,
				appointmentStartTime: booking.Appointment.startTime,
				bookingDescription: booking.description,
				issueName: booking.Issue.name,
			};
		});

		const reportEmailParams: BookingDeletionTemplateProps = {
			message: `${deletedBookings.length} bookings were deleted due to expiration.`,
			deletedBookings: purgedBookings,
		};
		await sendBookingDeletionReport(reportEmailParams);

		return new Response(JSON.stringify(formatDatesInObject(reportEmailParams)), {
			status: 201,
		});
	}
	return new Response(
		JSON.stringify({
			message: ACTION_APPOINTMENT_AUTO_DELETION_DISABLED_INFO,
		}),
		{ status: 200 },
	);
}
