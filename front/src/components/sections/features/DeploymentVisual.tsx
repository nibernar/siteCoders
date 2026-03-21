import { component$ } from "@builder.io/qwik";
import { useLocale, t } from "~/components/locale/locale-context";
import { GlobeIcon, LinkIcon, LockIcon, CheckIcon } from "lucide-qwik";

export const DeploymentVisual = component$(() => {
  const state = useLocale();

  return (
    <div class="overflow-hidden rounded-card border border-border bg-bg-surface shadow-lg">
      <div class="flex h-8 items-center gap-2 border-b border-border bg-bg-elevated px-4">
        <span class="ml-2 text-[10px] text-fg-muted">
          Coders — Deployment
        </span>
      </div>
      <div class="p-5">
        {/* Domain config */}
        <div class="rounded-lg border border-border bg-bg-elevated p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <GlobeIcon
                size={16}
                stroke-width={1.5}
                class="text-accent"
                aria-hidden="true"
              />
              <span class="text-label text-fg-primary">monapp.codersai.fr</span>
            </div>
            <span class="rounded-full bg-success-subtle px-2 py-0.5 text-[10px] font-medium text-success">
              {t(state.locale, "public.features.visuals.deployment.active")}
            </span>
          </div>
        </div>

        <div class="mt-3 rounded-lg border border-border bg-bg-elevated p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <LinkIcon
                size={16}
                stroke-width={1.5}
                class="text-fg-secondary"
                aria-hidden="true"
              />
              <span class="text-label text-fg-primary">www.monapp.com</span>
            </div>
            <span class="rounded-full bg-accent-subtle px-2 py-0.5 text-[10px] font-medium text-accent">
              {t(state.locale, "public.features.visuals.deployment.dnsOk")}
            </span>
          </div>
        </div>

        {/* SSL status */}
        <div class="mt-4 flex items-center gap-2 rounded-lg border border-success/20 bg-success-subtle p-3">
          <LockIcon
            size={14}
            stroke-width={1.5}
            class="text-success"
            aria-hidden="true"
          />
          <span class="text-caption text-success font-medium">
            {t(state.locale, "public.features.visuals.deployment.ssl")}
          </span>
          <span class="ml-auto text-[10px] text-fg-muted">{t(state.locale, "public.features.visuals.deployment.autoRenew")}</span>
        </div>

        {/* Deploy history */}
        <div class="mt-4 space-y-2">
          {[
            { version: "v1.3.0", time: "2 min" },
            { version: "v1.2.1", time: "18 h" },
            { version: "v1.2.0", time: "2 j" },
          ].map((deploy, index) => (
            <div class="flex items-center gap-3 text-caption" key={index}>
              <CheckIcon
                size={12}
                stroke-width={2}
                class="text-success"
                aria-hidden="true"
              />
              <span class="text-fg-primary font-medium">
                {deploy.version}
              </span>
              <span class="ml-auto text-fg-muted">{deploy.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
