import { Prisma } from '@prisma/client';

import { database } from '@/lib/database';

export const getUniqueAppointment = async <
	K extends Prisma.AppointmentWhereUniqueInput,
	T extends Prisma.AppointmentSelect,
>(options: {
	where: K;
	select: T;
}): Promise<Prisma.AppointmentGetPayload<{ select: T }> | null> => {
	try {
		const appointment = await database.appointment.findUnique({
			where: options.where,
			select: options.select,
		});
		return appointment;
	} catch (error) {
		return null;
	}
};

export const getAppointment = async <
	K extends Prisma.AppointmentWhereInput,
	T extends Prisma.AppointmentSelect,
>(options: {
	where: K;
	select: T;
}): Promise<Prisma.AppointmentGetPayload<{ select: T }> | null> => {
	try {
		const appointment = await database.appointment.findFirst({
			where: options.where,
			select: options.select,
		});
		return appointment;
	} catch (error) {
		return null;
	}
};

export const getAppointments = async <
	K extends Prisma.AppointmentWhereInput,
	T extends Prisma.AppointmentSelect,
>(options: {
	where?: K;
	select: T;
}): Promise<Prisma.AppointmentGetPayload<{ select: T }>[]> => {
	try {
		const appointments = await database.appointment.findMany({
			where: options.where,
			select: options.select,
			orderBy: {
				startTime: 'asc',
			},
		});
		return appointments;
	} catch (error) {
		return [];
	}
};

export const aggregateAppointments = async <
	K extends Prisma.AppointmentWhereInput,
	T extends Prisma.AppointmentAggregateArgs,
>(options: {
	where?: K;
	aggregate: T;
}): Promise<Prisma.GetAppointmentAggregateType<T> | null> => {
	try {
		const { aggregate } = options;
		const aggregation = await database.appointment.aggregate({
			where: options.where,
			...aggregate,
		});
		return aggregation;
	} catch (error) {
		return null;
	}
};
