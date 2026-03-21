import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocale, t } from "~/components/locale/locale-context";

const PHASE_ICON_SVGS = [
  '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />',
  '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />',
  '<polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />',
  '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3" />',
];

const PHASE_DURATIONS = [3500, 3200, 3800, 4200];

export const Demo = component$(() => {
  const state = useLocale();
  const inView = useSignal(false);
  const sectionRef = useSignal<HTMLElement>();

  const activePhase = useSignal(-1);
  const typewriterLen = useSignal(0);
  const visibleMsgs = useSignal(0);
  const completedServices = useSignal(0);
  const deployed = useSignal(false);
  const segmentProgress = useSignal<number[]>([0, 0, 0, 0]);

  useVisibleTask$(({ cleanup }) => {
    if (!sectionRef.value) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          inView.value = true;
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.value);
    cleanup(() => observer.disconnect());
  });

  useVisibleTask$(({ track, cleanup }) => {
    const isInView = track(() => inView.value);
    if (!isInView) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let running = true;

    function runCycle() {
      if (!running) return;

      activePhase.value = 0;
      typewriterLen.value = 0;
      visibleMsgs.value = 0;
      completedServices.value = 0;
      deployed.value = false;
      segmentProgress.value = [0, 0, 0, 0];

      // Typewriter effect (still needed for JS string slicing, but reduced frequency)
      const promptLengthLimit = 150;
      const charInterval = Math.floor(PHASE_DURATIONS[0] / promptLengthLimit);
      for (let i = 0; i <= promptLengthLimit; i += 2) {
        timers.push(setTimeout(() => { if (running) typewriterLen.value = i; }, i * charInterval));
      }

      // Start phase 0 progress bar CSS transition
      timers.push(setTimeout(() => {
        if (running) {
          const newProgress = [...segmentProgress.value];
          newProgress[0] = 100;
          segmentProgress.value = newProgress;
        }
      }, 50));

      let offset = PHASE_DURATIONS[0];

      // Phase 1: Interview
      timers.push(setTimeout(() => { 
        if (running) {
          activePhase.value = 1; 
          const newProgress = [...segmentProgress.value];
          newProgress[1] = 100;
          segmentProgress.value = newProgress;
        }
      }, offset));

      const msgInterval = Math.floor(PHASE_DURATIONS[1] / 4);
      for (let i = 0; i < 3; i++) {
        timers.push(setTimeout(() => { if (running) visibleMsgs.value = i + 1; }, offset + (i + 1) * msgInterval));
      }

      offset += PHASE_DURATIONS[1];

      // Phase 2: Development
      timers.push(setTimeout(() => { 
        if (running) {
          activePhase.value = 2; 
          const newProgress = [...segmentProgress.value];
          newProgress[2] = 100;
          segmentProgress.value = newProgress;
        }
      }, offset));

      const svcInterval = Math.floor(PHASE_DURATIONS[2] / 6);
      for (let i = 0; i < 5; i++) {
        timers.push(setTimeout(() => { if (running) completedServices.value = i + 1; }, offset + (i + 1) * svcInterval));
      }

      offset += PHASE_DURATIONS[2];

      // Phase 3: Deployment
      timers.push(setTimeout(() => {
        if (running) {
          activePhase.value = 3;
          deployed.value = true;
          const newProgress = [...segmentProgress.value];
          newProgress[3] = 100;
          segmentProgress.value = newProgress;
        }
      }, offset));

      offset += PHASE_DURATIONS[3];

      // Restart cycle
      timers.push(setTimeout(() => { if (running) runCycle(); }, offset + 600));
    }

    timers.push(setTimeout(() => runCycle(), 400));

    cleanup(() => {
      running = false;
      timers.forEach(clearTimeout);
    });
  });

  const phaseLabels = [
    "public.landing.demo.phase1Label",
    "public.landing.demo.phase2Label",
    "public.landing.demo.phase3Label",
    "public.landing.demo.phase4Label",
  ];

  const interviewMsgs = [
    "public.landing.demo.phase2Msg1",
    "public.landing.demo.phase2Msg2",
    "public.landing.demo.phase2Msg3",
  ];

  const serviceLabels = [
    "public.landing.demo.phase3Service1",
    "public.landing.demo.phase3Service2",
    "public.landing.demo.phase3Service3",
    "public.landing.demo.phase3Service4",
    "public.landing.demo.phase3Service5",
  ];

  const promptText = t(state.locale, "public.landing.demo.phase1Prompt");

  return (
    <section
      id="demo"
      class="flex min-h-dvh flex-col justify-center py-16 sm:py-20"
      aria-labelledby="demo-heading"
      ref={sectionRef}
    >
      <div class="mx-auto max-w-4xl px-6">
        <div
          class={[
            "text-center transition-all duration-slow",
            inView.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <h2 id="demo-heading" class="text-h2 text-fg-primary">
            {t(state.locale, "public.landing.demo.title")}
          </h2>
        </div>

        <div
          class={[
            "mt-10 transition-all duration-slow delay-100",
            inView.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
          ].join(" ")}
        >
          <div class="overflow-hidden rounded-card border border-border bg-bg-surface shadow-xl">
            {/* Phase label strip */}
            <div class="flex items-center gap-3 border-b border-border px-5 py-3 sm:gap-4 sm:px-6">
              {phaseLabels.map((labelKey, i) => (
                <div key={i} class="flex items-center gap-2 sm:gap-3">
                  {i > 0 && (
                    <div
                      class={[
                        "h-px w-3 sm:w-5",
                        activePhase.value >= i ? "bg-accent/40" : "bg-border",
                      ].join(" ")}
                    />
                  )}
                  <div
                    class={[
                      "flex items-center gap-1.5 transition-colors",
                      activePhase.value === i && "text-accent",
                      activePhase.value > i && "text-fg-primary",
                      activePhase.value < i && "text-fg-muted",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                      dangerouslySetInnerHTML={PHASE_ICON_SVGS[i]}
                    />
                    <span class="text-caption font-medium whitespace-nowrap hidden sm:inline">
                      {t(state.locale, labelKey)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Content area */}
            <div class="relative min-h-[240px] sm:min-h-[280px]">
              {/* Phase 0: Prompt */}
              <div
                class="absolute inset-0 p-5 sm:p-6 transition-all duration-moderate"
                style={{
                  opacity: activePhase.value === 0 ? "1" : "0",
                  transform: activePhase.value === 0 ? "translateY(0)" : activePhase.value > 0 ? "translateY(-8px)" : "translateY(12px)",
                  pointerEvents: activePhase.value === 0 ? "auto" : "none",
                }}
              >
                <div class="rounded-lg border border-border bg-bg-elevated p-4">
                  <p class="text-body text-fg-primary min-h-12">
                    {promptText.slice(0, typewriterLen.value)}
                    {activePhase.value === 0 && typewriterLen.value < promptText.length && (
                      <span class="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-accent" />
                    )}
                  </p>
                </div>
              </div>

              {/* Phase 1: Interview */}
              <div
                class="absolute inset-0 p-5 sm:p-6 transition-all duration-moderate"
                style={{
                  opacity: activePhase.value === 1 ? "1" : "0",
                  transform: activePhase.value === 1 ? "translateY(0)" : activePhase.value > 1 ? "translateY(-8px)" : "translateY(12px)",
                  pointerEvents: activePhase.value === 1 ? "auto" : "none",
                }}
              >
                <div class="flex flex-col gap-2.5">
                  {interviewMsgs.map((msgKey, i) => (
                    <div
                      key={i}
                      class={[
                        "animate-slide-up",
                        visibleMsgs.value <= i && "hidden",
                        i % 2 === 0 ? "self-start" : "self-end",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <div
                        class={[
                          "max-w-[85%] rounded-lg px-3 py-2 text-caption leading-relaxed",
                          i % 2 === 0
                            ? "bg-bg-elevated text-fg-secondary"
                            : "bg-accent-subtle text-accent",
                        ].join(" ")}
                      >
                        {i % 2 === 0 && (
                          <span class="text-[9px] text-fg-muted mb-0.5 block font-medium">
                            {t(state.locale, "public.landing.heroMockup.agentLabel")}
                          </span>
                        )}
                        {t(state.locale, msgKey)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase 2: Development */}
              <div
                class="absolute inset-0 p-5 sm:p-6 transition-all duration-moderate"
                style={{
                  opacity: activePhase.value === 2 ? "1" : "0",
                  transform: activePhase.value === 2 ? "translateY(0)" : activePhase.value > 2 ? "translateY(-8px)" : "translateY(12px)",
                  pointerEvents: activePhase.value === 2 ? "auto" : "none",
                }}
              >
                <div class="mb-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-caption text-fg-secondary font-medium">
                      {completedServices.value}/{serviceLabels.length}
                    </span>
                    <span class="text-caption text-fg-muted">
                      {Math.round((completedServices.value / serviceLabels.length) * 100)}%
                    </span>
                  </div>
                  <div class="h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
                    <div
                      class="h-full rounded-full bg-accent transition-all duration-moderate"
                      style={{ width: `${(completedServices.value / serviceLabels.length) * 100}%` }}
                    />
                  </div>
                </div>
                <ul class="flex flex-col gap-2">
                  {serviceLabels.map((svcKey, i) => (
                    <li
                      key={i}
                      class={[
                        "flex items-center gap-2.5 text-body transition-colors",
                        i < completedServices.value ? "text-fg-primary" : "text-fg-disabled",
                      ].join(" ")}
                    >
                      {i < completedServices.value ? (
                        <div class="flex h-4 w-4 shrink-0 animate-scale-in items-center justify-center rounded-full bg-accent">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-fg-on-accent">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                      ) : (
                        <div class="h-4 w-4 shrink-0 rounded-full border border-border" />
                      )}
                      {t(state.locale, svcKey)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 3: Deployment */}
              <div
                class="absolute inset-0 flex flex-col items-center justify-center p-5 sm:p-6 transition-all duration-moderate"
                style={{
                  opacity: activePhase.value === 3 ? "1" : "0",
                  transform: activePhase.value === 3 ? "translateY(0)" : "translateY(12px)",
                  pointerEvents: activePhase.value === 3 ? "auto" : "none",
                }}
              >
                {deployed.value && (
                  <>
                    <div class="relative mb-4 flex h-16 w-16 items-center justify-center">
                      <div class="absolute inset-0 animate-ping rounded-full bg-accent/10" style={{ animationDuration: "1.5s" }} />
                      <div class="animate-scale-in relative flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                    </div>
                    <p class="text-h4 text-fg-primary">{t(state.locale, "public.landing.demo.phase4Status")}</p>
                    <div class="animate-slide-up mt-3 flex items-center gap-2 rounded-lg bg-bg-elevated px-4 py-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-accent">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                      </svg>
                      <span class="text-body text-accent font-medium">{t(state.locale, "public.landing.demo.phase4Url")}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Segmented progress bar */}
            <div class="flex h-1 w-full gap-px bg-border">
              {PHASE_DURATIONS.map((_, i) => (
                <div key={i} class="relative flex-1 overflow-hidden bg-bg-elevated">
                  <div
                    class="absolute inset-y-0 left-0 bg-accent/60"
                    style={{
                      width: `${segmentProgress.value[i] ?? 0}%`,
                      transitionProperty: "width",
                      transitionDuration: segmentProgress.value[i] === 0 ? "0ms" : `${PHASE_DURATIONS[i]}ms`,
                      transitionTimingFunction: "linear"
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
