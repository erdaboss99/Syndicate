import { FaRegUserCircle } from 'react-icons/fa';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

type UserAvatarProps = {
	src: string | null;
};

const UserAvatar = ({ src }: UserAvatarProps) => {
	return (
		<Avatar className='h-9 w-9'>
			<AvatarImage src={src || ''} />
			<AvatarFallback className='bg-transparent'>
				<FaRegUserCircle className='h-8 w-8' />
			</AvatarFallback>
		</Avatar>
	);
};

export default UserAvatar;
