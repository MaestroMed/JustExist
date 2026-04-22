import { Button, Section, Text } from '@react-email/components';
import { Layout } from '../components/Layout';
import { EMAIL_TOKENS } from '../tokens';

const { colors, fonts } = EMAIL_TOKENS;

export type MagicLinkEmailProps = {
  url: string;
  email: string;
  expiresInMinutes?: number;
};

export function MagicLinkEmail({ url, email, expiresInMinutes = 15 }: MagicLinkEmailProps) {
  return (
    <Layout preview="Ton lien d'accès Nacks Galerie">
      <Text
        style={{
          fontFamily: fonts.display,
          fontSize: '32px',
          fontWeight: 500,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: colors.cream,
          margin: '0 0 16px',
        }}
      >
        Te voilà.
      </Text>
      <Text style={{ fontSize: '15px', lineHeight: 1.6, color: colors.cream, margin: '0 0 28px' }}>
        Clique sur ce lien pour te connecter à <strong>{email}</strong>. Il expire dans{' '}
        {expiresInMinutes} minutes. Un seul usage.
      </Text>
      <Section style={{ margin: '28px 0' }}>
        <Button
          href={url}
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
          Entrer dans mon compte
        </Button>
      </Section>
      <Text style={{ fontSize: '12px', color: colors.subtle, margin: '0 0 8px' }}>
        Si le bouton ne fonctionne pas, colle cette URL dans ton navigateur :
      </Text>
      <Text
        style={{
          fontFamily: fonts.mono,
          fontSize: '11px',
          color: colors.cream,
          wordBreak: 'break-all',
          margin: 0,
        }}
      >
        {url}
      </Text>
      <Text style={{ fontSize: '12px', color: colors.subtle, marginTop: '28px' }}>
        Tu n'as rien demandé ? Ignore cet email — rien ne se passera.
      </Text>
    </Layout>
  );
}

export default MagicLinkEmail;
