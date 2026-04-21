import { TopNav } from '@/components/nav/TopNav';
import { HeroOpening } from '@/components/scenes/HeroOpening';
import { Manifesto } from '@/components/scenes/Manifesto';
import { FooterTease } from '@/components/scenes/FooterTease';

export default function HomePage() {
  return (
    <main className="relative">
      <TopNav />
      <HeroOpening />
      <Manifesto />
      <FooterTease />
    </main>
  );
}
