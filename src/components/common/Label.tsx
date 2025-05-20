import React from "react";
import { cn } from "../../utils/helper";
type LabelSize = "xs" | "sm" | "base";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: LabelSize;
}

const sizeClasses: Record<LabelSize, string> = {
  xs: "text-xs",     
  sm: "text-sm",     
  base: "text-base", 
};

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size = "base", ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export { Label };
