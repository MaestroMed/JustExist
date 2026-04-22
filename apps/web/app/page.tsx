import { TopNav } from '@/components/nav/TopNav';
import { HeroOpening } from '@/components/scenes/HeroOpening';
import { Manifesto } from '@/components/scenes/Manifesto';
import { DropLive } from '@/components/scenes/DropLive';
import { ThreePortes } from '@/components/scenes/ThreePortes';
import { UniversHorizontal } from '@/components/scenes/UniversHorizontal';
import { NacksShow } from '@/components/scenes/NacksShow';
import { JournalTease } from '@/components/scenes/JournalTease';
import { CercleNewsletter } from '@/components/scenes/CercleNewsletter';
import { FooterUnivers } from '@/components/scenes/FooterUnivers';
import { SignatureMarquee } from '@/components/marquee/SignatureMarquee';
import { LiveDropAnnouncer } from '@/components/nav/LiveDropAnnouncer';
import { HomeScrollNav } from '@/components/nav/HomeScrollNav';
import { getLiveDrop } from '@/lib/content/drops';

const SCENES = [
  { id: 'scene-hero', label: 'Arrivée' },
  { id: 'scene-manifeste', label: 'Manifeste' },
  { id: 'scene-drop', label: 'Drop' },
  { id: 'scene-portes', label: 'Portes' },
  { id: 'scene-univers', label: 'Univers' },
  { id: 'scene-show', label: 'Show' },
  { id: 'scene-journal', label: 'Journal' },
  { id: 'scene-cercle', label: 'Cercle' },
];

export default function HomePage() {
  const hasLiveDrop = Boolean(getLiveDrop());
  return (
    <main className="relative">
      <LiveDropAnnouncer />
      <TopNav hasLiveDrop={hasLiveDrop} />
      <HomeScrollNav sections={SCENES} />
      <div id="scene-hero">
        <HeroOpening />
      </div>
      <div id="scene-manifeste">
        <Manifesto />
      </div>
      <SignatureMarquee variant="blood" speed={45} />
      <div id="scene-drop">
        <DropLive />
      </div>
      <SignatureMarquee variant="cream" reverse speed={50} dense />
      <div id="scene-portes">
        <ThreePortes />
      </div>
      <div id="scene-univers">
        <UniversHorizontal />
      </div>
      <SignatureMarquee variant="bubble" speed={42} />
      <div id="scene-show">
        <NacksShow />
      </div>
      <div id="scene-journal">
        <JournalTease />
      </div>
      <SignatureMarquee variant="outline" reverse speed={55} dense />
      <div id="scene-cercle">
        <CercleNewsletter />
      </div>
      <FooterUnivers />
    </main>
  );
}
