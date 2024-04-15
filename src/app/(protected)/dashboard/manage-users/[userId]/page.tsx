import { getSelectedUserDataSubset } from '@/data/user';
import { getLoginProvider } from '@/lib/auth';
import { UserDetailsQueryParamsSchema } from '@/schemas';

import AccountDetails from '@/components/account/AccountDetails';
import BookingCarousel from '@/components/bookings/BookingCarousel';
import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import ErrorCard from '@/components/general/ErrorCard';

const UserDetailsPage = async ({ params }: { params: { userId: string } }) => {
	const { userId } = params;
	const paramsData = UserDetailsQueryParamsSchema.safeParse(userId);

	if (!paramsData.success)
		return (
			<ErrorCard
				headerTitle='Invalid data'
				message={paramsData.error.errors[0].message}
				buttonLabel='Back to manage users'
				buttonVariant='default'
				buttonSize='lg'
				buttonHref='/dashboard/manage-users'
			/>
		);

	const userData = await getSelectedUserDataSubset({
		id: paramsData.data,
		select: {
			id: true,
			name: true,
			email: true,
			image: true,
			role: true,
			createdAt: true,
			accounts: {
				select: {
					provider: true,
				},
			},
			bookings: {
				select: {
					id: true,
					description: true,
					Issue: {
						select: {
							id: true,
							name: true,
						},
					},
					Appointment: {
						select: {
							id: true,
							startTime: true,
						},
					},
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
				buttonLabel='Back to manage users'
				buttonVariant='default'
				buttonSize='lg'
				buttonHref='/dashboard/manage-users'
			/>
		);

	return (
		<DashboardWrapper
			navigationTree={[
				{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' },
				{ nodeLabel: 'Manage users', nodeHref: 'manage-users' },
				{ nodeLabel: 'User details', nodeHref: userData.id },
			]}
			headerTitle='User details'
			size='MD'
			buttonLabel='Back to manage users'
			buttonHref='/dashboard/manage-users'
			buttonSize='full'
			buttonVariant='link'>
			<div className='space-y-4'>
				<AccountDetails
					image={userData?.image!}
					name={userData?.name!}
					email={userData?.email!}
					role={userData?.role!}
					provider={loginProvider}
					createdAt={userData?.createdAt!}
				/>
			</div>
			<BookingCarousel bookings={userData.bookings} />
		</DashboardWrapper>
	);
};

export default UserDetailsPage;
