import { component$ } from "@builder.io/qwik";

export interface LogoProps {
  class?: string;
}

export const Logo = component$<LogoProps>(({ class: className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 32"
      fill="none"
      class={["text-fg-primary h-8", className].filter(Boolean).join(" ")}
      aria-label="Coders"
      role="img"
    >
      <path
        d="M5 10L1 16L5 22"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 10L19 16L15 22"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <text
        x="26"
        y="22"
        font-family="Inter Variable, Inter, system-ui, sans-serif"
        font-size="18"
        font-weight="700"
        fill="currentColor"
      >
        Coders
      </text>
    </svg>
  );
});
