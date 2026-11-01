/**
 * Loading states shown by the route-level loading.tsx files while a page's
 * payload arrives. Same grid and proportions as the real pages, so nothing
 * moves when the content replaces them.
 */

function Bar({ className }: { className: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function PageHeadSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <Bar className="h-[clamp(2.4rem,1.4rem+3.8vw,5rem)] w-[min(520px,80%)]" />
      <Bar className="h-[clamp(2.4rem,1.4rem+3.8vw,5rem)] w-[min(420px,64%)]" />
    </div>
  );
}

export function CardSkeleton({ art = "aspect-[4/3]" }: { art?: string }) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-raised" aria-hidden="true">
      <div className={`skeleton rounded-none ${art}`} />
      <div className="space-y-3 p-6">
        <Bar className="h-7 w-1/2" />
        <Bar className="h-4 w-4/5" />
      </div>
    </div>
  );
}

export function SkillsSkeleton() {
  return (
    <Shell theme="paper">
      <PageHeadSkeleton />
      <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} art="aspect-[320/240]" />
        ))}
      </div>
    </Shell>
  );
}

export function ApplicationsSkeleton() {
  return (
    <Shell theme="paper">
      <PageHeadSkeleton />
      <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-[1.45fr_1fr]">
        <div className="skeleton min-h-[440px] rounded-md sm:min-h-[480px]" />
        <div className="grid gap-5">
          <div className="skeleton min-h-[220px] rounded-md" />
          <div className="skeleton min-h-[220px] rounded-md" />
        </div>
      </div>
    </Shell>
  );
}

export function GamesSkeleton() {
  return (
    <Shell theme="night">
      <PageHeadSkeleton />
      <div className="skeleton mt-12 min-h-[440px] rounded-md sm:mt-16 sm:min-h-[480px]" />
    </Shell>
  );
}

export function ProductSkeleton({ theme = "paper" }: { theme?: "paper" | "night" }) {
  return (
    <Shell theme={theme}>
      <Bar className="h-4 w-28" />
      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-4 lg:col-span-7">
          <Bar className="h-[clamp(3rem,1.8rem+5vw,6rem)] w-[min(560px,85%)]" />
          <Bar className="mt-6 h-5 w-[min(520px,90%)]" />
          <Bar className="h-5 w-[min(480px,80%)]" />
          <Bar className="h-5 w-[min(360px,60%)]" />
        </div>
        <div className="space-y-5 lg:col-span-4 lg:col-start-9">
          {Array.from({ length: 4 }).map((_, i) => (
            <Bar key={i} className="h-5 w-full" />
          ))}
        </div>
      </div>
    </Shell>
  );
}

function Shell({ theme, children }: { theme: "paper" | "night"; children: React.ReactNode }) {
  return (
    <div
      data-theme={theme}
      role="status"
      aria-label="Loading"
      className={theme === "night" ? "bg-night" : "bg-paper"}
    >
      <div className="mx-auto max-w-[1600px] px-[var(--gutter)] pb-24 pt-14 sm:pb-32 sm:pt-20">{children}</div>
    </div>
  );
}
