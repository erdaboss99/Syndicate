import { redirect } from 'next/navigation';

import { type Appointment, type Booking, type Issue } from '@prisma/client';

import { getUser } from '@/data/user';
import { getCurrentUser, getLoginProvider } from '@/lib/auth';
import { formatDate } from '@/lib/date';
import { DEFAULT_AUTHENTICATED_REDIRECT } from '@/routes';
import { UserDetailsQueryParamsSchema } from '@/schemas';

import AccountDetails from '@/components/account/AccountDetails';
import { CardWrapper } from '@/components/general/CardWrapper';
import { BaseDetailsField } from '@/components/general/DetailsField';
import ErrorCard from '@/components/general/ErrorCard';
import LinkTile from '@/components/general/LinkTile';
import { CardHeader } from '@/components/ui/Card';
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/components/ui/Carousel';

type UsersBookingCarouselItemProps = {
	Issue: Pick<Issue, 'name'>;
	Appointment: Pick<Appointment, 'startTime'>;
} & Pick<Booking, 'id' | 'description'>;

type UsersBookingCarouselProps = {
	bookings: UsersBookingCarouselItemProps[];
};

const UserDetailsPage = async ({ params }: { params: { userId: string } }) => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect(DEFAULT_AUTHENTICATED_REDIRECT);

	const { userId } = params;
	const paramsData = UserDetailsQueryParamsSchema.safeParse(userId);

	if (!paramsData.success)
		return (
			<ErrorCard
				headerTitle='Invalid data'
				message={paramsData.error.errors[0].message}
				linkLabel='Back to manage users'
				linkHref='/dashboard/manage-users'
			/>
		);

	const userData = await getUser({
		where: { id: paramsData.data },
		select: {
			id: true,
			name: true,
			email: true,
			image: true,
			role: true,
			createdAt: true,
			accounts: { select: { provider: true } },
			bookings: {
				select: {
					id: true,
					description: true,
					Issue: { select: { name: true } },
					Appointment: { select: { startTime: true } },
				},
			},
		},
	});

	const loginProvider = getLoginProvider(userData?.accounts[0]?.provider);

	if (!userData)
		return (
			<ErrorCard
				headerTitle='Invalid data'
				message='User not found'
				linkLabel='Back to manage users'
				linkHref='/dashboard/manage-users'
			/>
		);

	return (
		<CardWrapper
			navigationTree={[
				{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' },
				{ nodeLabel: 'Manage users', nodeHref: 'manage-users' },
				{ nodeLabel: 'User details', nodeHref: userData.id },
			]}
			headerTitle='User details'
			size='SM'
			linkLabel='Back to manage users'
			linkHref='/dashboard/manage-users'>
			<div className='space-y-4'>
				<AccountDetails
					image={userData?.image}
					name={userData?.name!}
					email={userData?.email!}
					role={userData?.role!}
					provider={loginProvider}
					createdAt={userData?.createdAt!}
				/>
			</div>
			<UsersBookingCarousel bookings={userData.bookings} />
		</CardWrapper>
	);
};

export default UserDetailsPage;

const UsersBookingCarouselItem = ({ id, description, Issue, Appointment }: UsersBookingCarouselItemProps) => {
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

const UsersBookingCarousel = ({ bookings }: UsersBookingCarouselProps) => {
	if (bookings.length === 0) return <CardHeader variant='secondary'>This user has no bookings yet.</CardHeader>;
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
								<UsersBookingCarouselItem
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
