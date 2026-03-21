import { component$ } from "@builder.io/qwik";
import { Accordion, type AccordionItem } from "~/components/ui/Accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export const FAQSection = component$<FAQSectionProps>(({ title, subtitle, items }) => {
  const accordionItems: AccordionItem[] = items.map((item) => ({
    value: item.question,
    title: item.question,
    content: (
      <p class="text-body text-fg-secondary leading-relaxed">{item.answer}</p>
    ),
  }));

  return (
    <div class="mx-auto max-w-3xl px-6">
      {(title || subtitle) && (
        <div class="text-center">
          {title && (
            <h2 id="faq-heading" class="text-h2 text-fg-primary">
              {title}
            </h2>
          )}
          {subtitle && (
            <p class="mt-3 text-body-lg text-fg-secondary">{subtitle}</p>
          )}
        </div>
      )}
      <div class="mt-12">
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
});
