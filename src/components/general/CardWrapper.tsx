import { VariantProps, cva } from 'class-variance-authority';

import SocialLogins from '@/components/auth/SocialLogins';
import BreadcrumbNavigation, { type BreadcrumbNode } from '@/components/general/BreadcrumbNavigation';
import LinkButton, { LinkButtonProps } from '@/components/general/LinkButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/Card';

const baseWrapperVariants = cva('w-full', {
	variants: {
		size: {
			SM: 'md:w-[500px]',
			MD: 'md:w-[700px]',
			LG: 'md:w-[950px]',
			XL: 'md:w-full md:max-w-[1200px]',
		},
	},
});

export type CardWrapperProps = {
	navigationTree: BreadcrumbNode[] | null;
	children: React.ReactNode;
	headerTitle: string;
	headerLabel?: string;
} & Partial<LinkButtonProps> &
	VariantProps<typeof baseWrapperVariants>;

const BaseWrapper = ({
	navigationTree,
	children,
	size,
	headerTitle,
	headerLabel,
	linkLabel,
	linkHref,
	linkSize,
	linkVariant,
}: CardWrapperProps) => {
	return (
		<Card className={baseWrapperVariants({ size })}>
			{navigationTree && <BreadcrumbNavigation navigationTree={navigationTree} />}
			<CardHeader>{headerTitle}</CardHeader>
			{headerLabel && <CardDescription>{headerLabel}</CardDescription>}
			{children}
			{linkLabel && linkHref && (
				<CardFooter className='flex items-center justify-center'>
					<LinkButton
						linkLabel={linkLabel}
						linkHref={linkHref}
						linkVariant={linkVariant}
						linkSize={linkSize}
					/>
				</CardFooter>
			)}
		</Card>
	);
};

export const CardWrapper = ({
	navigationTree,
	children,
	size,
	headerTitle,
	headerLabel,
	linkLabel,
	linkHref,
	linkSize,
	linkVariant,
}: CardWrapperProps) => {
	return (
		<BaseWrapper
			navigationTree={navigationTree}
			size={size}
			headerTitle={headerTitle}
			headerLabel={headerLabel}
			linkLabel={linkLabel}
			linkHref={linkHref}
			linkSize={linkSize}
			linkVariant={linkVariant}>
			<CardContent>{children}</CardContent>
		</BaseWrapper>
	);
};

export type AuthWrapperProps = {
	children: React.ReactNode;
	headerTitle: string;
	headerLabel?: string;
	showSocialLogins?: boolean;
} & LinkButtonProps &
	Omit<CardWrapperProps, 'children' | 'size'>;

export const AuthWrapper = ({
	navigationTree,
	children,
	headerTitle,
	headerLabel,
	linkLabel,
	linkHref,
	linkVariant,
	linkSize,
	showSocialLogins,
}: AuthWrapperProps) => {
	return (
		<BaseWrapper
			navigationTree={navigationTree}
			size='MD'
			headerTitle={headerTitle}
			headerLabel={headerLabel}>
			<CardContent>{children}</CardContent>
			{showSocialLogins && (
				<CardFooter>
					<SocialLogins />
				</CardFooter>
			)}
			<CardFooter className='flex items-center justify-center'>
				<LinkButton
					linkLabel={linkLabel}
					linkHref={linkHref}
					linkVariant={linkVariant}
					linkSize={linkSize}
				/>
			</CardFooter>
		</BaseWrapper>
	);
};
