import { component$, type QRL, Slot } from "@builder.io/qwik";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  class?: string;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  onClick$?: QRL<() => void>;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-accent-500 text-fg-on-accent hover:bg-accent-600 hover:shadow-glow-accent-sm active:scale-[0.98]",
  secondary:
    "bg-bg-elevated text-fg-primary border border-border hover:bg-bg-muted active:scale-[0.98]",
  ghost:
    "text-fg-secondary hover:bg-bg-elevated hover:text-fg-primary active:scale-[0.98]",
  destructive:
    "bg-error text-fg-on-accent hover:brightness-90 active:scale-[0.98]",
  outline:
    "border border-accent text-accent hover:bg-accent-subtle active:scale-[0.98]",
};

const sizeClasses: Record<string, string> = {
  sm: "h-8 px-3 text-caption rounded-md",
  md: "h-10 px-4 text-body rounded-md",
  lg: "h-12 px-6 text-body-lg rounded-lg",
  icon: "h-10 w-10 rounded-md",
};

const contentGap: Record<string, string> = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2",
  icon: "",
};

export const Button = component$<ButtonProps>(
  ({
    variant = "primary",
    size = "md",
    class: className = "",
    type = "button",
    disabled = false,
    loading = false,
    onClick$,
  }) => {
    const isDisabled = disabled || loading;

    return (
      <button
        type={type}
        disabled={isDisabled}
        class={[
          "relative inline-flex cursor-pointer items-center justify-center font-medium",
          "transition-all duration-fast ease-default",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:shadow-glow-accent-sm",
          variantClasses[variant],
          sizeClasses[size],
          disabled && "cursor-not-allowed opacity-50",
          loading && "pointer-events-none",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick$={onClick$}
      >
        {loading && (
          <span class="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </span>
        )}
        <span
          class={[
            "inline-flex items-center",
            contentGap[size],
            loading && "invisible",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Slot />
        </span>
      </button>
    );
  }
);
