import { component$ } from "@builder.io/qwik";
import { useLocale, t } from "~/components/locale/locale-context";
import { ZapIcon } from "lucide-qwik";

export const MaintenanceVisual = component$(() => {
  const state = useLocale();

  return (
    <div class="overflow-hidden rounded-card border border-border bg-bg-surface shadow-lg">
      <div class="flex h-8 items-center gap-2 border-b border-border bg-bg-elevated px-4">
        <span class="ml-2 text-[10px] text-fg-muted">
          Coders — Monitoring
        </span>
      </div>
      <div class="p-5">
        {/* Metrics row */}
        <div class="grid grid-cols-3 gap-3">
          {[
            { label: t(state.locale, "public.features.visuals.monitoring.uptime"), value: "99.98%", color: "text-success" },
            { label: t(state.locale, "public.features.visuals.monitoring.latency"), value: "42ms", color: "text-accent" },
            { label: t(state.locale, "public.features.visuals.monitoring.errors"), value: "0.01%", color: "text-success" },
          ].map((metric, index) => (
            <div class="rounded-lg border border-border bg-bg-elevated p-3 text-center" key={index}>
              <p class={`text-h4 tabular-nums ${metric.color}`}>
                {metric.value}
              </p>
              <p class="mt-0.5 text-[10px] text-fg-muted">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Mini chart placeholder */}
        <div class="mt-4 rounded-lg border border-border bg-bg-elevated p-3">
          <div class="flex items-center justify-between mb-2">
            <span class="text-caption text-fg-secondary font-medium">
              {t(state.locale, "public.features.visuals.monitoring.requestsPerMin")}
            </span>
            <span class="text-[10px] text-fg-muted">24h</span>
          </div>
          <svg
            viewBox="0 0 200 40"
            class="h-10 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polyline
              points="0,35 15,30 30,32 45,25 60,28 75,18 90,22 105,15 120,20 135,12 150,18 165,10 180,14 200,8"
              fill="none"
              stroke="oklch(0.70 0.18 280)"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <polyline
              points="0,35 15,30 30,32 45,25 60,28 75,18 90,22 105,15 120,20 135,12 150,18 165,10 180,14 200,8 200,40 0,40"
              fill="oklch(0.70 0.18 280 / 0.08)"
            />
          </svg>
        </div>

        {/* Incident timeline */}
        <div class="mt-4 rounded-lg border border-border bg-bg-elevated p-3">
          <div class="flex items-center gap-2">
            <ZapIcon
              size={12}
              stroke-width={1.5}
              class="text-warning"
              aria-hidden="true"
            />
            <span class="text-caption text-fg-secondary font-medium">
              {t(state.locale, "public.features.visuals.monitoring.incident")}
            </span>
            <span class="ml-auto rounded-full bg-success-subtle px-2 py-0.5 text-[10px] font-medium text-success">
              {t(state.locale, "public.features.visuals.monitoring.resolved")}
            </span>
          </div>
          <div class="mt-2 flex items-center gap-2 text-[10px] text-fg-muted">
            <span>{t(state.locale, "public.features.visuals.monitoring.detected")}</span>
            <span>→</span>
            <span>{t(state.locale, "public.features.visuals.monitoring.fixed")}</span>
            <span>→</span>
            <span>{t(state.locale, "public.features.visuals.monitoring.deployed")}</span>
          </div>
        </div>
      </div>
    </div>
  );
});
