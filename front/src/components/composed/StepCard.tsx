import { component$ } from "@builder.io/qwik";

export interface StepCardProps {
  title: string;
  description: string;
  iconSvg: string;
}

export const StepCard = component$<StepCardProps>(({ title, description, iconSvg }) => {
  return (
    <div class="flex flex-col items-center text-center">
      <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-subtle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-accent"
          aria-hidden="true"
          dangerouslySetInnerHTML={iconSvg}
        />
      </div>
      <h3 class="mt-5 text-h4 text-fg-primary">{title}</h3>
      <p class="mt-2 text-body text-fg-secondary max-w-xs">{description}</p>
    </div>
  );
});
