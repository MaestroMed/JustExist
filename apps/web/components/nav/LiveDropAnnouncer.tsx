import { AnnounceBar } from './AnnounceBar';
import { getLiveDrop } from '@/lib/content/drops';

/**
 * Server component qui décide s'il faut afficher l'AnnounceBar.
 * Résout les données via getLiveDrop() (data-layer dummy Sprint 1,
 * deviendra query DB Sprint 2).
 */
export function LiveDropAnnouncer() {
  const drop = getLiveDrop();
  if (!drop) return null;
  const remaining = drop.editionSize - drop.sold;
  if (remaining <= 0) return null;
  return (
    <AnnounceBar
      dropSlug={drop.slug}
      title={drop.title}
      closesAt={drop.closesAt ?? null}
      remaining={remaining}
      editionSize={drop.editionSize}
    />
  );
}
