import { component$, Slot } from "@builder.io/qwik";

export interface BadgeProps {
  variant?: "default" | "accent" | "success" | "error" | "warning" | "info";
  size?: "sm" | "md";
  class?: string;
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "text-fg-secondary bg-bg-muted",
  accent: "text-accent bg-accent-subtle",
  success: "text-success bg-success-subtle",
  error: "text-error bg-error-subtle",
  warning: "text-warning bg-warning-subtle",
  info: "text-info bg-info-subtle",
};

const sizeClasses: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-1.5 py-0.5 text-[11px]",
  md: "px-2.5 py-1 text-caption",
};

export const Badge = component$<BadgeProps>(({ variant = "default", size = "md", ...rest }) => {
  return (
    <span
      class={[
        "inline-flex items-center gap-1.5 rounded-sm font-medium leading-none",
        variantClasses[variant],
        sizeClasses[size],
        rest.class,
      ].filter(Boolean).join(" ")}
    >
      <Slot />
    </span>
  );
});
