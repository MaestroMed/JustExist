import { Button, Section, Text } from '@react-email/components';
import { Layout } from '../components/Layout';
import { EMAIL_TOKENS, SITE_URL } from '../tokens';

const { colors, fonts } = EMAIL_TOKENS;

export type WelcomeEmailProps = {
  firstName?: string;
};

export function WelcomeEmail({ firstName }: WelcomeEmailProps) {
  const salutation = firstName ? `Bienvenue ${firstName},` : 'Bienvenue dans le cercle,';

  return (
    <Layout preview="Bienvenue dans le cercle — tu as bien fait.">
      <Text
        style={{
          fontFamily: fonts.display,
          fontSize: '32px',
          fontWeight: 500,
          lineHeight: 1.1,
          color: colors.cream,
          margin: '0 0 16px',
        }}
      >
        {salutation}
      </Text>
      <Text style={{ fontSize: '15px', lineHeight: 1.7, color: colors.cream, margin: '0 0 16px' }}>
        Chaque mardi matin, tu recevras une lettre courte. Ce que j'ai peint. Ce que je vais peindre.
        Les drops en avant-première. Les coulisses.
      </Text>
      <Text style={{ fontSize: '15px', lineHeight: 1.7, color: colors.cream, margin: '0 0 24px' }}>
        Jamais de spam. Jamais de promo agressive. Tu peux répondre à ce mail — je lis.
      </Text>
      <Section style={{ margin: '28px 0' }}>
        <Button
          href={`${SITE_URL}/oeuvres`}
          style={{
            backgroundColor: colors.blood,
            color: colors.cream,
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
          Voir la galerie
        </Button>
      </Section>
      <Text style={{ fontSize: '13px', color: colors.subtle, marginTop: '28px' }}>
        — Nacks
      </Text>
    </Layout>
  );
}

export default WelcomeEmail;
