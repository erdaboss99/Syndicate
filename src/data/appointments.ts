import { database } from '@/lib/database';

export const getAppointmentCount = async (variant: 'booked' | 'available') => {
	try {
		switch (variant) {
			case 'booked':
				const bookedAppointments = await database.appointment.aggregate({
					_count: {
						id: true,
					},
					where: {
						Booking: {
							id: {
								not: undefined,
							},
						},
					},
				});
				return bookedAppointments._count.id;
			case 'available':
				const availableAppointments = await database.appointment.aggregate({
					_count: {
						id: true,
					},
					where: {
						Booking: null,
					},
				});
				return availableAppointments._count.id;
		}
	} catch (error) {
		return null;
	}
};
