import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocale, t } from "~/components/locale/locale-context";
import { ServiceCategoryCard } from "~/components/composed/ServiceCategoryCard";

/* SVG path data for service category icons */
const SERVICE_ICONS = [
  // ShieldCheck
  '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" />',
  // MessageCircle
  '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />',
  // ShoppingCart
  '<circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />',
  // FileText
  '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />',
  // Wrench
  '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />',
  // Database
  '<ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" />',
  // Brain
  '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />',
  // Zap
  '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />',
  // Radio
  '<path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" /><circle cx="12" cy="12" r="2" />',
  // Lock
  '<rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />',
  // Users
  '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />',
];

const CATEGORY_KEYS = [
  "identity", "communication", "ecommerce", "content", "tools",
  "workflows", "ai", "automation", "iot", "compliance", "social",
];

export const Services = component$(() => {
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
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.value);
    cleanup(() => observer.disconnect());
  });

  return (
    <section
      id="services"
      class="flex min-h-dvh flex-col justify-center py-16 sm:py-20"
      aria-labelledby="services-heading"
      ref={sectionRef}
    >
      <div class="mx-auto max-w-7xl px-6">
        <div
          class={[
            "mx-auto max-w-2xl text-center transition-all duration-slow",
            inView.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <h2 id="services-heading" class="text-h2 text-fg-primary">
            {t(state.locale, "public.landing.services.title")}
          </h2>
          <p class="mt-4 text-body-lg text-fg-secondary">
            {t(state.locale, "public.landing.services.subtitle")}
          </p>
        </div>

        <div class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORY_KEYS.map((key, i) => (
            <div
              key={key}
              class={[
                "transition-all duration-moderate",
                inView.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2.5",
              ].join(" ")}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <ServiceCategoryCard
                name={t(state.locale, `public.landing.services.categories.${key}`)}
                iconSvg={SERVICE_ICONS[i]}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
