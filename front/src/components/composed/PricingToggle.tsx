import { component$, type Signal } from "@builder.io/qwik";
import { Badge } from "~/components/ui/Badge";

export interface PricingToggleProps {
  billing: Signal<"monthly" | "annual">;
  monthlyLabel: string;
  annualLabel: string;
  saveLabel: string;
}

export const PricingToggle = component$<PricingToggleProps>((props) => {
  return (
    <div class="inline-flex items-center gap-1 rounded-full border border-border bg-bg-surface p-1">
      <button
        type="button"
        class={[
          "rounded-full px-4 py-2 text-label transition-colors",
          props.billing.value === "monthly"
            ? "bg-accent-500 text-fg-on-accent"
            : "text-fg-secondary hover:text-fg-primary",
        ].join(" ")}
        onClick$={() => (props.billing.value = "monthly")}
      >
        {props.monthlyLabel}
      </button>
      <button
        type="button"
        class={[
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-label transition-colors",
          props.billing.value === "annual"
            ? "bg-accent-500 text-fg-on-accent"
            : "text-fg-secondary hover:text-fg-primary",
        ].join(" ")}
        onClick$={() => (props.billing.value = "annual")}
      >
        {props.annualLabel}
        <Badge variant="success" size="sm">
          {props.saveLabel}
        </Badge>
      </button>
    </div>
  );
});
