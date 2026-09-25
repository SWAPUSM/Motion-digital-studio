/**
 * The "motion line": a hairline that fills as the visitor moves through the story.
 * Driven by a CSS scroll-driven animation (see .scroll-progress in index.css), so it
 * runs on the compositor with no JavaScript per scroll frame. Browsers without
 * scroll-timeline support simply don't show it.
 */
export default function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="scroll-progress fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-electric via-cyan to-white shadow-[0_0_12px_rgba(0,209,255,.7)]"
    />
  )
}
