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

export const aggregateIssues = async <K extends Prisma.IssueWhereInput, T extends Prisma.IssueAggregateArgs>(options: {
	where?: K;
	aggregate: T;
}): Promise<Prisma.GetIssueAggregateType<T> | null> => {
	try {
		const { aggregate } = options;
		const aggregation = await database.issue.aggregate({
			where: options.where,
			...aggregate,
		});
		return aggregation;
	} catch (error) {
		return null;
	}
};
