import { Text, Section } from '@react-email/components';
import { Layout } from '../components/Layout';
import { EMAIL_TOKENS } from '../tokens';

const { colors, fonts } = EMAIL_TOKENS;

export type CommissionReceiptEmailProps = {
  firstName: string;
  budgetBand: string;
  deadline?: string;
};

export function CommissionReceiptEmail({ firstName, budgetBand, deadline }: CommissionReceiptEmailProps) {
  return (
    <Layout preview="Candidature reçue — je lis tout.">
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
        Candidature reçue
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
        Merci {firstName}.
      </Text>
      <Text style={{ fontSize: '15px', lineHeight: 1.7, color: colors.cream, margin: '0 0 16px' }}>
        Ta demande de commande personnalisée est arrivée dans ma boîte. Je prends 2 à 3 projets par mois,
        je choisis à la main ceux qui me parlent.
      </Text>
      <Text style={{ fontSize: '15px', lineHeight: 1.7, color: colors.cream, margin: '0 0 24px' }}>
        Si ton projet entre dans cette sélection, tu reçois un email sous <strong>72 heures</strong>.
        Sinon, je t'écris un mot honnête.
      </Text>
      <Section
        style={{
          border: `1px solid rgba(245, 241, 232, 0.08)`,
          padding: '20px 24px',
          borderRadius: '2px',
          margin: '24px 0',
        }}
      >
        <Text
          style={{
            fontFamily: fonts.mono,
            fontSize: '11px',
            color: colors.subtle,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            margin: '0 0 6px',
          }}
        >
          Budget retenu
        </Text>
        <Text style={{ fontFamily: fonts.display, fontSize: '18px', color: colors.cream, margin: 0 }}>
          {budgetBand}
        </Text>
        {deadline && (
          <>
            <Text
              style={{
                fontFamily: fonts.mono,
                fontSize: '11px',
                color: colors.subtle,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                margin: '16px 0 6px',
              }}
            >
              Délai souhaité
            </Text>
            <Text style={{ fontFamily: fonts.display, fontSize: '18px', color: colors.cream, margin: 0 }}>
              {deadline}
            </Text>
          </>
        )}
      </Section>
      <Text style={{ fontSize: '13px', color: colors.subtle, marginTop: '16px' }}>— Nacks</Text>
    </Layout>
  );
}

export default CommissionReceiptEmail;
