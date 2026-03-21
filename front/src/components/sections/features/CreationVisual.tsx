import { component$ } from "@builder.io/qwik";
import { useLocale, t } from "~/components/locale/locale-context";

export const CreationVisual = component$(() => {
  const state = useLocale();
  
  return (
    <div class="overflow-hidden rounded-card border border-border bg-bg-surface shadow-lg">
      <div class="flex h-8 items-center gap-2 border-b border-border bg-bg-elevated px-4">
        <span class="ml-2 text-[10px] text-fg-muted">Coders — Interview</span>
      </div>
      <div class="grid grid-cols-2">
        {/* Chat panel */}
        <div class="flex flex-col gap-2 border-r border-border p-4">
          <div class="self-start rounded-lg bg-bg-elevated px-3 py-2">
            <span class="block text-[9px] font-medium text-fg-muted">
              {t(state.locale, "public.features.visuals.agentLabel")}
            </span>
            <span class="text-caption text-fg-secondary">
              {t(state.locale, "public.features.visuals.interview.q1")}
            </span>
          </div>
          <div class="self-end rounded-lg bg-accent-subtle px-3 py-2">
            <span class="text-caption text-accent">
              {t(state.locale, "public.features.visuals.interview.a1")}
            </span>
          </div>
          <div class="self-start rounded-lg bg-bg-elevated px-3 py-2">
            <span class="block text-[9px] font-medium text-fg-muted">
              {t(state.locale, "public.features.visuals.agentLabel")}
            </span>
            <span class="text-caption text-fg-secondary">
              {t(state.locale, "public.features.visuals.interview.q2")}
            </span>
          </div>
          <div class="mt-1 flex flex-col gap-1">
            <div class="rounded-md border border-accent/40 px-2 py-1 text-[10px] text-accent">
              {t(state.locale, "public.features.visuals.interview.qcm1")}
            </div>
            <div class="rounded-md border border-border px-2 py-1 text-[10px] text-fg-muted">
              {t(state.locale, "public.features.visuals.interview.qcm2")}
            </div>
          </div>
        </div>
        {/* Graph panel */}
        <div class="p-4" aria-hidden="true">
          <svg
            viewBox="0 0 100 100"
            class="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {[
              { x1: 50, y1: 15, x2: 50, y2: 45 },
              { x1: 50, y1: 45, x2: 18, y2: 45 },
              { x1: 50, y1: 45, x2: 82, y2: 45 },
              { x1: 50, y1: 45, x2: 30, y2: 78 },
              { x1: 50, y1: 15, x2: 70, y2: 78 },
            ].map((edge, i) => (
              <line
                key={`edge-${i}`}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                stroke="oklch(0.70 0.18 280 / 0.3)"
                stroke-width="0.5"
                stroke-dasharray="2 2"
              />
            ))}
            {[
              { x: 50, y: 15, label: "Frontend" },
              { x: 18, y: 45, label: "Auth" },
              { x: 50, y: 45, label: "API" },
              { x: 82, y: 45, label: "DB" },
              { x: 30, y: 78, label: "Pay" },
              { x: 70, y: 78, label: "CDN" },
            ].map((node, index) => (
              <g key={index}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="9"
                  fill="oklch(0.16 0.020 280)"
                  stroke="oklch(0.70 0.18 280 / 0.4)"
                  stroke-width="0.6"
                />
                <text
                  x={node.x}
                  y={node.y + 0.8}
                  text-anchor="middle"
                  dominant-baseline="middle"
                  fill="oklch(0.72 0.012 280)"
                  font-size="3"
                  font-family="var(--font-sans)"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
});
