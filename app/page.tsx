import Hero from "@/components/Hero";
import About from "@/components/About";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <About />
    </PageTransition>
  );
}
