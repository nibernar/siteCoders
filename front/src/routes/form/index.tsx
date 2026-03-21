import { component$, useStore, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocale, t } from "~/components/locale/locale-context";
import { Button } from "~/components/ui/Button";

const OTHER = "other";

/** Strip emojis and HTML tags from user input */
const sanitize = (v: string) =>
  v.replace(/\p{Extended_Pictographic}/gu, "").replace(/<[^>]*>/g, "");

const AGE_OPTIONS = ["under17", "18_24", "25_34", "35_44", "45_plus"];
const STATUS_OPTIONS = ["entrepreneur", "freelance", "employee", "student", OTHER];
const STAGE_OPTIONS = ["concept", "spec", "mockup", "mvp", OTHER];
const TOOL_OPTIONS = ["landing", "ecommerce", "internal", "saas", "form", OTHER];
const GOAL_OPTIONS = ["mvp", "client", "internal", "product", OTHER];
const AI_OPTIONS = ["ideation", "design", "technical", "bugs", "business", OTHER];
const PRIORITY_KEYS = ["easeOfUse", "speed", "customization", "deployment", "price"];

const SCALE_ITEMS = [
  { key: "currentBlockage", stateKey: "current_blockage" },
  { key: "fixedLogic", stateKey: "fixed_logic" },
  { key: "urgency", stateKey: "urgency" },
  { key: "externalPressure", stateKey: "external_pressure" },
  { key: "currentSolutionsInadequacy", stateKey: "current_solutions_inadequacy" },
  { key: "strategicImportance", stateKey: "strategic_importance" },
] as const;

