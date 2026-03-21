import { component$, type Signal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/Button";
import { Badge } from "~/components/ui/Badge";
import type { Plan } from "~/types/billing";

export interface PricingCardProps {
  plan: Plan;
  billing: Signal<"monthly" | "annual">;
  ctaLabel: string;
  popularLabel?: string;
  perMonthLabel: string;
  billedAnnuallyLabel?: string;
  customPricingLabel: string;
}

const CTA_VARIANT: Record<Plan["slug"], "outline" | "primary" | "secondary"> = {
  free: "outline",
  pro: "primary",
  enterprise: "secondary",
};

function ctaHref(slug: Plan["slug"]): string {
  if (slug === "enterprise") return "/form";
  if (slug === "pro") return "/form?plan=pro";
  return "/form";
}

function formatPrice(centimes: number): string {
  const euros = centimes / 100;
  return Number.isInteger(euros) ? String(euros) : euros.toFixed(2);
}

export const PricingCard = component$<PricingCardProps>((props) => {
  const isEnterprise = () => props.plan.slug === "enterprise";

  const price = () =>
    props.billing.value === "monthly"
      ? props.plan.pricing.monthly
      : props.plan.pricing.yearly;

  const annualTotal = () => (props.plan.pricing.yearly * 12) / 100;

  const href = () => ctaHref(props.plan.slug);
  const variant = () => CTA_VARIANT[props.plan.slug];

  return (
    <div
      class={[
        "relative flex flex-col rounded-2xl border p-8 transition-shadow",
        props.plan.recommended
          ? "border-accent bg-bg-surface shadow-glow-accent-sm"
          : "border-border bg-bg-surface",
      ].filter(Boolean).join(" ")}
    >
      {props.plan.recommended && props.popularLabel && (
        <div class="absolute top-4 left-1/2 -translate-x-1/2">
          <Badge variant="accent">{props.popularLabel}</Badge>
        </div>
      )}

      <h3 class="text-h3 text-fg-primary">{props.plan.name}</h3>
      <p class="mt-2 text-body text-fg-secondary">{props.plan.description}</p>

      <div class="mt-6">
        {!isEnterprise() ? (
          <>
            <span class="text-stat text-fg-primary tabular-nums">
              {formatPrice(price())}€
            </span>
            <span class="text-body text-fg-muted">/{props.perMonthLabel}</span>
          </>
        ) : (
          <span class="text-h2 text-fg-primary">
            {props.customPricingLabel}
          </span>
        )}

        {!isEnterprise() && props.billing.value === "annual" && props.billedAnnuallyLabel && (
          <p class="mt-1 text-caption text-fg-muted">
            {props.billedAnnuallyLabel.replace("{total}", String(annualTotal()))}
          </p>
        )}
      </div>

      <div class="mt-6">
        {props.plan.slug !== "enterprise" ? (
          <Link href={href()} class="block">
            <Button variant={variant()} size="lg" class="w-full">
              {props.ctaLabel}
            </Button>
          </Link>
        ) : (
          <a href={href()} class="block">
            <Button variant={variant()} size="lg" class="w-full">
              {props.ctaLabel}
            </Button>
          </a>
        )}
      </div>

      <div class="my-6 border-t border-border" />

      <ul class="flex flex-1 flex-col gap-3">
        {props.plan.features.map((feature, idx) => (
          <li key={idx} class="flex items-start gap-3 text-body">
            {feature.included ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0 text-success" aria-hidden="true">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0 text-fg-disabled" aria-hidden="true">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            )}
            <span
              class={feature.included ? "text-fg-secondary" : "text-fg-disabled"}
            >
              {feature.label}
              {feature.detail && (
                <>
                  {" "}
                  <span class="font-medium text-fg-primary">
                    {feature.detail}
                  </span>
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});
