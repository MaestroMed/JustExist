import { Button, Section, Text } from '@react-email/components';
import { Layout } from '../components/Layout';
import { EMAIL_TOKENS } from '../tokens';

const { colors, fonts } = EMAIL_TOKENS;

export type ShipmentEmailProps = {
  firstName?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
};

export function ShipmentEmail({ firstName, trackingNumber, trackingUrl, carrier = 'Colissimo' }: ShipmentEmailProps) {
  return (
    <Layout preview="Ton œuvre est en route.">
      <Text
        style={{
          fontFamily: fonts.mono,
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          color: colors.blood,
          margin: 0,
        }}
      >
        Expédiée
      </Text>
      <Text
        style={{
          fontFamily: fonts.display,
          fontSize: '32px',
          fontWeight: 500,
          lineHeight: 1.1,
          color: colors.cream,
          margin: '12px 0 20px',
        }}
      >
        {firstName ? `${firstName}, elle part.` : 'Ton œuvre part de l\'atelier.'}
      </Text>
      <Text style={{ fontSize: '15px', lineHeight: 1.7, color: colors.cream, margin: '0 0 24px' }}>
        Emballée ce matin avec soin — carton rigide, papier de soie, coin protégé.
        Expédition par {carrier}.
      </Text>
      {trackingNumber && (
        <Section style={{ margin: '20px 0' }}>
          <Text
            style={{
              fontFamily: fonts.mono,
              fontSize: '11px',
              color: colors.subtle,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              margin: '0 0 6px',
            }}
          >
            Numéro de suivi
          </Text>
          <Text style={{ fontFamily: fonts.mono, fontSize: '16px', color: colors.cream, margin: 0 }}>
            {trackingNumber}
          </Text>
        </Section>
      )}
      {trackingUrl && (
        <Section style={{ margin: '28px 0' }}>
          <Button
            href={trackingUrl}
            style={{
              backgroundColor: colors.cream,
              color: colors.ink,
              fontFamily: fonts.display,
              fontSize: '13px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              padding: '16px 28px',
              textDecoration: 'none',
              borderRadius: '2px',
            }}
          >
            Suivre le colis
          </Button>
        </Section>
      )}
      <Text style={{ fontSize: '13px', color: colors.subtle, marginTop: '28px' }}>
        Dès qu'elle arrive, envoie-moi une photo. Elle rejoindra peut-être le Mur de la collection.
      </Text>
      <Text style={{ fontSize: '13px', color: colors.subtle, margin: '16px 0 0' }}>— Nacks</Text>
    </Layout>
  );
}

export default ShipmentEmail;
