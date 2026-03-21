import { component$ } from "@builder.io/qwik";
import { useLocale, t } from "~/components/locale/locale-context";
import { CircleDotIcon } from "lucide-qwik";

export const EvolutionVisual = component$(() => {
  const state = useLocale();

  return (
    <div class="overflow-hidden rounded-card border border-border bg-bg-surface shadow-lg">
      <div class="flex h-8 items-center gap-2 border-b border-border bg-bg-elevated px-4">
        <span class="ml-2 text-[10px] text-fg-muted">Coders — Versions</span>
      </div>
      <div class="p-5">
        {/* Version list */}
        <div class="space-y-3">
          {[
            {
              version: "v2.1.0",
              label: t(state.locale, "public.features.visuals.versions.latest"),
              labelColor: "bg-accent-subtle text-accent",
              date: "28 Feb 2026",
              changes: "+3 features, 2 fixes",
              active: true,
            },
            {
              version: "v2.0.0",
              label: t(state.locale, "public.features.visuals.versions.stable"),
              labelColor: "bg-success-subtle text-success",
              date: "15 Feb 2026",
              changes: "+5 features, new design",
              active: false,
            },
            {
              version: "v1.2.1",
              label: "",
              labelColor: "",
              date: "02 Feb 2026",
              changes: "3 bug fixes",
              active: false,
            },
            {
              version: "v1.0.0",
              label: t(state.locale, "public.features.visuals.versions.initial"),
              labelColor: "bg-bg-muted text-fg-muted",
              date: "20 Jan 2026",
              changes: "First release",
              active: false,
            },
          ].map((v, index) => (
            <div
              class={
                "flex items-center gap-3 rounded-lg border p-3 transition-colors " +
                (v.active
                  ? "border-accent/30 bg-accent-subtle/30"
                  : "border-border bg-bg-elevated")
              }
              key={index}
            >
              <CircleDotIcon
                size={14}
                stroke-width={1.5}
                class={v.active ? "text-accent" : "text-fg-muted"}
                aria-hidden="true"
              />
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <span class="text-label text-fg-primary">{v.version}</span>
                  {v.label && (
                    <span
                      class={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${v.labelColor}`}
                    >
                      {v.label}
                    </span>
                  )}
                </div>
                <span class="text-[10px] text-fg-muted">{v.changes}</span>
              </div>
              <span class="text-[10px] text-fg-muted">{v.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
