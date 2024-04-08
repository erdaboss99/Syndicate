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
							every: {
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
