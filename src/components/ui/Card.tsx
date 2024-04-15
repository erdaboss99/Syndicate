import * as React from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardVariants = cva('rounded-xl transition-colors md:shadow', {
	variants: {
		variant: {
			default: 'bg-background text-card-foreground md:border md:bg-card',
			tile: 'h-full w-full border bg-card text-card-foreground hover:bg-primary/15 md:bg-background md:text-foreground',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export interface CardProps extends React.ButtonHTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, variant, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(cardVariants({ variant, className }))}
		{...props}
	/>
));
Card.displayName = 'Card';

const cardHeaderVariant = cva('flex flex-col space-y-1.5 text-center font-orbitron', {
	variants: {
		variant: {
			default: 'p-6 text-4xl md:text-5xl',
			secondary: 'p-4 text-2xl md:text-3xl',
			tertiary: 'p-3 text-lg md:text-xl',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardHeaderVariant> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, variant, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(cardHeaderVariant({ variant, className }))}
		{...props}
	/>
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => (
		<h3
			ref={ref}
			className={cn('font-semibold leading-none tracking-tight', className)}
			{...props}
		/>
	),
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => (
		<p
			ref={ref}
			className={cn('text-center font-orbitron text-xl text-muted-foreground md:text-2xl ', className)}
			{...props}
		/>
	),
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn('mt-[3vh] p-1 pt-3 md:mt-[2vh] md:p-6', className)}
			{...props}
		/>
	),
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn('flex items-center p-1 pt-0 md:p-6', className)}
			{...props}
		/>
	),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
