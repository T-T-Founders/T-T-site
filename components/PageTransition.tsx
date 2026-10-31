import { ViewTransition } from "react";

/**
 * Wraps a page so route changes cross-fade: the old page leaves quickly, the
 * new one rises in. Lives in each page (not the layout), because layouts
 * persist across navigations and would never enter or exit.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
