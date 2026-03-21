import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocale, t } from "~/components/locale/locale-context";
import { Link } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/Button";

// Icons
import {
  MessageSquareIcon,
  GitBranchIcon,
  EyeIcon,
  GlobeIcon,
  LinkIcon,
  ServerIcon,
  ActivityIcon,
  SearchIcon,
  ShieldIcon,
  HistoryIcon,
  TrendingUpIcon,
} from "lucide-qwik";
import { BrainIcon } from "~/components/icons/BrainIcon";

// Components
import { FeatureSection } from "~/components/sections/features/FeatureSection";
import { CreationVisual } from "~/components/sections/features/CreationVisual";
import { DeploymentVisual } from "~/components/sections/features/DeploymentVisual";
import { MaintenanceVisual } from "~/components/sections/features/MaintenanceVisual";
import { EvolutionVisual } from "~/components/sections/features/EvolutionVisual";

export default component$(() => {
  const state = useLocale();

  // Use visible task to trigger reveal classes on scroll
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

  return (
    <>
      {/* ── Page header ── */}
      <section
        class="reveal relative overflow-hidden py-20 sm:py-28"
        aria-labelledby="features-heading"
      >
        {/* Radial glow */}
        <div
          class="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 30%, oklch(0.25 0.12 280 / 0.35) 0%, transparent 70%)",
          }}
        />

        <div class="relative mx-auto max-w-3xl px-6 text-center">
          <span class="text-overline text-accent">
            {t(state.locale, "public.features.overline")}
          </span>
          <h1
            id="features-heading"
            class="mt-3 text-h1 text-fg-primary xl:text-display"
          >
            {t(state.locale, "public.features.title")}
          </h1>
          <p class="mt-4 text-body-lg text-fg-secondary">
            {t(state.locale, "public.features.subtitle")}
          </p>
        </div>
      </section>

      {/* ── Feature 1: Creation ── */}
      <FeatureSection
        id="feature-creation"
        overline={t(state.locale, "public.features.creation.overline")}
        title={t(state.locale, "public.features.creation.title")}
        description={t(state.locale, "public.features.creation.description")}
      >
        <div q:slot="highlights" class="contents">
          <div class="flex gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
              <MessageSquareIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-label text-fg-primary">{t(state.locale, "public.features.creation.h1Title")}</h3>
              <p class="mt-1 text-body text-fg-secondary">{t(state.locale, "public.features.creation.h1Description")}</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
              <GitBranchIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-label text-fg-primary">{t(state.locale, "public.features.creation.h2Title")}</h3>
              <p class="mt-1 text-body text-fg-secondary">{t(state.locale, "public.features.creation.h2Description")}</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
              <EyeIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-label text-fg-primary">{t(state.locale, "public.features.creation.h3Title")}</h3>
              <p class="mt-1 text-body text-fg-secondary">{t(state.locale, "public.features.creation.h3Description")}</p>
            </div>
          </div>
        </div>
        <CreationVisual />
      </FeatureSection>

      {/* ── Feature 2: Deployment ── */}
      <FeatureSection
        id="feature-deployment"
        overline={t(state.locale, "public.features.deployment.overline")}
        title={t(state.locale, "public.features.deployment.title")}
        description={t(state.locale, "public.features.deployment.description")}
        reversed
      >
        <div q:slot="highlights" class="contents">
          <div class="flex gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
              <GlobeIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-label text-fg-primary">{t(state.locale, "public.features.deployment.h1Title")}</h3>
              <p class="mt-1 text-body text-fg-secondary">{t(state.locale, "public.features.deployment.h1Description")}</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
              <LinkIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-label text-fg-primary">{t(state.locale, "public.features.deployment.h2Title")}</h3>
              <p class="mt-1 text-body text-fg-secondary">{t(state.locale, "public.features.deployment.h2Description")}</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
              <ServerIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-label text-fg-primary">{t(state.locale, "public.features.deployment.h3Title")}</h3>
              <p class="mt-1 text-body text-fg-secondary">{t(state.locale, "public.features.deployment.h3Description")}</p>
            </div>
          </div>
        </div>
        <DeploymentVisual />
      </FeatureSection>

      {/* ── Feature 3: Maintenance ── */}
      <FeatureSection
        id="feature-maintenance"
        overline={t(state.locale, "public.features.maintenance.overline")}
        title={t(state.locale, "public.features.maintenance.title")}
        description={t(state.locale, "public.features.maintenance.description")}
      >
        <div q:slot="highlights" class="contents">
          <div class="flex gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
              <ActivityIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-label text-fg-primary">{t(state.locale, "public.features.maintenance.h1Title")}</h3>
              <p class="mt-1 text-body text-fg-secondary">{t(state.locale, "public.features.maintenance.h1Description")}</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
              <SearchIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-label text-fg-primary">{t(state.locale, "public.features.maintenance.h2Title")}</h3>
              <p class="mt-1 text-body text-fg-secondary">{t(state.locale, "public.features.maintenance.h2Description")}</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
              <ShieldIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-label text-fg-primary">{t(state.locale, "public.features.maintenance.h3Title")}</h3>
              <p class="mt-1 text-body text-fg-secondary">{t(state.locale, "public.features.maintenance.h3Description")}</p>
            </div>
          </div>
        </div>
        <MaintenanceVisual />
      </FeatureSection>

      {/* ── Feature 4: Evolution ── */}
      <FeatureSection
        id="feature-evolution"
        overline={t(state.locale, "public.features.evolution.overline")}
        title={t(state.locale, "public.features.evolution.title")}
        description={t(state.locale, "public.features.evolution.description")}
        reversed
      >
        <div q:slot="highlights" class="contents">
          <div class="flex gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
              <HistoryIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-label text-fg-primary">{t(state.locale, "public.features.evolution.h1Title")}</h3>
              <p class="mt-1 text-body text-fg-secondary">{t(state.locale, "public.features.evolution.h1Description")}</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
              <BrainIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-label text-fg-primary">{t(state.locale, "public.features.evolution.h2Title")}</h3>
              <p class="mt-1 text-body text-fg-secondary">{t(state.locale, "public.features.evolution.h2Description")}</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
              <TrendingUpIcon size={22} stroke-width={1.5} class="text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-label text-fg-primary">{t(state.locale, "public.features.evolution.h3Title")}</h3>
              <p class="mt-1 text-body text-fg-secondary">{t(state.locale, "public.features.evolution.h3Description")}</p>
            </div>
          </div>
        </div>
        <EvolutionVisual />
      </FeatureSection>

      {/* ── CTA final ── */}
      <section
        class="reveal relative overflow-hidden py-24"
        aria-labelledby="features-cta-heading"
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
          <h2 id="features-cta-heading" class="text-h2 text-fg-primary">
            {t(state.locale, "public.features.cta.title")}
          </h2>
          <p class="mt-4 text-body-lg text-fg-secondary">
            {t(state.locale, "public.features.cta.subtitle")}
          </p>
          <div class="mt-8">
            <Link href="/form">
              <Button variant="primary" size="lg">
                {t(state.locale, "public.features.cta.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  // We can't use standard translation context inside `DocumentHead` without a slight workaround
  // For now, returning hardcoded or mostly static layout head
  return {
    title: "Fonctionnalités — Coders",
    meta: [
      {
        name: "description",
        content: "Découvrez les 4 services Coders : création d'application par IA, déploiement automatisé, maintenance intelligente et développement continu.",
      },
    ],
  };
};
