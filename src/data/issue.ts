import { Prisma } from '@prisma/client';

import { database } from '@/lib/database';

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

export const getIssues = async () => {
	try {
		const issues = await database.issue.findMany();
		return issues;
	} catch (error) {
		return [];
	}
};

export const getIssueDataSubset = async <T extends Prisma.IssueSelect>(
	select: T,
): Promise<Prisma.IssueGetPayload<{ select: T }>[]> => {
	try {
		const issueSubset = await database.issue.findMany({
			select,
		});
		return issueSubset;
	} catch (error) {
		return [];
	}
};
