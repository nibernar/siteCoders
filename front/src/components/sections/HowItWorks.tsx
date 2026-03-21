import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocale, t } from "~/components/locale/locale-context";
import { StepCard } from "~/components/composed/StepCard";

/* SVG path data for step icons */
const STEP_ICONS = [
  // MessageSquare
  '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />',
  // Brain
  '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M19.938 10.5a4 4 0 0 1 .585.396" /><path d="M6 18a4 4 0 0 1-1.967-.516" /><path d="M19.967 17.484A4 4 0 0 1 18 18" />',
  // Code
  '<polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />',
  // Rocket
  '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3" />',
];

export const HowItWorks = component$(() => {
  const state = useLocale();
  const inView = useSignal(false);
  const sectionRef = useSignal<HTMLElement>();

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

  const steps = [
    { titleKey: "public.landing.howItWorks.step1Title", descKey: "public.landing.howItWorks.step1Description" },
    { titleKey: "public.landing.howItWorks.step2Title", descKey: "public.landing.howItWorks.step2Description" },
    { titleKey: "public.landing.howItWorks.step3Title", descKey: "public.landing.howItWorks.step3Description" },
    { titleKey: "public.landing.howItWorks.step4Title", descKey: "public.landing.howItWorks.step4Description" },
  ];

  return (
    <section
      id="how-it-works"
      class="relative flex min-h-dvh flex-col justify-center py-16 sm:py-20"
      aria-labelledby="how-it-works-heading"
      ref={sectionRef}
    >
      <div class="mx-auto max-w-7xl px-6">
        <div
          class={[
            "text-center transition-all duration-slow",
            inView.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <h2 id="how-it-works-heading" class="text-h2 text-fg-primary">
            {t(state.locale, "public.landing.howItWorks.title")}
          </h2>
        </div>

        <div class="relative mt-14 sm:mt-16">
          {/* Dashed connector line (desktop) */}
          <div class="pointer-events-none absolute top-7 left-[12%] right-[12%] hidden lg:block" aria-hidden="true">
            <div class="h-px border-t border-dashed border-border" />
          </div>

          <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={i}
                class={[
                  "transition-all duration-slow",
                  inView.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
                ].join(" ")}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <StepCard
                  title={t(state.locale, step.titleKey)}
                  description={t(state.locale, step.descKey)}
                  iconSvg={STEP_ICONS[i]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
