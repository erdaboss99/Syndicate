import {
	ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_DISABLED_INFO,
	ACTION_ONLY_ADMIN_ERROR,
	ACTION_ONLY_AUTHENTICATED_ERROR,
} from '@/constants';
import { deleteUniqueBooking, getBookings } from '@/data/booking';
import { getAutoExpiredBookingDeletionStatus, getSendAutoActionReportEmailStatus } from '@/data/configuration';
import { type ExpiredBookingDeletionTemplateProps } from '@/emails/ExpiredBookingDeletion';
import { getCurrentUser } from '@/lib/auth';
import { formatDatesInObject } from '@/lib/date';
import { sendExpiredBookingDeletionReport } from '@/lib/mail';

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

	const autoExpiredBookingDeletion = await getAutoExpiredBookingDeletionStatus();

	if (Boolean(autoExpiredBookingDeletion)) {
		const currentTime = new Date();
		const expiredBookings = await getBookings({
			where: { Appointment: { startTime: { lte: currentTime } } },
			select: { id: true },
		});

		const deletedBookings = [];
		for (const booking of expiredBookings) {
			deletedBookings.push(
				await deleteUniqueBooking({
					where: { id: booking.id },
					select: {
						description: true,
						User: { select: { name: true, email: true } },
						Appointment: { select: { startTime: true } },
						Issue: { select: { name: true } },
					},
				}),
			);
		}

		const deletedExpiredBookings = deletedBookings.map((booking) => {
			return {
				userName: booking!.User.name,
				userEmail: booking!.User.email,
				appointmentStartTime: booking!.Appointment.startTime,
				bookingDescription: booking!.description,
				issueName: booking!.Issue.name,
			};
		});

		const reportEmailParams: ExpiredBookingDeletionTemplateProps = {
			message: `${deletedBookings.length} bookings were deleted due to expiration.`,
			deletedExpiredBookings,
		};

		const sendAutoActionReportEmailStatus = await getSendAutoActionReportEmailStatus();
		if (Boolean(sendAutoActionReportEmailStatus)) await sendExpiredBookingDeletionReport(reportEmailParams);

		return new Response(JSON.stringify(formatDatesInObject(reportEmailParams)), {
			status: 201,
		});
	}
	return new Response(
		JSON.stringify({
			message: ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_DISABLED_INFO,
		}),
		{ status: 200 },
	);
}
