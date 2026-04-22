import { Hr, Row, Column, Section, Text } from '@react-email/components';
import { Layout } from '../components/Layout';
import { EMAIL_TOKENS } from '../tokens';

const { colors, fonts } = EMAIL_TOKENS;

export type OrderConfirmationEmailProps = {
  firstName?: string;
  orderNumber: string;
  items: { title: string; editionNumber?: number; priceCents: number }[];
  totalCents: number;
  currency?: string;
};

function formatPrice(cents: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency, maximumFractionDigits: 0 }).format(
    cents / 100,
  );
}

export function OrderConfirmationEmail({
  firstName,
  orderNumber,
  items,
  totalCents,
  currency = 'EUR',
}: OrderConfirmationEmailProps) {
  return (
    <Layout preview={`Commande ${orderNumber} confirmée — merci.`}>
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
        Commande #{orderNumber}
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
        {firstName ? `Merci ${firstName}.` : 'Merci.'}
      </Text>
      <Text style={{ fontSize: '15px', lineHeight: 1.7, color: colors.cream, margin: '0 0 20px' }}>
        Ton achat est confirmé. J'emballe personnellement chaque pièce. Tu reçois un nouveau mail
        dès qu'elle part de l'atelier.
      </Text>

      <Hr style={{ borderColor: 'rgba(245, 241, 232, 0.08)', margin: '32px 0 20px' }} />

      {items.map((item, i) => (
        <Row key={i} style={{ marginBottom: '16px' }}>
          <Column>
            <Text style={{ fontFamily: fonts.display, fontSize: '15px', color: colors.cream, margin: 0 }}>
              {item.title}
            </Text>
            {item.editionNumber && (
              <Text
                style={{
                  fontFamily: fonts.mono,
                  fontSize: '11px',
                  color: colors.subtle,
                  margin: '4px 0 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                }}
              >
                Édition n° {item.editionNumber}
              </Text>
            )}
          </Column>
          <Column align="right" style={{ width: '100px' }}>
            <Text style={{ fontFamily: fonts.mono, fontSize: '14px', color: colors.cream, margin: 0 }}>
              {formatPrice(item.priceCents, currency)}
            </Text>
          </Column>
        </Row>
      ))}

      <Hr style={{ borderColor: 'rgba(245, 241, 232, 0.08)', margin: '20px 0' }} />

      <Row>
        <Column>
          <Text
            style={{
              fontFamily: fonts.mono,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: colors.subtle,
              margin: 0,
            }}
          >
            Total
          </Text>
        </Column>
        <Column align="right">
          <Text
            style={{
              fontFamily: fonts.mono,
              fontSize: '22px',
              color: colors.cream,
              margin: 0,
              fontWeight: 500,
            }}
          >
            {formatPrice(totalCents, currency)}
          </Text>
        </Column>
      </Row>

      <Section style={{ marginTop: '32px' }}>
        <Text style={{ fontSize: '13px', color: colors.subtle, margin: 0 }}>— Nacks</Text>
      </Section>
    </Layout>
  );
}

export default OrderConfirmationEmail;
