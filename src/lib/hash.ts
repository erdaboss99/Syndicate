import bcrypt from 'bcryptjs';
export const hash = async (data: string) => {
	const hashedData = await bcrypt.hash(data, 10);
	return hashedData;
};

export const compare = async (data: string, hashedData: string) => {
	const match = await bcrypt.compare(data, hashedData);
	return match;
};
