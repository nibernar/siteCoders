import { component$, Slot } from "@builder.io/qwik";

export interface FeatureSectionProps {
  id: string;
  overline: string;
  title: string;
  description: string;
  reversed?: boolean;
}

export const FeatureSection = component$<FeatureSectionProps>((props) => {
  const headingId = `${props.id}-heading`;

  return (
    <section class="reveal py-16 sm:py-20" aria-labelledby={headingId}>
      <div class="mx-auto max-w-7xl px-6">
        <div
          class={[
            "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
            props.reversed && "lg:[&>:first-child]:order-2",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* Text */}
          <div>
            <span class="text-overline text-accent">{props.overline}</span>
            <h2 id={headingId} class="mt-3 text-h2 text-fg-primary">
              {props.title}
            </h2>
            <p class="mt-4 text-body-lg text-fg-secondary leading-relaxed">
              {props.description}
            </p>

            <div class="mt-8 flex flex-col gap-6">
              <Slot name="highlights" />
            </div>
          </div>

          {/* Visual */}
          <div>
            <Slot />
          </div>
        </div>
      </div>
    </section>
  );
});
