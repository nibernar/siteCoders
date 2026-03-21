const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

function computeLeadScore(leadData) {
  const C = 11 - parseInt(leadData.current_blockage, 10);
  const cons = parseInt(leadData.fixed_logic, 10);
  const U = parseInt(leadData.urgency, 10);
  const I = parseInt(leadData.external_pressure, 10);
  const N = parseInt(leadData.current_solutions_inadequacy, 10);
  const Cri = parseInt(leadData.strategic_importance, 10);
  return (C + U + I) * N * (cons + Cri);
}

async function sendDiscordLeadAlert(leadData) {
  if (!DISCORD_WEBHOOK_URL) {
    console.warn('DISCORD_WEBHOOK_URL non definie, notification Discord ignoree.');
    return;
  }

  try {
    const score = computeLeadScore(leadData);

    let color;
    if (score > 4000) color = 0xE74C3C;
    else if (score > 2000) color = 0xF39C12;
    else color = 0x2ECC71;

    const usedNocode = leadData.used_nocode ? 'Oui' : 'Non';
    const priorities = Array.isArray(leadData.priorities_ranking)
      ? leadData.priorities_ranking.join('\n• ')
      : String(leadData.priorities_ranking || '—');
    const aiExpectations = Array.isArray(leadData.ai_expectations)
      ? leadData.ai_expectations.join('\n• ')
      : String(leadData.ai_expectations || '—');

    const embed = {
      title: '\uD83D\uDD25 Indice de Besoin (IB) : ' + score + ' / 6000',
      color,
      fields: [
        { name: '\uD83D\uDCE7 Email', value: leadData.email || '—', inline: true },
        { name: '\uD83C\uDF82 Age', value: leadData.age || '—', inline: true },
        { name: '\uD83D\uDCBC Statut', value: leadData.current_status || '—', inline: true },
        { name: '\uD83D\uDCCB Etape du projet', value: leadData.project_stage || '—', inline: true },
        { name: '\uD83D\uDEE0\uFE0F Type d outil', value: leadData.tool_type || '—', inline: true },
        { name: '\uD83C\uDFAF Objectif principal', value: leadData.main_goal || '—', inline: true },
        { name: '\uD83D\uDCB0 Prix ideal', value: (leadData.ideal_price || '—') + ' €', inline: true },
        { name: '\uD83E\uDD16 Deja utilise du No-code ?', value: usedNocode, inline: true },
        ...(leadData.nocode_abandon_reason
          ? [{ name: '\u274C Raison abandon No-code', value: leadData.nocode_abandon_reason }]
          : []),
        { name: '\uD83D\uDCCA Priorites', value: '• ' + priorities },
        { name: '\uD83E\uDD16 Attentes IA', value: '• ' + aiExpectations },
        { name: '\uD83D\uDCAC Prompt IA', value: leadData.ai_prompt || '—' },
        { name: '\u26A0\uFE0F Limites techniques', value: leadData.technical_limits || '—' },
        { name: '\uD83D\uDCC8 Detail du scoring', value:
          'Blocage (inverse) : ' + (11 - parseInt(leadData.current_blockage, 10)) + '/10\n' +
          'Logique figee : ' + leadData.fixed_logic + '/10\n' +
          'Urgence : ' + leadData.urgency + '/10\n' +
          'Pression externe : ' + leadData.external_pressure + '/10\n' +
          'Inadequation solutions : ' + leadData.current_solutions_inadequacy + '/10\n' +
          'Importance strategique : ' + leadData.strategic_importance + '/10'
        },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'CODERS Lead Alert' },
    };

    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });
  } catch (err) {
    console.error('Erreur envoi Discord webhook:', err.message);
  }
}

module.exports = { sendDiscordLeadAlert };
