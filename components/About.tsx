import SectionTitle from "./SectionTitle";

/** Home, second screen: who the team is. The projects live on their own pages. */
export default function About() {
  return (
    <section
      id="about"
      data-theme="paper"
      aria-labelledby="about-title"
      className="mx-auto flex max-w-[1600px] items-center px-[var(--gutter)] py-24 sm:py-32 lg:min-h-[calc(100svh-var(--header-h))]"
    >
      <div className="grid w-full gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <SectionTitle id="about-title" roman="We started" italic="in college." />
          <div data-reveal className="mt-10 h-px max-w-[610px] bg-line" />
        </div>
        <p
          data-reveal
          style={{ ["--i" as string]: 1 }}
          className="max-w-[40ch] text-[1.1rem] leading-[1.7] text-ink/90 lg:col-span-5 lg:col-start-8 lg:self-center"
        >
          A few students who wanted to make their own tools, software and games. We still build,
          test and fix every project ourselves.
        </p>
      </div>
    </section>
  );
}
