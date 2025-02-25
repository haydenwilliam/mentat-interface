
import React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface MenuItemProps extends React.ComponentProps<"button"> {
  icon?: React.ReactNode;
  asChild?: boolean;
  variant?: "default" | "sub";
}

const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ className, children, icon, asChild = false, variant = "default", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "w-full p-2 flex items-center gap-3 hover:bg-mentat-secondary/30 rounded-lg transition-colors group",
          variant === "default" ? "text-mentat-primary/80 hover:text-mentat-primary" : "text-mentat-primary/60 hover:text-mentat-primary",
          variant === "sub" && "text-sm",
          className
        )}
        {...props}
      >
        {icon && React.cloneElement(icon as React.ReactElement, {
          className: cn("flex-shrink-0", variant === "default" ? "w-5 h-5" : "w-4 h-4")
        })}
        <span className="text-sm opacity-100 whitespace-nowrap">{children}</span>
      </Comp>
    );
  }
);

MenuItem.displayName = "MenuItem";

export default MenuItem;
