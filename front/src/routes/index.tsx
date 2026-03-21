import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Hero } from "~/components/sections/Hero";
import { HowItWorks } from "~/components/sections/HowItWorks";
import { Services } from "~/components/sections/Services";
import { Demo } from "~/components/sections/Demo";
import { FAQSection } from "~/components/composed/FAQSection";
import { useLocale, t } from "~/components/locale/locale-context";

export default component$(() => {
  const state = useLocale();

  const faqItems = [
    { question: t(state.locale, "public.landing.faq.q1"), answer: t(state.locale, "public.landing.faq.a1") },
    { question: t(state.locale, "public.landing.faq.q2"), answer: t(state.locale, "public.landing.faq.a2") },
    { question: t(state.locale, "public.landing.faq.q3"), answer: t(state.locale, "public.landing.faq.a3") },
    { question: t(state.locale, "public.landing.faq.q4"), answer: t(state.locale, "public.landing.faq.a4") },
    { question: t(state.locale, "public.landing.faq.q5"), answer: t(state.locale, "public.landing.faq.a5") },
    { question: t(state.locale, "public.landing.faq.q6"), answer: t(state.locale, "public.landing.faq.a6") },
    { question: t(state.locale, "public.landing.faq.q7"), answer: t(state.locale, "public.landing.faq.a7") },
    { question: t(state.locale, "public.landing.faq.q8"), answer: t(state.locale, "public.landing.faq.a8") },
  ];

  return (
    <>
      <Hero />
      <HowItWorks />
      <Services />
      <Demo />
      <section id="faq" class="py-16 sm:py-20" aria-labelledby="faq-heading">
        <FAQSection
          title={t(state.locale, "public.landing.faq.title")}
          subtitle={t(state.locale, "public.landing.faq.subtitle")}
          items={faqItems}
        />
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Coders — Du prompt à la production",
  meta: [
    {
      name: "description",
      content: "Transformez votre idée en application complète, déployée et maintenue. La première usine logicielle au monde, propulsée par l'IA.",
    },
  ],
};
