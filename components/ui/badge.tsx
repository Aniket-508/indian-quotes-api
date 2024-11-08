import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full font-medium", {
  variants: {
    variant: {
      default: "border-transparent bg-indigo-100 text-indigo-800",
      // secondary:
      //   "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      // destructive:
      //   "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
      // outline: "text-foreground",
    },
    size: {
      default: "px-2.5 py-0.5 text-xs",
      lg: "px-3 py-1 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };