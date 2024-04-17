import { type Appointment, type Booking, type Issue } from '@prisma/client';

import { getBookings } from '@/data/booking';
import { getCurrentUser } from '@/lib/auth';
import { formatDate } from '@/lib/date';

import BookingCancelForm from '@/components/bookings/BookingCancelForm';
import { CardWrapper } from '@/components/general/CardWrapper';
import { BaseDetailsField, HighlightedDetailsField } from '@/components/general/DetailsField';
import LinkButton from '@/components/general/LinkButton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/components/ui/Carousel';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/Dialog';

const BookingsPage = async () => {
	const currentUser = await getCurrentUser();

	const bookings = await getBookings({
		where: {
			userId: currentUser?.id,
		},
		select: {
			id: true,
			description: true,
			createdAt: true,
			Appointment: {
				select: {
					startTime: true,
				},
			},
			Issue: {
				select: {
					name: true,
					description: true,
				},
			},
		},
	});

	return (
		<CardWrapper
			navigationTree={[{ nodeLabel: 'Booked appointments', nodeHref: 'bookings' }]}
			headerTitle='Booked appointments'
			size='MD'>
			<BookedAppointmentsCarousel bookings={bookings} />
		</CardWrapper>
	);
};

export default BookingsPage;

type DailyBookingCarouselItemProps = {
	Issue: Pick<Issue, 'name' | 'description'>;
	Appointment: Pick<Appointment, 'startTime'>;
} & Pick<Booking, 'id' | 'description' | 'createdAt'>;

type DailyBookingCarouselProps = {
	bookings: DailyBookingCarouselItemProps[];
};

const BookedAppointmentsCarouselItem = ({
	id,
	description,
	createdAt,
	Issue,
	Appointment,
}: DailyBookingCarouselItemProps) => {
	return (
		<div className='h-fit space-y-4 rounded border'>
			<HighlightedDetailsField
				fieldDataTestId='booking-appointment'
				label='Appointment'
				value={formatDate(Appointment.startTime, 'WRITTEN_LONG_DATE_TIME')}
			/>
			<BaseDetailsField
				fieldDataTestId='booking-description'
				label='Description'>
				{description}
			</BaseDetailsField>
			<BaseDetailsField
				fieldDataTestId='booking-created-at'
				label='Created at'>
				<Badge variant='outline'>{formatDate(createdAt, 'WRITTEN_SHORT_DATE_TIME')}</Badge>
			</BaseDetailsField>
			<HighlightedDetailsField
				fieldDataTestId='booking-issue-name'
				label='Issue name'
				value={Issue.name}
			/>
			<BaseDetailsField
				fieldDataTestId='booking-issue-description'
				label='Issue description'>
				{Issue.description}
			</BaseDetailsField>
			<Dialog>
				<DialogTrigger asChild>
					<Button
						data-testid='booking-cancel-trigger'
						variant='destructive'
						size='full'>
						Cancel booking
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>{`Cancel booking for ${formatDate(
							Appointment.startTime,
							'WRITTEN_SHORT_DATE_TIME',
						)}`}</DialogTitle>
						<DialogDescription>This action is irreversible. Please proceed with caution.</DialogDescription>
					</DialogHeader>
					<BookingCancelForm id={id} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

const BookedAppointmentsCarousel = ({ bookings }: DailyBookingCarouselProps) => {
	if (bookings.length === 0)
		return (
			<div className='flex items-center justify-center'>
				<LinkButton
					linkSize='lg'
					linkVariant='default'
					linkLabel='You have no bookings currently. Book an appointment now!'
					linkHref='/appointments'
				/>
			</div>
		);
	return (
		<>
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
								<BookedAppointmentsCarouselItem
									id={booking.id}
									description={booking.description}
									createdAt={booking.createdAt}
									Issue={booking.Issue}
									Appointment={booking.Appointment}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselDots gap='lg' />
			</Carousel>
		</>
	);
};
