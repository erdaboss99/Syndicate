import { getCurrentUser } from '@/lib/auth';

import AccountWrapper from '@/components/account/AccountWrapper';
import LinkButton from '@/components/general/LinkButton';
import { CardContent, CardFooter } from '@/components/ui/Card';

type UserInfoSectionProps = {
	name: string;
	value: string;
};

const UserInfoSection = ({ name, value }: UserInfoSectionProps) => {
	return (
		<div className='flex flex-row items-center justify-between rounded-lg border bg-secondary/10 p-3 shadow-sm'>
			<p className='text-sm font-medium md:text-base'>{name}</p>
			<p className='rounded-sm bg-secondary/90 p-[0.6rem] font-mono text-xs'>{value}</p>
		</div>
	);
};

const UserInfo = async () => {
	const user = await getCurrentUser();

	return (
		<AccountWrapper headerTitle='Account information'>
			<div className='space-y-6'>
				<CardContent>
					<div className='space-y-4'>
						<UserInfoSection
							name='Name'
							value={user?.name as string}
						/>
						<UserInfoSection
							name='Email'
							value={user?.email as string}
						/>
						<UserInfoSection
							name='Role'
							value={user?.role as string}
						/>
						<UserInfoSection
							name='Provider'
							value={user?.isOAuth ? 'OAUth' : 'Credentials'}
						/>
					</div>
				</CardContent>
				<CardFooter className='flex flex-col items-center justify-center space-y-4'>
					<LinkButton
						buttonLabel='Edit account information'
						buttonHref='/account/edit'
						buttonVariant='outline'
						buttonSize='full'
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
