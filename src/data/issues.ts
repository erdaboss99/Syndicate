import { database } from '@/lib/database';

export const getIssueCount = async (variant: 'all' | 'currentlyUsed') => {
	try {
		switch (variant) {
			case 'all':
				const allIssues = await database.issue.aggregate({
					_count: {
						id: true,
					},
				});
				return allIssues._count.id;
			case 'currentlyUsed':
				const currentlyUsedIssues = await database.issue.aggregate({
					_count: {
						id: true,
					},
					where: {
						bookings: {
							some: {
								id: {
									not: undefined,
								},
							},
						},
					},
				});
				return currentlyUsedIssues._count.id;
		}
	} catch (error) {
		return null;
	}
};

export const getIssues = async () => {
	try {
		const issues = await database.issue.findMany();
		return issues;
	} catch (error) {
		return [];
	}
};
