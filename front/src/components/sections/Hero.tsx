import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocale, t } from "~/components/locale/locale-context";
import { Button } from "~/components/ui/Button";

/* ── Graph data for the architecture mockup ── */
interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

const GRAPH_NODES: GraphNode[] = [
  { id: "frontend", label: "Frontend", x: 50, y: 15 },
  { id: "auth", label: "Auth", x: 18, y: 45 },
  { id: "api", label: "API", x: 50, y: 45 },
  { id: "db", label: "DB", x: 82, y: 45 },
  { id: "pay", label: "Pay", x: 30, y: 78 },
  { id: "cdn", label: "CDN", x: 70, y: 78 },
];

const GRAPH_EDGES = [
  { from: "frontend", to: "api" },
  { from: "api", to: "auth" },
  { from: "api", to: "db" },
  { from: "api", to: "pay" },
  { from: "frontend", to: "cdn" },
];

function getNodePos(id: string) {
  return GRAPH_NODES.find((n) => n.id === id);
}

export const Hero = component$(() => {
  const state = useLocale();
  const visible = useSignal(false);
  const visibleMessages = useSignal(0);
  const showQcm = useSignal(false);
  const visibleNodes = useSignal(0);
  const visibleEdges = useSignal(0);

  const messages = [
    { role: "agent", textKey: "public.landing.heroMockup.chat1" },
    { role: "user", textKey: "public.landing.heroMockup.chat2" },
    { role: "agent", textKey: "public.landing.heroMockup.chat3" },
  ];

  const qcmOptions = [
    "public.landing.heroMockup.qcm1",
    "public.landing.heroMockup.qcm2",
    "public.landing.heroMockup.qcm3",
  ];

  useVisibleTask$(() => {
    visible.value = true;

    // Animate chat messages
    let delay = 1200;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < 3; i++) {
      timers.push(setTimeout(() => { visibleMessages.value = i + 1; }, delay));
      delay += 2000;
    }
    timers.push(setTimeout(() => { showQcm.value = true; }, delay + 600));

    // Animate graph nodes
    let graphDelay = 2000;
    for (let i = 0; i < GRAPH_NODES.length; i++) {
      timers.push(setTimeout(() => { visibleNodes.value = i + 1; }, graphDelay));
      graphDelay += 900;
    }

    // Animate graph edges
    let edgeDelay = 3200;
    for (let i = 0; i < GRAPH_EDGES.length; i++) {
      timers.push(setTimeout(() => { visibleEdges.value = i + 1; }, edgeDelay));
      edgeDelay += 800;
    }

    return () => timers.forEach(clearTimeout);
  });

  return (
    <section
      class="relative flex min-h-dvh flex-col justify-center overflow-hidden py-20 sm:py-28 lg:py-0"
      aria-labelledby="hero-heading"
    >
      {/* Dot grid background */}
      <div
        class="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(oklch(0.70 0.18 280 / 0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Radial glow */}
      <div
        class="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 20%, oklch(0.35 0.20 280 / 0.50) 0%, oklch(0.20 0.10 280 / 0.20) 40%, transparent 75%)",
        }}
      />

      {/* Hero content */}
      <div class="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        {/* Left: text */}
        <div class="lg:col-span-5 xl:col-span-5">
          <h1
            id="hero-heading"
            class={[
              "text-h1 text-fg-primary xl:text-display transition-all duration-slow",
              visible.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
            ].join(" ")}
          >
            {t(state.locale, "public.landing.hero.titleStart")}{" "}
            <span
              class="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, oklch(0.75 0.20 280), oklch(0.70 0.16 230))",
              }}
            >
              {t(state.locale, "public.landing.hero.titleHighlight")}
            </span>
          </h1>

          <p
            class={[
              "text-body-lg text-fg-secondary mt-6 max-w-lg transition-all duration-slow delay-100",
              visible.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            {t(state.locale, "public.landing.hero.subtitle")}
          </p>

          <div
            class={[
              "mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap transition-all duration-slow delay-200",
              visible.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            <a href="/form" class="w-full sm:w-auto">
              <Button variant="primary" size="lg" class="w-full whitespace-nowrap sm:w-auto">
                {t(state.locale, "public.landing.hero.ctaPrimary")}
              </Button>
            </a>
          </div>
        </div>

        {/* Right: HeroMockup */}
        <div
          class={[
            "lg:col-span-7 transition-opacity duration-slow delay-300",
            visible.value ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <div class="overflow-hidden rounded-card border border-border bg-bg-surface shadow-xl">
            {/* Title bar */}
            <div class="flex h-9 items-center gap-2 border-b border-border bg-bg-elevated px-4">
              <span class="text-[11px] text-fg-muted ml-2">Coders</span>
            </div>

            {/* Split view */}
            <div class="grid min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] grid-cols-1 sm:grid-cols-2">
              {/* Left: Chat */}
              <div class="flex flex-col gap-2.5 border-b border-border p-3 sm:border-b-0 sm:border-r sm:p-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    class={[
                      "animate-slide-up",
                      visibleMessages.value <= i && "hidden",
                      msg.role === "agent" ? "self-start" : "self-end",
                    ].filter(Boolean).join(" ")}
                  >
                    <div
                      class={[
                        "max-w-[90%] rounded-lg px-3 py-2 text-[11px] leading-relaxed sm:text-caption",
                        msg.role === "agent"
                          ? "bg-bg-elevated text-fg-secondary"
                          : "bg-accent-subtle text-accent",
                      ].join(" ")}
                    >
                      {msg.role === "agent" && (
                        <span class="text-[9px] text-fg-muted mb-0.5 block font-medium sm:text-[10px]">
                          {t(state.locale, "public.landing.heroMockup.agentLabel")}
                        </span>
                      )}
                      {t(state.locale, msg.textKey)}
                    </div>
                  </div>
                ))}

                {showQcm.value && (
                  <div class="animate-fade-in mt-1 flex flex-col gap-1.5">
                    {qcmOptions.map((key, i) => (
                      <div
                        key={i}
                        class="cursor-default rounded-md border border-border px-2.5 py-1.5 text-[11px] text-fg-secondary transition-colors hover:border-accent hover:text-accent sm:text-caption"
                      >
                        {t(state.locale, key)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Graph */}
              <div class="relative p-3 sm:p-4" aria-hidden="true">
                <svg
                  viewBox="0 0 100 100"
                  class="h-full w-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {GRAPH_EDGES.map((edge, i) => {
                    const from = getNodePos(edge.from);
                    const to = getNodePos(edge.to);
                    if (!from || !to) return null;
                    return (
                      <line
                        key={`edge-${i}`}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke="oklch(0.70 0.18 280 / 0.3)"
                        stroke-width="0.5"
                        stroke-dasharray="2 2"
                        class={[
                          "animate-fade-in",
                          visibleEdges.value <= i && "hidden",
                        ].filter(Boolean).join(" ")}
                      />
                    );
                  })}

                  {GRAPH_NODES.map((node, i) => (
                    <g
                      key={node.id}
                      class={[
                        "animate-scale-in",
                        visibleNodes.value <= i && "hidden",
                      ].filter(Boolean).join(" ")}
                    >
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
        </div>
      </div>
    </section>
  );
});
