import { TopNav } from '@/components/nav/TopNav';
import { HeroOpening } from '@/components/scenes/HeroOpening';
import { Manifesto } from '@/components/scenes/Manifesto';
import { NacksShow } from '@/components/scenes/NacksShow';
import { CustomsBlock } from '@/components/scenes/CustomsBlock';
import { UniversHorizontal } from '@/components/scenes/UniversHorizontal';
import { JournalTease } from '@/components/scenes/JournalTease';
import { CercleNewsletter } from '@/components/scenes/CercleNewsletter';
import { FooterUnivers } from '@/components/scenes/FooterUnivers';

export default function HomePage() {
  return (
    <main className="relative">
      <TopNav />
      <section id="scene-hero">
        <HeroOpening />
      </section>
      <section id="scene-manifeste">
        <Manifesto />
      </section>
      <section id="scene-oeuvres">
        <NacksShow />
      </section>
      <section id="scene-customs">
        <CustomsBlock />
      </section>
      <section id="scene-univers">
        <UniversHorizontal />
      </section>
      <section id="scene-journal">
        <JournalTease />
      </section>
      <section id="scene-newsletter">
        <CercleNewsletter />
      </section>
      <FooterUnivers />
    </main>
  );
}
