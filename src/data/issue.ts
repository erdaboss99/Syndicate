import { Prisma } from '@prisma/client';

import { database } from '@/lib/database';

export const getIssues = async <T extends Prisma.IssueSelect, K extends Prisma.IssueWhereInput>(options: {
	where?: K;
	select: T;
}): Promise<Prisma.IssueGetPayload<{ select: T }>[]> => {
	try {
		const issues = await database.issue.findMany({
			where: options.where,
			select: options.select,
		});
		return issues;
	} catch (error) {
		return [];
	}
};

export const getIssueCount = async (options: { status: 'ALL' | 'USED' }) => {
	try {
		switch (options.status) {
			case 'ALL':
				const allIssueCount = await database.issue.aggregate({
					_count: {
						id: true,
					},
				});
				return allIssueCount._count.id;
			case 'USED':
				const usedIssueCount = await database.issue.aggregate({
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
				return usedIssueCount._count.id;
		}
	} catch (error) {
		return null;
	}
};
