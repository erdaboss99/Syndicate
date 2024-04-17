import { Prisma } from '@prisma/client';

import { database } from '@/lib/database';

export const getUniqueIssue = async <K extends Prisma.IssueWhereUniqueInput, T extends Prisma.IssueSelect>(options: {
	where: K;
	select: T;
}): Promise<Prisma.IssueGetPayload<{ select: T }> | null> => {
	try {
		const issue = await database.issue.findUnique({
			where: options.where,
			select: options.select,
		});
		return issue;
	} catch (error) {
		return null;
	}
};

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

export const createUniqueIssue = async <D extends Prisma.IssueCreateInput, T extends Prisma.IssueSelect>(options: {
	data: D;
	select: T;
}): Promise<Prisma.IssueGetPayload<{ select: T }> | null> => {
	try {
		const issue = await database.issue.create({
			data: options.data,
			select: options.select,
		});
		return issue;
	} catch (error) {
		return null;
	}
};

export const updateUniqueIssue = async <
	K extends Prisma.IssueWhereUniqueInput,
	D extends Prisma.IssueUpdateInput,
	T extends Prisma.IssueSelect,
>(options: {
	where: K;
	data: D;
	select: T;
}): Promise<Prisma.IssueGetPayload<{ select: T }> | null> => {
	try {
		const issue = await database.issue.update({
			where: options.where,
			data: options.data,
			select: options.select,
		});
		return issue;
	} catch (error) {
		return null;
	}
};

export const deleteUniqueIssue = async <K extends Prisma.IssueWhereUniqueInput, T extends Prisma.IssueSelect>(options: {
	where: K;
	select: T;
}): Promise<Prisma.IssueGetPayload<{ select: T }> | null> => {
	try {
		const issue = await database.issue.delete({
			where: options.where,
			select: options.select,
		});
		return issue;
	} catch (error) {
		return null;
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
