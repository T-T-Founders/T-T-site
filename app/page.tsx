import Hero from "@/components/Hero";
import Story from "@/components/Story";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Story />
    </PageTransition>
  );
}
