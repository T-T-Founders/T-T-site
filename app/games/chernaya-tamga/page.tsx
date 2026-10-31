import type { Metadata } from "next";
import Image from "next/image";
import ProductPage from "@/components/ProductPage";
import avenue from "@/public/images/games/tamga-avenue.jpg";
import courtyard from "@/public/images/games/tamga-courtyard.jpg";
import fire from "@/public/images/games/tamga-fire.jpg";

export const metadata: Metadata = {
  title: "Chernaya Tamga",
  description:
    "Chernaya Tamga is a third-person dark fantasy game in development, set in Aktobe after the sun has been swallowed.",
  openGraph: { images: [{ url: avenue.src, width: avenue.width, height: avenue.height }] },
};

const shots = [
  { src: avenue, alt: "The player walks down a dark avenue between apartment blocks under a violet sky." },
  { src: courtyard, alt: "Two hooded survivors talk beside a bonfire in a brick courtyard at night." },
  { src: fire, alt: "A gauntleted hand raised toward a bonfire; figures of the Returned in the distance." },
];

export default function ChernayaTamgaPage() {
  return (
    <ProductPage
      theme="night"
      back={{ href: "/#games", label: "Games" }}
      kind="Game in development"
      name="Chernaya Tamga"
      nativeName="Чёрная Тамга"
      lead={
        <p>
          A third-person dark fantasy set in Aktobe, Kazakhstan. The Black Khan has woken under the
          city and swallowed the sun; after forty days of night, the dead walk the streets. You carry
          a black tamga on your palm that tears souls out of the creatures of the night.
        </p>
      }
      facts={[
        { label: "Engine", value: "Godot 4.7" },
        { label: "Status", value: "In development, no release date" },
        { label: "Game text", value: "Russian" },
        { label: "Platforms", value: "Not announced" },
      ]}
      visual={
        <figure>
          <div className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
            <div className="relative aspect-[1280/550] overflow-hidden rounded-md md:row-span-2 md:aspect-auto">
              <Image
                src={shots[0].src}
                alt={shots[0].alt}
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
            {shots.slice(1).map((s) => (
              <div key={s.src.src} className="relative aspect-[1280/430] overflow-hidden rounded-md">
                <Image src={s.src} alt={s.alt} fill placeholder="blur" sizes="(min-width: 768px) 38vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
          <figcaption className="mt-4 text-[0.9rem] text-night-mute">
            Screenshots from a development build, interface overlays cropped.
          </figcaption>
        </figure>
      }
      blocks={[
        {
          title: "How it plays",
          items: [
            { term: "Raids", text: "Leave the refuge, raid a randomly generated night district, collect souls and get out." },
            { term: "Story mode", text: "A second, chapter-based mode is being built. Chapter 1 takes place at a college." },
            { term: "Combat", text: "Over-the-shoulder melee with block and parry, dash, wall-run and tamga fire." },
            { term: "Enemies", text: "Figures from Kazakh folklore: the Returned, zheztyrnak, albasty, zhalmauyz kempir and the Black Khan." },
          ],
        },
        {
          title: "Credits",
          items: [
            { term: "Characters", text: "Quaternius, CC0" },
            { term: "Textures", text: "Poly Haven, CC0" },
            { term: "Bosses and props", text: "Made for this project with generative 3D tools" },
          ],
        },
      ]}
    />
  );
}
