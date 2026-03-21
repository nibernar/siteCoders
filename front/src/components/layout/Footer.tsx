import { component$ } from "@builder.io/qwik";
import { useLocale, t } from "~/components/locale/locale-context";
import { Logo } from "~/components/composed/Logo";

interface FooterLink {
  labelKey: string;
  href: string;
}

interface FooterColumn {
  titleKey: string;
  links: FooterLink[];
}

export const Footer = component$(() => {
  const state = useLocale();

  const columns: FooterColumn[] = [
    {
      titleKey: "public.footer.product",
      links: [
        { labelKey: "public.footer.features", href: "/features" },
        { labelKey: "public.footer.documentation", href: "#" },
      ],
    },
    {
      titleKey: "public.footer.company",
      links: [
        { labelKey: "public.footer.aboutUs", href: "/about" },
        { labelKey: "public.footer.contact", href: "/form" },
      ],
    },
  ];

  const copyright = t(state.locale, "public.footer.copyright").replace("{year}", String(new Date().getFullYear()));

  return (
    <footer class="border-border bg-bg-surface border-t">
      <div class="mx-auto max-w-7xl px-6 py-16">
        <div class="grid gap-12 lg:grid-cols-4">
          {/* Logo + tagline */}
          <div class="lg:col-span-1">
            <a href="/" class="inline-block">
              <Logo />
            </a>
            <p class="text-body text-fg-secondary mt-4">
              {t(state.locale, "public.footer.tagline")}
            </p>
          </div>

          {/* Link columns */}
          <div class="grid grid-cols-2 gap-8 lg:col-span-3">
            {columns.map((column) => (
              <div key={column.titleKey}>
                <h3 class="text-overline text-fg-muted mb-4">{t(state.locale, column.titleKey)}</h3>
                <ul class="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.labelKey}>
                      <a
                        href={link.href}
                        class="text-body text-fg-secondary duration-fast hover:text-fg-primary transition-colors"
                      >
                        {t(state.locale, link.labelKey)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div class="border-border border-t">
        <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p class="text-caption text-fg-muted">{copyright}</p>
          <nav aria-label={t(state.locale, "public.footer.socialLabel")} class="flex items-center gap-4">
            {/* Twitter */}
            <a
              href="https://x.com/Coders_Ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              class="text-fg-muted duration-fast hover:text-fg-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/codersai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="text-fg-muted duration-fast hover:text-fg-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
});
