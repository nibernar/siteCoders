import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocale, t } from "~/components/locale/locale-context";
import { Link } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/Button";

// Icons
import {
  EyeIcon,
  UsersIcon,
  AwardIcon,
  ZapIcon,
} from "lucide-qwik";

export default component$(() => {
  const state = useLocale();

  // Scroll-reveal observer
  useVisibleTask$(({ track }) => {
    track(() => state.locale);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });

  // Animated counter
  const countersRevealed = useSignal(false);
  const count1 = useSignal(0);
  const count2 = useSignal(0);
  const count3 = useSignal(0);
  const count4 = useSignal(0);

  useVisibleTask$(({ track }) => {
    track(() => countersRevealed.value);
    if (!countersRevealed.value) return;

    const duration = 1500;
    const start = performance.now();

    const targets = [500, 15, 99.9, 30];
    const decimals = [0, 0, 1, 0];

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      for (let i = 0; i < targets.length; i++) {
        const factor = Math.pow(10, decimals[i]);
        const val = Math.floor(eased * targets[i] * factor) / factor;
        if (i === 0) count1.value = val;
        if (i === 1) count2.value = val;
        if (i === 2) count3.value = val;
        if (i === 3) count4.value = val;
      }
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });

  // Stats section observer
  useVisibleTask$(() => {
    const statsEl = document.getElementById("about-stats-section");
    if (!statsEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          countersRevealed.value = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(statsEl);
    return () => observer.disconnect();
  });

  return (
    <>
      {/* ── Section 1 : Hero ── */}
      <section
        class="reveal relative overflow-hidden py-24 sm:py-32"
        aria-labelledby="about-hero-heading"
      >
        <div
          class="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, oklch(0.25 0.12 280 / 0.40) 0%, transparent 70%)",
          }}
        />

        <div class="relative mx-auto max-w-3xl px-6 text-center">
          <span class="text-overline text-accent">
            {t(state.locale, "public.about.overline")}
          </span>
          <h1
            id="about-hero-heading"
            class="mt-4 text-h1 text-fg-primary sm:text-display"
          >
            {t(state.locale, "public.about.hero.title")}
          </h1>
          <p class="mt-6 text-body-lg text-fg-secondary leading-relaxed">
            {t(state.locale, "public.about.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ── Section 2 : Le problème ── */}
      <section
        class="reveal py-16 sm:py-20"
        aria-labelledby="about-problem-heading"
      >
        <div class="mx-auto max-w-5xl px-6">
          <h2
            id="about-problem-heading"
            class="text-center text-h2 text-fg-primary"
          >
            {t(state.locale, "public.about.problem.title")}
          </h2>

          <div class="mt-12 grid gap-8 sm:grid-cols-3">
            <div class="flex flex-col items-center rounded-2xl border border-border bg-bg-surface p-8 text-center">
              <span class="text-stat text-accent tabular-nums">
                {t(state.locale, "public.about.problem.stat1Value")}
              </span>
              <span class="mt-3 text-label text-fg-secondary">
                {t(state.locale, "public.about.problem.stat1Label")}
              </span>
            </div>
            <div class="flex flex-col items-center rounded-2xl border border-border bg-bg-surface p-8 text-center">
              <span class="text-stat text-accent tabular-nums">
                {t(state.locale, "public.about.problem.stat2Value")}
              </span>
              <span class="mt-3 text-label text-fg-secondary">
                {t(state.locale, "public.about.problem.stat2Label")}
              </span>
            </div>
            <div class="flex flex-col items-center rounded-2xl border border-border bg-bg-surface p-8 text-center">
              <span class="text-stat text-accent tabular-nums">
                {t(state.locale, "public.about.problem.stat3Value")}
              </span>
              <span class="mt-3 text-label text-fg-secondary">
                {t(state.locale, "public.about.problem.stat3Label")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3 : La solution ── */}
      <section
        class="reveal py-16 sm:py-20"
        aria-labelledby="about-solution-heading"
      >
        <div class="mx-auto max-w-3xl px-6">
          <div class="text-center">
            <h2
              id="about-solution-heading"
              class="text-h2 text-fg-primary"
            >
              {t(state.locale, "public.about.solution.title")}
            </h2>
            <p class="mt-6 text-body-lg text-fg-secondary leading-relaxed">
              {t(state.locale, "public.about.solution.text")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 4 : Chiffres clés ── */}
      <section
        id="about-stats-section"
        class="reveal py-16 sm:py-20"
        aria-labelledby="about-stats-heading"
      >
        <div class="mx-auto max-w-5xl px-6">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div class="text-center">
              <span class="text-stat text-accent tabular-nums">
                {count2.value}{t(state.locale, "public.about.stats.stat2Suffix")}
              </span>
              <p class="mt-2 text-label text-fg-secondary">
                {t(state.locale, "public.about.stats.stat2Label")}
              </p>
            </div>
            <div class="text-center">
              <span class="text-stat text-accent tabular-nums">
                {count3.value}{t(state.locale, "public.about.stats.stat3Suffix")}
              </span>
              <p class="mt-2 text-label text-fg-secondary">
                {t(state.locale, "public.about.stats.stat3Label")}
              </p>
            </div>
            <div class="text-center">
              <span class="text-stat text-accent tabular-nums">
                {t(state.locale, "public.about.stats.stat4Prefix")}{count4.value}
              </span>
              <p class="mt-2 text-label text-fg-secondary">
                {t(state.locale, "public.about.stats.stat4Label")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5 : Valeurs ── */}
      <section
        class="reveal py-16 sm:py-20"
        aria-labelledby="about-values-heading"
      >
        <div class="mx-auto max-w-5xl px-6">
          <h2
            id="about-values-heading"
            class="text-center text-h2 text-fg-primary"
          >
            {t(state.locale, "public.about.values.title")}
          </h2>

          <div class="mt-12 grid gap-6 sm:grid-cols-2">
            {/* Value 1: Transparence */}
            <div class="rounded-2xl border border-border bg-bg-surface p-6">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-subtle">
                <EyeIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
              </div>
              <h3 class="mt-4 text-h4 text-fg-primary">
                {t(state.locale, "public.about.values.v1Title")}
              </h3>
              <p class="mt-2 text-body text-fg-secondary">
                {t(state.locale, "public.about.values.v1Description")}
              </p>
            </div>

            {/* Value 2: Accessibilité */}
            <div class="rounded-2xl border border-border bg-bg-surface p-6">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-subtle">
                <UsersIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
              </div>
              <h3 class="mt-4 text-h4 text-fg-primary">
                {t(state.locale, "public.about.values.v2Title")}
              </h3>
              <p class="mt-2 text-body text-fg-secondary">
                {t(state.locale, "public.about.values.v2Description")}
              </p>
            </div>

            {/* Value 3: Excellence */}
            <div class="rounded-2xl border border-border bg-bg-surface p-6">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-subtle">
                <AwardIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
              </div>
              <h3 class="mt-4 text-h4 text-fg-primary">
                {t(state.locale, "public.about.values.v3Title")}
              </h3>
              <p class="mt-2 text-body text-fg-secondary">
                {t(state.locale, "public.about.values.v3Description")}
              </p>
            </div>

            {/* Value 4: Autonomie */}
            <div class="rounded-2xl border border-border bg-bg-surface p-6">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-subtle">
                <ZapIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
              </div>
              <h3 class="mt-4 text-h4 text-fg-primary">
                {t(state.locale, "public.about.values.v4Title")}
              </h3>
              <p class="mt-2 text-body text-fg-secondary">
                {t(state.locale, "public.about.values.v4Description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6 : CTA final ── */}
      <section
        class="reveal relative overflow-hidden py-24"
        aria-labelledby="about-cta-heading"
      >
        <div
          class="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 50%, oklch(0.20 0.10 280 / 0.30) 0%, transparent 70%)",
          }}
        />

        <div class="relative mx-auto max-w-2xl px-6 text-center">
          <h2 id="about-cta-heading" class="text-h2 text-fg-primary">
            {t(state.locale, "public.about.cta.title")}
          </h2>
          <p class="mt-4 text-body-lg text-fg-secondary">
            {t(state.locale, "public.about.cta.subtitle")}
          </p>
          <div class="mt-8">
            <Link href="/form">
              <Button variant="primary" size="lg">
                {t(state.locale, "public.about.cta.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "À propos — Coders",
    meta: [
      {
        name: "description",
        content:
          "Coders est la première usine logicielle au monde. Découvrez notre mission : démocratiser la création d'applications grâce à l'IA.",
      },
    ],
  };
};
