import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth';

import { formatDate } from '@/lib/date';

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from '@/routes';

import AccountWrapper from '@/components/account/AccountWrapper';
import FormInfo from '@/components/general/FormInfo';
import LinkButton from '@/components/general/LinkButton';
import { CardContent, CardFooter } from '@/components/ui/Card';

const UserInfo = async () => {
	const user = await getCurrentUser();
	if (!user) redirect(DEFAULT_UNAUTHENTICATED_REDIRECT);

	const isOAuth = user.provider !== 'Credentials';

	const accountData = [
		{ name: 'Name', value: user.name },
		{ name: 'Email', value: user.email },
		{ name: 'Role', value: user.role },
		{ name: 'Provider', value: user.provider },
		{ name: 'Account created at', value: formatDate(user.createdAt, 'writtenShortDateTime') },
	];

	return (
		<AccountWrapper headerTitle='Account information'>
			<div className='space-y-6'>
				<CardContent>
					<div className='space-y-4'>
						{accountData.map((data) => (
							<div
								key={data.name}
								className='flex flex-row items-center justify-between rounded-lg border bg-secondary/10 p-3 shadow-sm'>
								<p className='text-sm font-medium md:text-base'>{data.name}</p>
								<p className='rounded-sm bg-secondary/90 p-[0.6rem] font-mono text-xs'>{data.value}</p>
							</div>
						))}
					</div>
				</CardContent>
				<CardFooter className='flex flex-col items-center justify-center space-y-4'>
					{!isOAuth && (
						<LinkButton
							buttonLabel='Edit account information'
							buttonHref='/account/edit'
							buttonVariant='outline'
							buttonSize='full'
						/>
					)}
					<FormInfo
						message={
							isOAuth
								? 'User data cannot be changed in accounts created using a third-party provider!'
								: ''
						}
					/>
					<LinkButton
						buttonLabel='Delete account'
						buttonHref='/account/delete'
						buttonVariant='destructive'
						buttonSize='full'
					/>
				</CardFooter>
			</div>
		</AccountWrapper>
	);
};

export default UserInfo;
