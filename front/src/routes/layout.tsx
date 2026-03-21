import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { useLocaleProvider } from "~/components/locale/locale-context";
import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import type { Locale } from "~/types";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(new RegExp("(?:^|;)\\s*" + name + "=([^;]*)"));
  return m ? m[1] : undefined;
}

export default component$(() => {
  const state = useLocaleProvider("fr", false);

  // Read cookies client-side and sync state on every page navigation
  useVisibleTask$(({ track }) => {
    track(() => state.locale);
    const localeCookie = getCookie("coders-locale");
    if (localeCookie === "en" || localeCookie === "fr") {
      state.locale = localeCookie as Locale;
    }

    const themeCookie = getCookie("coders-theme");
    const isDark = themeCookie === "dark";
    state.isDark = isDark;
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  // Keep dark class in sync when toggling
  useVisibleTask$(({ track }) => {
    const isDark = track(() => state.isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <div class="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" class="flex-1">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
