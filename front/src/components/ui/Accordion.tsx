import { component$, useSignal, type JSXOutput } from "@builder.io/qwik";

export interface AccordionItem {
  value: string;
  title: string;
  content: JSXOutput;
}

export interface AccordionProps {
  items: AccordionItem[];
  class?: string;
}

export const Accordion = component$<AccordionProps>(({ items, class: className = "" }) => {
  const openItem = useSignal<string | null>(null);

  return (
    <div class={["w-full", className].filter(Boolean).join(" ")}>
      {items.map((item, index) => {
        const isOpen = openItem.value === item.value;
        const isLast = index === items.length - 1;

        return (
          <div
            key={item.value}
            class={["border-border", !isLast && "border-b"].filter(Boolean).join(" ")}
          >
            <div class="flex">
              <button
                type="button"
                class={[
                  "group text-body text-fg-primary flex h-12 flex-1 cursor-pointer items-center justify-between font-medium outline-none",
                  "duration-fast ease-default transition-colors",
                  "hover:text-fg-secondary",
                ].join(" ")}
                onClick$={() => {
                  openItem.value = openItem.value === item.value ? null : item.value;
                }}
                aria-expanded={isOpen}
              >
                <span>{item.title}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class={[
                    "text-fg-muted shrink-0 transition-transform duration-normal ease-default",
                    isOpen && "rotate-180",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
            <div
              class={[
                "overflow-hidden transition-all duration-normal ease-default",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
              ].join(" ")}
            >
              <div class="text-body text-fg-secondary pb-4">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
});
