import { formatDate } from '@/lib/date';

import { BaseDetailsField } from '@/components/general/DetailsField';
import LinkTile from '@/components/general/LinkTile';
import { CardHeader } from '@/components/ui/Card';
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/components/ui/Carousel';

export type BookingCardProps = {
	id: string;
	description: string;
	Issue: {
		id: string;
		name: string;
	};
	Appointment: {
		id: string;
		startTime: Date;
	};
};

const BookingCard = ({ id, description, Issue, Appointment }: BookingCardProps) => {
	return (
		<LinkTile tileHref={`/dashboard/manage-bookings/${id}`}>
			<BaseDetailsField label='Appointment'>
				{formatDate(Appointment.startTime, 'WRITTEN_LONG_DATE_TIME')}
			</BaseDetailsField>
			<BaseDetailsField label='Description'>{description}</BaseDetailsField>
			<BaseDetailsField label='Issue name'>{Issue.name}</BaseDetailsField>
		</LinkTile>
	);
};

type BookingCarouselProps = {
	bookings: BookingCardProps[];
};

const BookingCarousel = ({ bookings }: BookingCarouselProps) => {
	if (bookings.length === 0) return null;
	return (
		<>
			<CardHeader variant='secondary'>User&apos;s existing bookings</CardHeader>
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
								<BookingCard
									id={booking.id}
									description={booking.description}
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

export default BookingCarousel;
