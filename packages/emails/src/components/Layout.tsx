import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import type { ReactNode } from 'react';
import { EMAIL_TOKENS, SITE_URL } from '../tokens';

const { colors, fonts } = EMAIL_TOKENS;

export function Layout({
  preview,
  children,
  footerText = "Fait avec soin à Sarcelles et Paris. Tu peux répondre, je lis.",
}: {
  preview: string;
  children: ReactNode;
  footerText?: string;
}) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: colors.ink,
          color: colors.cream,
          fontFamily: fonts.body,
          margin: 0,
          padding: '40px 16px',
        }}
      >
        <Container
          style={{
            margin: '0 auto',
            maxWidth: '580px',
            padding: '40px 32px',
            backgroundColor: colors.ink,
            border: `1px solid rgba(245, 241, 232, 0.08)`,
            borderRadius: '2px',
          }}
        >
          {/* Logo */}
          <Section style={{ marginBottom: '32px' }}>
            <Text
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: '22px',
                letterSpacing: '-0.02em',
                color: colors.cream,
                margin: 0,
              }}
            >
              NACKS
              <span style={{ color: colors.blood, marginLeft: '6px' }}>·</span>
            </Text>
          </Section>

          {children}

          {/* Footer */}
          <Hr style={{ borderColor: 'rgba(245, 241, 232, 0.08)', margin: '40px 0 24px' }} />
          <Text
            style={{
              fontFamily: fonts.mono,
              fontSize: '11px',
              color: colors.subtle,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: '0 0 8px',
            }}
          >
            {footerText}
          </Text>
          <Text style={{ fontSize: '11px', color: colors.subtle, margin: 0 }}>
            <Link href={SITE_URL} style={{ color: colors.cream, textDecoration: 'none' }}>
              nacksgalerie.com
            </Link>
            {'  ·  '}
            <Link
              href={`${SITE_URL}/compte/parametres`}
              style={{ color: colors.subtle, textDecoration: 'underline' }}
            >
              préférences
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
