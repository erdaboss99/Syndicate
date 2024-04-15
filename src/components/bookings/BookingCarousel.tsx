import BookingCard, { type BookingCardProps } from '@/components/bookings/BookingCard';
import { CardHeader } from '@/components/ui/Card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/Carousel';

type BookingCarouselProps = {
	bookings: BookingCardProps[];
};

const BookingCarousel = ({ bookings }: BookingCarouselProps) => {
	if (bookings.length === 0) return null;
	return (
		<>
			<CardHeader variant='secondary'>User&apos;s Existing bookings</CardHeader>
			<Carousel
				autoPlay={5000}
				opts={{
					align: 'start',
					loop: true,
				}}
				className='mx-auto w-full'>
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
			</Carousel>
		</>
	);
};

export default BookingCarousel;
