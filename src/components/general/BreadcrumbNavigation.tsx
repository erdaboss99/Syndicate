import Link from 'next/link';

import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';

export type BreadcrumbNode = {
	nodeLabel: string;
	nodeHref: string;
};

type BreadcrumbNavigationProps = {
	navigationTree: BreadcrumbNode[];
};

type BreadcrumbNavigationNodeProps = {
	lastItem: boolean;
} & BreadcrumbNode;

const BreadcrumbNavigationNode = ({ nodeLabel, nodeHref, lastItem }: BreadcrumbNavigationNodeProps) => {
	return (
		<>
			<BreadcrumbItem>
				{lastItem ? (
					<BreadcrumbPage>{nodeLabel}</BreadcrumbPage>
				) : (
					<BreadcrumbLink asChild>
						<Link href={nodeHref}>{nodeLabel}</Link>
					</BreadcrumbLink>
				)}
			</BreadcrumbItem>
			{!lastItem && <BreadcrumbSeparator />}
		</>
	);
};

const BreadcrumbNavigation = ({ navigationTree }: BreadcrumbNavigationProps) => {
	const concatenatedTree = navigationTree.reduce<BreadcrumbNode[]>((acc, node, index) => {
		return index === 0
			? [...acc, { ...node, nodeHref: '/' + node.nodeHref }]
			: [...acc, { ...node, nodeHref: acc[index - 1].nodeHref + '/' + node.nodeHref }];
	}, []);

	const reducedTree =
		concatenatedTree.length <= 2 ? Array.from(concatenatedTree) : Array.from(concatenatedTree).slice(-2);

	return (
		<Breadcrumb className='flex items-center justify-center pt-2 md:justify-start md:pl-5'>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href='/'>Home</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{navigationTree.length > 2 && (
					<>
						<BreadcrumbItem>
							<BreadcrumbEllipsis />
						</BreadcrumbItem>
						<BreadcrumbSeparator />
					</>
				)}
				{reducedTree.map(({ nodeLabel, nodeHref }, index) => (
					<BreadcrumbNavigationNode
						key={index}
						nodeLabel={nodeLabel}
						nodeHref={nodeHref}
						lastItem={index === reducedTree.length - 1}
					/>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default BreadcrumbNavigation;
