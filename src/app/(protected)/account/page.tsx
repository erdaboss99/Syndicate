import { getCurrentUser } from '@/lib/auth';
import { formatDate } from '@/lib/date';

import AccountDeleteForm from '@/components/account/AccountDeleteForm';
import AccountEditForm from '@/components/account/AccountEditForm';
import AccountWrapper from '@/components/account/AccountWrapper';
import ConfirmDialog from '@/components/general/ConfirmDialog';
import FormInfo from '@/components/general/FormInfo';
import LoginProviderBadge from '@/components/general/LoginProviderBadge';
import UserRoleBadge from '@/components/general/UserBadge';
import { Badge } from '@/components/ui/Badge';
import { CardContent, CardFooter } from '@/components/ui/Card';
const AccountPage = async () => {
	const user = await getCurrentUser();

	const isOAuth = user?.provider !== 'Credentials';
	return (
		<AccountWrapper
			navigationTree={[{ nodeLabel: 'Account', nodeHref: 'account' }]}
			headerTitle='Account information'>
			<div className='space-y-6'>
				<CardContent>
					<div className='space-y-4'>
						<div className='flex flex-row items-center justify-between rounded-lg border bg-secondary/10 p-3 shadow-sm'>
							<p className='text-sm font-medium md:text-base'>Name</p>
							<p className='rounded-sm bg-secondary/90 p-[0.5rem] font-mono text-xs'>{user?.name!}</p>
						</div>
						<div className='flex flex-row items-center justify-between rounded-lg border bg-secondary/10 p-3 shadow-sm'>
							<p className='text-sm font-medium md:text-base'>Email</p>
							<p className='rounded-sm bg-secondary/90 p-[0.5rem] font-mono text-xs'>{user?.email!}</p>
						</div>
						<div className='flex flex-row items-center justify-between rounded-lg border bg-secondary/10 p-3 shadow-sm'>
							<p className='text-sm font-medium md:text-base'>Role</p>
							<UserRoleBadge
								role={user?.role!}
								badgeVariant='outline'
							/>
						</div>
						<div className='flex flex-row items-center justify-between rounded-lg border bg-secondary/10 p-3 shadow-sm'>
							<p className='text-sm font-medium md:text-base'>Login provider</p>
							<LoginProviderBadge
								provider={user?.provider!}
								badgeVariant='outline'
							/>
						</div>
						<div className='flex flex-row items-center justify-between rounded-lg border bg-secondary/10 p-3 shadow-sm'>
							<p className='text-sm font-medium md:text-base'>Account created at</p>
							<Badge variant='outline'>{formatDate(user?.createdAt!, 'WRITTEN_SHORT_DATE_TIME')}</Badge>
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex flex-col items-center justify-center space-y-4'>
					{!isOAuth && (
						<ConfirmDialog
							title='Edit account'
							description="Make changes to your account here. Click save when you're done."
							triggerButtonLabel='Edit account information'
							triggerButtonVariant='default'
							triggerButtonSize='full'>
							<AccountEditForm />
						</ConfirmDialog>
					)}
					<FormInfo
						message={
							isOAuth
								? 'User data cannot be changed in accounts created using a third-party provider!'
								: ''
						}
					/>
					<ConfirmDialog
						title='Delete account'
						description='This action is irreversible. All data will be lost. Are you sure you want to delete your account?'
						triggerButtonLabel='Delete account'
						triggerButtonVariant='outline'
						triggerButtonSize='full'>
						<AccountDeleteForm />
					</ConfirmDialog>
				</CardFooter>
			</div>
		</AccountWrapper>
	);
};

export default AccountPage;
