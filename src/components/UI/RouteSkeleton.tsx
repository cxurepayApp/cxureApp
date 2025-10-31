import type { ReactNode } from "react";

interface RouteSkeletonProps {
  title?: string;
  description?: string;
  illustration?: ReactNode;
}

export function RouteSkeleton({
  title = "Loading",
  description = "Give us a moment while we prepare this page.",
  illustration,
}: RouteSkeletonProps) {
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 text-center text-[#475467]">
      {illustration ?? (
        <span className="h-12 w-12 animate-spin rounded-full border-4 border-bpBlue/20 border-t-bpBlue" />
      )}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-bpDarkGray">{title}</h2>
        <p className="text-sm text-[#667085]">{description}</p>
      </div>
    </div>
  );
}
