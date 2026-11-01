import Image from "next/image";
import { signOff, storyScreens } from "@/lib/story";
import landscape from "@/public/images/hero/landscape.webp";

/*
 * Home: one picture in a window with paper around it (an eclipse over a
 * planet, hills and a river at dusk), and the team's story over it in three
 * screens, top to bottom. Plain scroll; each screen only fades in once.
 * Wide windows: screen 1 sits on the pale sky (ink text), 2 and 3 on the dark
 * hills (paper text over a soft shade). Narrow windows show the eclipse first
 * and start the copy below it, all in paper text.
 */
export default function Hero() {
  return (
    <section
      id="about"
      data-nav="about"
      data-theme="sky"
      aria-labelledby="home-title"
      className="px-[var(--gutter)] pb-[var(--gutter)]"
    >
      <h1 id="home-title" className="sr-only">
        T&amp;T Labs
      </h1>
      <div className="grain-on relative mx-auto max-w-[1600px] overflow-hidden rounded-md bg-night">
        <Image
          src={landscape}
          alt="An eclipse of a grey and a copper disc above a planet's horizon; dark hills and a river below, lit copper at dusk."
          fill
          preload
          sizes="(min-width: 1600px) 1600px, 100vw"
          className="object-cover object-[85%_center] sm:object-[80%_center] lg:object-center"
        />

        {/* a soft shade behind the copy on the dark hills (screens 2 and 3), fading in from the sky */}
        <div className="story-shade" aria-hidden="true" />

        {storyScreens.map((s, i) => {
          const onSky = i === 0;
          return (
            <div
              key={s.title}
              className={`relative z-[2] flex min-h-[calc(100svh-var(--header-h)-var(--gutter))] items-center px-6 py-20 sm:px-10 lg:px-16 ${
                // narrow windows: the eclipse comes first, like a cover, then the copy below it
                onSky ? "items-start pt-[162vw] sm:pt-[100vw] md:pt-[90vw] lg:items-center lg:pt-20" : ""
              }`}
            >
              <div data-reveal className={`max-w-[34rem] ${onSky ? "text-paper lg:text-ink" : "text-paper"}`}>
                <h2 className="font-display text-[clamp(2.3rem,1.3rem+3.4vw,4.6rem)] leading-[1.02] tracking-[-0.02em] [text-wrap:balance]">
                  {s.title}
                </h2>
                {s.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 24)}
                    className={`mt-5 text-[clamp(1rem,0.95rem+0.25vw,1.15rem)] leading-[1.7] ${
                      onSky ? "text-paper/90 lg:text-ink/85" : "text-paper/90"
                    }`}
                  >
                    {p}
                  </p>
                ))}
                {i === storyScreens.length - 1 ? (
                  <p className="mt-10 font-display text-[clamp(1.8rem,1.2rem+1.6vw,2.6rem)] leading-none">{signOff}</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
