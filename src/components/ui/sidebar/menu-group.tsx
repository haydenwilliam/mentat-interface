
import { cn } from "@/lib/utils";
import React from "react";

interface MenuGroupProps extends React.ComponentProps<"div"> {
  label?: string;
  children?: React.ReactNode;
}

const MenuGroup = React.forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    );
  }
);

MenuGroup.displayName = "MenuGroup";

export default MenuGroup;

