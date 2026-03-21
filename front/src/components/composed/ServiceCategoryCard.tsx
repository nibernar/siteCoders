import { component$ } from "@builder.io/qwik";

export interface ServiceCategoryCardProps {
  name: string;
  iconSvg: string;
}

export const ServiceCategoryCard = component$<ServiceCategoryCardProps>(({ name, iconSvg }) => {
  return (
    <div class="flex items-center gap-3.5 rounded-card border border-border bg-bg-surface px-5 py-4 transition-colors hover:border-border-strong hover:bg-bg-elevated">
      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
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
      <span class="text-label text-fg-primary">{name}</span>
    </div>
  );
});
