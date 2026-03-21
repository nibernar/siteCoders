import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { useLocale, setLocale, toggleTheme, t } from "~/components/locale/locale-context";
import { Logo } from "~/components/composed/Logo";
import type { Locale } from "~/types";

const LOCALE_OPTIONS = [
  { code: "fr" as const, label: "Français", flag: "FR" },
  { code: "en" as const, label: "English", flag: "EN" },
];

export const Header = component$(() => {
  const state = useLocale();
  const scrolled = useSignal(false);
  const drawerOpen = useSignal(false);
  const langOpen = useSignal(false);

  useVisibleTask$(({ cleanup }) => {
    const onScroll = () => {
      scrolled.value = window.scrollY > 50;
      if (drawerOpen.value) {
        drawerOpen.value = false;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanup(() => window.removeEventListener("scroll", onScroll));
  });

  const setLocaleInline = $((code: Locale) => {
    setLocale(state, code);
    langOpen.value = false;
  });

  const toggleThemeInline = $(() => {
    toggleTheme(state);
    document.documentElement.classList.toggle("dark");
  });

  const closeDrawer = $(() => {
    drawerOpen.value = false;
  });

  const navLinks = [
    { href: "/features", labelKey: "public.header.features" },
    { href: "/about", labelKey: "public.header.about" },
  ];

  return (
    <header
      class={[
        "duration-normal sticky top-0 z-50 transition-colors",
        scrolled.value
          ? drawerOpen.value
            ? "border-border bg-bg-surface border-b"
            : "border-border bg-bg-surface/70 border-b backdrop-blur-xl"
          : "bg-transparent",
      ].join(" ")}
    >
      <div class="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="/" class="shrink-0">
          <Logo />
        </a>

        {/* Desktop nav — centered on screen */}
        <nav aria-label={t(state.locale, "public.header.navLabel")} class="hidden lg:flex fixed left-1/2 top-0 -translate-x-1/2 h-16 z-50 items-center">
          <ul class="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  class="text-label text-fg-secondary duration-fast hover:text-fg-primary rounded-md px-3 py-2 transition-colors"
                >
                  {t(state.locale, link.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div class="hidden items-center gap-2 lg:flex">
          {/* Language Switcher */}
          <div class="relative">
            <button
              type="button"
              onClick$={() => (langOpen.value = !langOpen.value)}
              aria-label={t(state.locale, "public.header.langLabel")}
              aria-expanded={langOpen.value}
              class="flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-caption text-fg-secondary duration-fast hover:bg-bg-elevated hover:text-fg-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <span class="font-medium">
                {LOCALE_OPTIONS.find((o) => o.code === state.locale)?.flag}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={["transition-transform duration-fast", langOpen.value && "rotate-180"].filter(Boolean).join(" ")}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {langOpen.value && (
              <div class="animate-content-show absolute right-0 top-full z-50 mt-1.5 min-w-[140px] rounded-lg border border-border bg-bg-surface p-1 shadow-lg">
                {LOCALE_OPTIONS.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick$={() => setLocaleInline(option.code)}
                    class={[
                      "flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-caption duration-fast transition-colors",
                      state.locale === option.code
                        ? "bg-bg-active text-fg-primary font-medium"
                        : "text-fg-secondary hover:bg-bg-elevated hover:text-fg-primary",
                    ].join(" ")}
                  >
                    <span class="text-[11px] font-semibold leading-none tracking-wide opacity-60">
                      {option.flag}
                    </span>
                    <span class="flex-1 text-left">{option.label}</span>
                    {state.locale === option.code && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent shrink-0">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick$={toggleThemeInline}
            class="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-fg-secondary hover:bg-bg-elevated hover:text-fg-primary duration-fast transition-colors"
            aria-label="Toggle theme"
          >
            {state.isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}

            {/* Tooltip */}
            <span class="pointer-events-none absolute left-1/2 top-[calc(100%+6px)] z-50 flex -translate-x-1/2 flex-col items-center opacity-0 transition-opacity duration-fast group-hover:opacity-100">
              {/* Arrow */}
              <span class="h-0 w-0 border-x-[6px] border-b-[6px] border-x-transparent border-b-bg-elevated" />
              {/* Content */}
              <span class="whitespace-nowrap rounded-md bg-bg-elevated border border-border px-3 py-1.5 text-caption text-fg-primary shadow-md">
                {state.isDark
                  ? t(state.locale, "public.themeToggle.switchToLight")
                  : t(state.locale, "public.themeToggle.switchToDark")}
              </span>
            </span>
          </button>

          <div class="bg-border mx-1 h-5 w-px" />

          <a
            href="/form"
            class="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-label font-medium text-fg-on-accent shadow-glow-accent-sm transition-all duration-fast hover:bg-accent-hover hover:shadow-glow-accent"
          >
            {t(state.locale, "public.header.getStarted")}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md lg:hidden text-fg-secondary hover:bg-bg-elevated hover:text-fg-primary duration-fast transition-colors"
          onClick$={() => (drawerOpen.value = true)}
          aria-label={t(state.locale, "public.header.openMenu")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen.value && (
        <>
          <div
            class="bg-bg-overlay fixed inset-0 z-50 animate-fade-in"
            onClick$={closeDrawer}
          />
          <div class="bg-bg-surface fixed inset-y-0 left-0 z-50 flex w-[80vw] max-w-72 flex-col shadow-xl" style={{ animation: "slide-in-left 250ms var(--ease-spring)" }}>
            <div class="flex h-16 items-center justify-between px-6">
              <a href="/" onClick$={closeDrawer}>
                <Logo />
              </a>
              <button
                class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-fg-muted hover:bg-bg-elevated hover:text-fg-primary duration-fast transition-colors"
                onClick$={closeDrawer}
                aria-label={t(state.locale, "public.header.closeMenu")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <nav class="flex-1 px-4">
              <ul class="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      class="text-label text-fg-secondary duration-fast hover:bg-bg-elevated hover:text-fg-primary block rounded-lg px-3 py-3 transition-colors"
                      onClick$={closeDrawer}
                    >
                      {t(state.locale, link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div class="border-border border-t p-4 space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  {LOCALE_OPTIONS.map((option) => (
                    <button
                      key={option.code}
                      class={[
                        "px-3 py-1.5 rounded-md text-caption transition-colors",
                        state.locale === option.code
                          ? "bg-bg-active text-fg-primary font-medium"
                          : "text-fg-secondary hover:text-fg-primary",
                      ].join(" ")}
                      onClick$={() => setLocaleInline(option.code)}
                    >
                      {option.flag}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick$={toggleThemeInline}
                  class="flex h-10 w-10 items-center justify-center rounded-md text-fg-secondary hover:bg-bg-elevated hover:text-fg-primary duration-fast transition-colors"
                  aria-label="Toggle theme"
                >
                  {state.isDark ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
});