export default component$(() => {
  const state = useLocale();

  const formState = useStore({
    email: "",
    age: "",
    current_status: "",
    status_other: "",
    project_stage: "",
    stage_other: "",
    tool_type: "",
    tool_other: "",
    main_goal: "",
    goal_other: "",
    used_nocode: "no",
    nocode_abandon_reason: "",
    priorities_ranking: [...PRIORITY_KEYS],
    ai_expectations: [] as string[],
    ai_expectations_other: "",
    ideal_price: "",
    ai_prompt: "",
    technical_limits: "",
    current_blockage: 5,
    fixed_logic: 5,
    urgency: 5,
    external_pressure: 5,
    current_solutions_inadequacy: 5,
    strategic_importance: 5,
  });

  const uiState = useStore({
    loading: false,
    success: false,
    error: "",
  });

  const dragItemIndex = useSignal<number | null>(null);
  const dragOverItemIndex = useSignal<number | null>(null);

  const handleDrop = $(() => {
    if (dragItemIndex.value === null || dragOverItemIndex.value === null) return;
    const startIndex = dragItemIndex.value;
    const endIndex = dragOverItemIndex.value;
    if (startIndex === endIndex) {
      dragItemIndex.value = null;
      dragOverItemIndex.value = null;
      return;
    }
    const newRanking = [...formState.priorities_ranking];
    const draggedItem = newRanking[startIndex];
    newRanking.splice(startIndex, 1);
    newRanking.splice(endIndex, 0, draggedItem);
    formState.priorities_ranking = newRanking;
    dragItemIndex.value = null;
    dragOverItemIndex.value = null;
  });

  const moveItem = $((index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formState.priorities_ranking.length) return;
    const newRanking = [...formState.priorities_ranking];
    const item = newRanking[index];
    newRanking.splice(index, 1);
    newRanking.splice(newIndex, 0, item);
    formState.priorities_ranking = newRanking;
  });

  const handleCheckboxChange = $((value: string, isChecked: boolean) => {
    if (isChecked) {
      formState.ai_expectations = [...formState.ai_expectations, value];
    } else {
      formState.ai_expectations = formState.ai_expectations.filter(
        (item) => item !== value,
      );
    }
  });

  const onSubmit = $(async (e: Event) => {
    e.preventDefault();
    uiState.loading = true;
    uiState.error = "";
    uiState.success = false;

    try {
      const tr = (section: string, key: string) =>
        t(state.locale, `public.survey.${section}.${key}`);

      const resolveOther = (
        section: string,
        key: string,
        otherText: string,
      ) => (key === OTHER && otherText ? `Other: ${otherText}` : tr(section, key));

      const payload = {
        email: formState.email,
        age: tr("age", formState.age),
        current_status: resolveOther(
          "status",
          formState.current_status,
          formState.status_other,
        ),
        project_stage: resolveOther(
          "stage",
          formState.project_stage,
          formState.stage_other,
        ),
        tool_type: resolveOther(
          "toolType",
          formState.tool_type,
          formState.tool_other,
        ),
        main_goal: resolveOther(
          "goal",
          formState.main_goal,
          formState.goal_other,
        ),
        used_nocode: formState.used_nocode === "yes",
        nocode_abandon_reason:
          formState.used_nocode === "yes"
            ? formState.nocode_abandon_reason
            : null,
        priorities_ranking: formState.priorities_ranking.map((k) =>
          tr("priorities", k),
        ),
        ai_expectations: formState.ai_expectations.map((k) =>
          k === OTHER && formState.ai_expectations_other
            ? `Other: ${formState.ai_expectations_other}`
            : tr("aiExpectations", k),
        ),
        ideal_price: formState.ideal_price,
        ai_prompt: formState.ai_prompt,
        technical_limits: formState.technical_limits,
        current_blockage: formState.current_blockage,
        fixed_logic: formState.fixed_logic,
        urgency: formState.urgency,
        external_pressure: formState.external_pressure,
        current_solutions_inadequacy: formState.current_solutions_inadequacy,
        strategic_importance: formState.strategic_importance,
      };

      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message ||
            t(state.locale, "public.survey.error.submission"),
        );
      }

      uiState.success = true;
    } catch (err: any) {
      uiState.error =
        err.message || t(state.locale, "public.survey.error.generic");
    } finally {
      uiState.loading = false;
    }
  });

  /* ── Shared classes ── */
  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-input-bg border border-input-border text-fg-primary placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-fast";
  const labelClass = "block text-label text-fg-secondary mb-2";

  const radioIndicator = (checked: boolean) =>
    [
      "flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-fast shrink-0",
      checked
        ? "border-accent bg-accent-subtle"
        : "border-border-strong group-hover:border-fg-muted",
    ].join(" ");

  const checkIndicator = (checked: boolean) =>
    [
      "flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all duration-fast shrink-0",
      checked
        ? "border-accent bg-accent text-fg-on-accent"
        : "border-border-strong group-hover:border-fg-muted",
    ].join(" ");

  /* ── Success popup is rendered inline below ── */

  /* ── Form ── */
  return (
    <div class="relative min-h-screen overflow-hidden pt-24 pb-16">
      {/* Success popup overlay */}
      {uiState.success && (
        <>
          <div
            class="fixed inset-0 z-50 bg-bg-overlay animate-fade-in"
            onClick$={() => (uiState.success = false)}
          />
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div class="relative max-w-md w-full p-8 bg-bg-surface border border-border rounded-card shadow-xl text-center pointer-events-auto animate-content-show">
              <button
                type="button"
                onClick$={() => (uiState.success = false)}
                class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-md text-fg-muted hover:text-fg-primary hover:bg-bg-elevated transition-colors duration-fast cursor-pointer"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
              <div class="w-16 h-16 mx-auto mb-6 bg-success-subtle text-success rounded-full flex items-center justify-center">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 class="text-h3 text-fg-primary mb-3">
                {t(state.locale, "public.survey.success.title")}
              </h2>
              <p class="text-body-lg text-fg-secondary mb-8">
                {t(state.locale, "public.survey.success.message")}
              </p>
              <a href="/">
                <Button variant="primary" size="lg">
                  {t(state.locale, "public.survey.success.backHome")}
                </Button>
              </a>
            </div>
          </div>
        </>
      )}
      {/* Dot grid background */}
      <div
        class="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.70 0.18 280 / 0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Radial glow */}
      <div
        class="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 10%, oklch(0.35 0.20 280 / 0.50) 0%, oklch(0.20 0.10 280 / 0.20) 40%, transparent 75%)",
        }}
      />

      <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div class="text-center mb-12">
          <h1 class="text-h1 text-fg-primary xl:text-display">
            {t(state.locale, "public.survey.title")}{" "}
            <span
              class="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, oklch(0.75 0.20 280), oklch(0.70 0.16 230))",
              }}
            >
              {t(state.locale, "public.survey.titleHighlight")}
            </span>
          </h1>
          <p class="mt-4 text-body-lg text-fg-secondary max-w-xl mx-auto">
            {t(state.locale, "public.survey.subtitle")}
          </p>
        </div>

        <form
          preventdefault:submit
          onSubmit$={onSubmit}
          class="space-y-12 bg-bg-surface/80 backdrop-blur-sm p-8 sm:p-12 rounded-card border border-border shadow-xl"
        >
          {uiState.error && (
            <div class="p-4 bg-error-subtle border border-error/20 rounded-lg text-error text-body">
              {uiState.error}
            </div>
          )}

          {/* ── Section 1: Profile ── */}
          <div class="space-y-8">
            <h3 class="text-h4 text-fg-primary border-b border-border pb-3">
              {t(state.locale, "public.survey.sections.profile")}
            </h3>

            {/* Email */}
            <div>
              <label class={labelClass}>
                {t(state.locale, "public.survey.email.label")} *
              </label>
              <input
                required
                type="email"
                value={formState.email}
                onInput$={(e: any) => (formState.email = e.target.value)}
                placeholder={t(state.locale, "public.survey.email.placeholder")}
                class={inputClass}
              />
            </div>

            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {/* Age */}
              <div>
                <label class={labelClass}>
                  {t(state.locale, "public.survey.age.label")} *
                </label>
                <div class="flex flex-col gap-2.5 mt-3">
                  {AGE_OPTIONS.map((opt) => (
                    <label key={opt} class="flex items-center gap-3 cursor-pointer group">
                      <input
                        required
                        type="radio"
                        name="age"
                        value={opt}
                        checked={formState.age === opt}
                        onChange$={() => (formState.age = opt)}
                        class="absolute w-0 h-0 opacity-0"
                      />
                      <span class={radioIndicator(formState.age === opt)}>
                        {formState.age === opt && (
                          <span class="w-2.5 h-2.5 rounded-full bg-accent" />
                        )}
                      </span>
                      <span class="text-body text-fg-secondary group-hover:text-fg-primary transition-colors duration-fast">
                        {t(state.locale, `public.survey.age.${opt}`)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label class={labelClass}>
                  {t(state.locale, "public.survey.status.label")} *
                </label>
                <div class="flex flex-col gap-2.5 mt-3">
                  {STATUS_OPTIONS.map((opt) => (
                    <label key={opt} class="flex items-center gap-3 cursor-pointer group">
                      <input
                        required
                        type="radio"
                        name="status"
                        value={opt}
                        checked={formState.current_status === opt}
                        onChange$={() => (formState.current_status = opt)}
                        class="absolute w-0 h-0 opacity-0"
                      />
                      <span class={radioIndicator(formState.current_status === opt)}>
                        {formState.current_status === opt && (
                          <span class="w-2.5 h-2.5 rounded-full bg-accent" />
                        )}
                      </span>
                      <span class="text-body text-fg-secondary group-hover:text-fg-primary transition-colors duration-fast">
                        {t(state.locale, `public.survey.status.${opt}`)}
                      </span>
                    </label>
                  ))}
                </div>
                {formState.current_status === OTHER && (
                  <input
                    type="text"
                    value={formState.status_other}
                    onInput$={(e: any) => (formState.status_other = sanitize(e.target.value))}
                    placeholder={t(state.locale, "public.survey.status.placeholder")}
                    class={`${inputClass} mt-3 animate-slide-up`}
                    required
                  />
                )}
              </div>
            </div>

            {/* Stage */}
            <div>
              <label class={labelClass}>
                {t(state.locale, "public.survey.stage.label")} *
              </label>
              <div class="flex flex-col gap-2.5 mt-3">
                {STAGE_OPTIONS.map((opt) => (
                  <label key={opt} class="flex items-center gap-3 cursor-pointer group">
                    <input
                      required
                      type="radio"
                      name="stage"
                      value={opt}
                      checked={formState.project_stage === opt}
                      onChange$={() => (formState.project_stage = opt)}
                      class="absolute w-0 h-0 opacity-0"
                    />
                    <span class={radioIndicator(formState.project_stage === opt)}>
                      {formState.project_stage === opt && (
                        <span class="w-2.5 h-2.5 rounded-full bg-accent" />
                      )}
                    </span>
                    <span class="text-body text-fg-secondary group-hover:text-fg-primary transition-colors duration-fast">
                      {t(state.locale, `public.survey.stage.${opt}`)}
                    </span>
                  </label>
                ))}
              </div>
              {formState.project_stage === OTHER && (
                <input
                  type="text"
                  value={formState.stage_other}
                  onInput$={(e: any) => (formState.stage_other = sanitize(e.target.value))}
                  placeholder={t(state.locale, "public.survey.stage.placeholder")}
                  class={`${inputClass} mt-3 animate-slide-up`}
                  required
                />
              )}
            </div>

            {/* Tool Type */}
            <div>
              <label class={labelClass}>
                {t(state.locale, "public.survey.toolType.label")} *
              </label>
              <div class="flex flex-col gap-2.5 mt-3">
                {TOOL_OPTIONS.map((opt) => (
                  <label key={opt} class="flex items-center gap-3 cursor-pointer group">
                    <input
                      required
                      type="radio"
                      name="toolType"
                      value={opt}
                      checked={formState.tool_type === opt}
                      onChange$={() => (formState.tool_type = opt)}
                      class="absolute w-0 h-0 opacity-0"
                    />
                    <span class={radioIndicator(formState.tool_type === opt)}>
                      {formState.tool_type === opt && (
                        <span class="w-2.5 h-2.5 rounded-full bg-accent" />
                      )}
                    </span>
                    <span class="text-body text-fg-secondary group-hover:text-fg-primary transition-colors duration-fast">
                      {t(state.locale, `public.survey.toolType.${opt}`)}
                    </span>
                  </label>
                ))}
              </div>
              {formState.tool_type === OTHER && (
                <input
                  type="text"
                  value={formState.tool_other}
                  onInput$={(e: any) => (formState.tool_other = sanitize(e.target.value))}
                  placeholder={t(state.locale, "public.survey.toolType.placeholder")}
                  class={`${inputClass} mt-3 animate-slide-up`}
                  required
                />
              )}
            </div>

            {/* Goal */}
            <div>
              <label class={labelClass}>
                {t(state.locale, "public.survey.goal.label")} *
              </label>
              <div class="flex flex-col gap-2.5 mt-3">
                {GOAL_OPTIONS.map((opt) => (
                  <label key={opt} class="flex items-center gap-3 cursor-pointer group">
                    <input
                      required
                      type="radio"
                      name="mainGoal"
                      value={opt}
                      checked={formState.main_goal === opt}
                      onChange$={() => (formState.main_goal = opt)}
                      class="absolute w-0 h-0 opacity-0"
                    />
                    <span class={radioIndicator(formState.main_goal === opt)}>
                      {formState.main_goal === opt && (
                        <span class="w-2.5 h-2.5 rounded-full bg-accent" />
                      )}
                    </span>
                    <span class="text-body text-fg-secondary group-hover:text-fg-primary transition-colors duration-fast">
                      {t(state.locale, `public.survey.goal.${opt}`)}
                    </span>
                  </label>
                ))}
              </div>
              {formState.main_goal === OTHER && (
                <input
                  type="text"
                  value={formState.goal_other}
                  onInput$={(e: any) => (formState.goal_other = sanitize(e.target.value))}
                  placeholder={t(state.locale, "public.survey.goal.placeholder")}
                  class={`${inputClass} mt-3 animate-slide-up`}
                  required
                />
              )}
            </div>
          </div>

          {/* ── Section 2: Experience & AI ── */}
          <div class="space-y-8">
            <h3 class="text-h4 text-fg-primary border-b border-border pb-3">
              {t(state.locale, "public.survey.sections.experience")}
            </h3>

            {/* Used No-Code */}
            <div>
              <label class={labelClass}>
                {t(state.locale, "public.survey.nocode.label")} *
              </label>
              <div class="mt-3 flex gap-6">
                {(["yes", "no"] as const).map((val) => (
                  <label key={val} class="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="usedNoCode"
                      value={val}
                      checked={formState.used_nocode === val}
                      onChange$={() => (formState.used_nocode = val)}
                      class="absolute w-0 h-0 opacity-0"
                    />
                    <span class={radioIndicator(formState.used_nocode === val)}>
                      {formState.used_nocode === val && (
                        <span class="w-2.5 h-2.5 rounded-full bg-accent" />
                      )}
                    </span>
                    <span class="text-body text-fg-secondary group-hover:text-fg-primary transition-colors duration-fast">
                      {t(state.locale, `public.survey.nocode.${val}`)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {formState.used_nocode === "yes" && (
              <div class="animate-slide-up">
                <label class={labelClass}>
                  {t(state.locale, "public.survey.nocode.abandonLabel")} *
                </label>
                <p class="text-caption text-fg-muted mb-2">
                  {t(state.locale, "public.survey.nocode.abandonHint")}
                </p>
                <textarea
                  required={formState.used_nocode === "yes"}
                  value={formState.nocode_abandon_reason}
                  onInput$={(e: any) => (formState.nocode_abandon_reason = sanitize(e.target.value))}
                  rows={3}
                  placeholder={t(state.locale, "public.survey.nocode.abandonPlaceholder")}
                  class={inputClass}
                />
              </div>
            )}

            {/* AI Expectations */}
            <div>
              <label class={labelClass}>
                {t(state.locale, "public.survey.aiExpectations.label")}
              </label>
              <div class="flex flex-col gap-2.5 mt-3">
                {AI_OPTIONS.map((opt) => {
                  const isChecked = formState.ai_expectations.includes(opt);
                  return (
                    <label key={opt} class="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange$={(e: any) => handleCheckboxChange(opt, e.target.checked)}
                        class="absolute w-0 h-0 opacity-0"
                      />
                      <span class={checkIndicator(isChecked)}>
                        {isChecked && (
                          <svg
                            class="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="3"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </span>
                      <span class="text-body text-fg-secondary group-hover:text-fg-primary transition-colors duration-fast">
                        {t(state.locale, `public.survey.aiExpectations.${opt}`)}
                      </span>
                    </label>
                  );
                })}
              </div>
              {formState.ai_expectations.includes(OTHER) && (
                <input
                  type="text"
                  value={formState.ai_expectations_other}
                  onInput$={(e: any) => (formState.ai_expectations_other = sanitize(e.target.value))}
                  placeholder={t(state.locale, "public.survey.aiExpectations.placeholder")}
                  class={`${inputClass} mt-3 animate-slide-up`}
                  required
                />
              )}
            </div>

            {/* AI Prompt */}
            <div>
              <label class={labelClass}>
                {t(state.locale, "public.survey.aiPrompt.label")} *
              </label>
              <textarea
                required
                value={formState.ai_prompt}
                onInput$={(e: any) => (formState.ai_prompt = sanitize(e.target.value))}
                rows={4}
                placeholder={t(state.locale, "public.survey.aiPrompt.placeholder")}
                class={inputClass}
              />
            </div>
          </div>

          {/* ── Section 3: Needs & Priorities ── */}
          <div class="space-y-8">
            <h3 class="text-h4 text-fg-primary border-b border-border pb-3">
              {t(state.locale, "public.survey.sections.needs")}
            </h3>

            {/* Priorities Ranking */}
            <div>
              <label class={labelClass}>
                {t(state.locale, "public.survey.priorities.label")} *
              </label>
              <p class="text-caption text-fg-muted mb-4">
                {t(state.locale, "public.survey.priorities.hint")}
              </p>

              <div class="space-y-2.5" preventdefault:dragover>
                {formState.priorities_ranking.map((item, id) => (
                  <div
                    key={item}
                    draggable={true}
                    onDragStart$={() => (dragItemIndex.value = id)}
                    onDragEnter$={() => (dragOverItemIndex.value = id)}
                    onDragEnd$={() => handleDrop()}
                    onDragOver$={(e) => e.preventDefault()}
                    class={[
                      "flex items-center justify-between p-3 border rounded-lg lg:cursor-grab lg:active:cursor-grabbing transition-all duration-fast",
                      dragItemIndex.value === id
                        ? "bg-accent-subtle border-accent/30 opacity-50 shadow-inner"
                        : "bg-bg-elevated border-border hover:bg-bg-muted",
                    ].join(" ")}
                  >
                    <div class="flex items-center gap-3 lg:gap-4 pointer-events-none">
                      <span class="flex items-center justify-center w-8 h-8 rounded-full bg-accent-subtle text-accent font-bold text-caption shrink-0">
                        {id + 1}
                      </span>
                      <span class="font-medium text-fg-primary text-body">
                        {t(state.locale, `public.survey.priorities.${item}`)}
                      </span>
                    </div>
                    <div class="flex items-center gap-1">
                      {/* Mobile up/down buttons */}
                      <div class="flex flex-col gap-0.5 lg:hidden">
                        <button
                          type="button"
                          disabled={id === 0}
                          onClick$={() => moveItem(id, "up")}
                          class="flex items-center justify-center w-8 h-8 rounded-md text-fg-muted hover:bg-bg-muted hover:text-fg-primary disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                        </button>
                        <button
                          type="button"
                          disabled={id === formState.priorities_ranking.length - 1}
                          onClick$={() => moveItem(id, "down")}
                          class="flex items-center justify-center w-8 h-8 rounded-md text-fg-muted hover:bg-bg-muted hover:text-fg-primary disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </button>
                      </div>
                      {/* Desktop drag handle */}
                      <div class="text-fg-muted pointer-events-none hidden lg:block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="9" cy="12" r="1" />
                          <circle cx="9" cy="5" r="1" />
                          <circle cx="9" cy="19" r="1" />
                          <circle cx="15" cy="12" r="1" />
                          <circle cx="15" cy="5" r="1" />
                          <circle cx="15" cy="19" r="1" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal Price */}
            <div>
              <label class={labelClass}>
                {t(state.locale, "public.survey.idealPrice.label")} *
              </label>
              <input
                required
                type="number"
                min="0"
                step="1"
                value={formState.ideal_price}
                onInput$={(e: any) => (formState.ideal_price = e.target.value)}
                placeholder={t(state.locale, "public.survey.idealPrice.placeholder")}
                class={inputClass}
              />
            </div>

            {/* Technical Limits */}
            <div>
              <label class={labelClass}>
                {t(state.locale, "public.survey.technicalLimits.label")} *
              </label>
              <p class="text-caption text-fg-muted mb-2">
                {t(state.locale, "public.survey.technicalLimits.hint")}
              </p>
              <textarea
                required
                value={formState.technical_limits}
                onInput$={(e: any) => (formState.technical_limits = sanitize(e.target.value))}
                rows={3}
                placeholder={t(state.locale, "public.survey.technicalLimits.placeholder")}
                class={inputClass}
              />
            </div>
          </div>

          {/* ── Section 4: Scales ── */}
          <div class="space-y-8">
            <h3 class="text-h4 text-fg-primary border-b border-border pb-3">
              {t(state.locale, "public.survey.sections.evaluation")}
            </h3>

            {SCALE_ITEMS.map(({ key, stateKey }) => (
              <div
                key={key}
                class="bg-bg-elevated/50 p-5 rounded-xl border border-border"
              >
                <div class="flex justify-between items-start mb-4">
                  <label class="block text-label text-fg-secondary flex-1 pr-4">
                    {t(state.locale, `public.survey.scales.${key}.label`)}
                  </label>
                  <span class="text-h2 font-black text-accent bg-bg-surface w-12 h-12 flex items-center justify-center rounded-xl shadow-sm shrink-0">
                    {(formState as any)[stateKey]}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={(formState as any)[stateKey]}
                  onInput$={(e: any) =>
                    ((formState as any)[stateKey] = parseInt(e.target.value))
                  }
                  class="w-full h-2 bg-bg-muted rounded-full appearance-none cursor-pointer accent-accent-500"
                />
                <div class="flex justify-between text-caption text-fg-muted mt-3 gap-4">
                  <span class="max-w-[45%]">
                    {t(state.locale, `public.survey.scales.${key}.min`)}
                  </span>
                  <span class="max-w-[45%] text-right">
                    {t(state.locale, `public.survey.scales.${key}.max`)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Submit ── */}
          <div class="pt-6 border-t border-border">
            <Button
              type="submit"
              loading={uiState.loading}
              variant="primary"
              size="lg"
              class="w-full sm:w-auto"
            >
              {t(state.locale, "public.survey.submit")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Sondage Produit — Coders",
  meta: [
    {
      name: "description",
      content:
        "Aidez-nous à construire le meilleur outil pour votre développement.",
    },
  ],
};
