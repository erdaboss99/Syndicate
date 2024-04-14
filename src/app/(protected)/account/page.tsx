import { getCurrentUser } from '@/lib/auth';

import AccountDeleteForm from '@/components/account/AccountDeleteForm';
import AccountDetails from '@/components/account/AccountDetails';
import AccountEditForm from '@/components/account/AccountEditForm';
import AccountWrapper from '@/components/account/AccountWrapper';
import ConfirmDialog from '@/components/general/ConfirmDialog';
import FormInfo from '@/components/general/FormInfo';
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
						<AccountDetails
							image={user?.image!}
							name={user?.name!}
							email={user?.email!}
							role={user?.role!}
							provider={user?.provider!}
							createdAt={user?.createdAt!}
						/>
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
