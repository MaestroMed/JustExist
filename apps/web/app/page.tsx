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
import { getLiveDrop } from '@/lib/content/drops';

export default function HomePage() {
  const hasLiveDrop = Boolean(getLiveDrop());
  return (
    <main className="relative">
      <LiveDropAnnouncer />
      <TopNav hasLiveDrop={hasLiveDrop} />
      <HeroOpening />
      <Manifesto />
      <SignatureMarquee variant="blood" speed={45} />
      <DropLive />
      <SignatureMarquee variant="cream" reverse speed={50} dense />
      <ThreePortes />
      <UniversHorizontal />
      <SignatureMarquee variant="bubble" speed={42} />
      <NacksShow />
      <JournalTease />
      <SignatureMarquee variant="outline" reverse speed={55} dense />
      <CercleNewsletter />
      <FooterUnivers />
    </main>
  );
}
