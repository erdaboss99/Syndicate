import { redirect } from 'next/navigation';

import { type Appointment, type Booking, type Issue, type User } from '@prisma/client';

import { getBookings } from '@/data/booking';
import { getCurrentUser } from '@/lib/auth';
import {
	getIntervalFromDay,
	isAppointmentCurrentlyInProgress,
	isAppointmentExpired,
	isAppointmentUpcoming,
} from '@/lib/date';
import { DEFAULT_AUTHENTICATED_REDIRECT } from '@/routes';

import { BookingDetails } from '@/components/bookings/BookingDetails';
import { CardWrapper } from '@/components/general/CardWrapper';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { CardHeader } from '@/components/ui/Card';
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/components/ui/Carousel';

const DailyBookingsPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role === 'USER') redirect(DEFAULT_AUTHENTICATED_REDIRECT);

	const todayInterval = getIntervalFromDay(new Date());

	const bookingData = await getBookings({
		where: {
			Appointment: {
				startTime: {
					gte: todayInterval.start,
					lte: todayInterval.end,
				},
			},
		},
		select: {
			id: true,
			description: true,
			createdAt: true,
			Issue: {
				select: {
					name: true,
					description: true,
				},
			},
			Appointment: {
				select: {
					startTime: true,
				},
			},
			User: {
				select: {
					id: true,
					name: true,
					email: true,
				},
			},
		},
	});

	const expiredBookingData = bookingData.filter((booking) => isAppointmentExpired(booking.Appointment.startTime));
	const inProgressBookingData = bookingData.filter((booking) =>
		isAppointmentCurrentlyInProgress(booking.Appointment.startTime),
	);
	const upcomingBookingData = bookingData.filter((booking) => isAppointmentUpcoming(booking.Appointment.startTime));

	return (
		<CardWrapper
			headerTitle='Daily bookings'
			size='MD'
			navigationTree={[
				{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' },
				{ nodeLabel: 'Daily bookings', nodeHref: 'daily-bookings' },
			]}
			linkLabel='Back to the dashboard'
			linkHref='/dashboard'>
			<Accordion
				type='single'
				collapsible>
				<DailyBookingCarousel
					title='Expired'
					bookings={expiredBookingData}
				/>
				<DailyBookingCarousel
					title='In Progress'
					bookings={inProgressBookingData}
				/>
				<DailyBookingCarousel
					title='Upcoming'
					bookings={upcomingBookingData}
				/>
			</Accordion>
		</CardWrapper>
	);
};

export default DailyBookingsPage;

type DailyBookingCarouselItemProps = {
	Issue: Pick<Issue, 'name' | 'description'>;
	Appointment: Pick<Appointment, 'startTime'>;
	User: Pick<User, 'id' | 'name' | 'email'>;
} & Pick<Booking, 'id' | 'description' | 'createdAt'>;

type DailyBookingCarouselProps = {
	title: string;
	bookings: DailyBookingCarouselItemProps[];
};

const DailyBookingCarouselItem = ({
	description,
	createdAt,
	Issue,
	Appointment,
	User,
}: DailyBookingCarouselItemProps) => {
	return (
		<div className='h-fit space-y-4 rounded border'>
			<BookingDetails
				description={description}
				createdAt={createdAt}
				Issue={Issue}
				Appointment={Appointment}
				User={User}
			/>
		</div>
	);
};

const DailyBookingCarousel = ({ title, bookings }: DailyBookingCarouselProps) => {
	if (bookings.length === 0) return null;
	return (
		<AccordionItem value={title}>
			<AccordionTrigger>
				<CardHeader variant='secondary'>{title}</CardHeader>
			</AccordionTrigger>
			<AccordionContent>
				<Carousel
					dotsPosition='bottom'
					opts={{
						align: 'start',
					}}
					className='mx-auto mb-5 w-full pb-5'>
					<CarouselContent>
						{bookings.map((booking) => (
							<CarouselItem key={booking.id}>
								<div className='space-y-4'>
									<DailyBookingCarouselItem
										id={booking.id}
										description={booking.description}
										createdAt={booking.createdAt}
										Issue={booking.Issue}
										Appointment={booking.Appointment}
										User={booking.User}
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselDots gap='lg' />
				</Carousel>
			</AccordionContent>
		</AccordionItem>
	);
};
