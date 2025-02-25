
import { cn } from "@/lib/utils";
import React from "react";

interface MenuSectionProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
}

const MenuSection = React.forwardRef<HTMLDivElement, MenuSectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("pl-2 space-y-1 overflow-hidden", className)} {...props}>
        {children}
      </div>
    );
  }
);

MenuSection.displayName = "MenuSection";

export default MenuSection;

