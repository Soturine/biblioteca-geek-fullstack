function escapeXml(value) {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildLogsXml(logs) {
  const eventos = logs.map((log, index) => {
    const detalhes = typeof log.detalhes === 'object' ? JSON.stringify(log.detalhes) : log.detalhes;

    return [
      `  <evento id="${index + 1}">`,
      `    <usuario>${escapeXml(log.usuario || 'anonimo')}</usuario>`,
      `    <acao>${escapeXml(log.acao || 'ACESSO')}</acao>`,
      `    <descricao>${escapeXml(detalhes || log.endpoint || '')}</descricao>`,
      `    <data_hora>${escapeXml(log.timestamp ? new Date(log.timestamp).toISOString() : '')}</data_hora>`,
      `    <tipo_evento>${escapeXml(log.acao || 'GERAL')}</tipo_evento>`,
      `    <ip_origem>${escapeXml(log.ip || '')}</ip_origem>`,
      '    <dados_vinculados>',
      `      <tabela>${escapeXml(log.tabela || '')}</tabela>`,
      `      <registro_id>${escapeXml(log.registro_id || '')}</registro_id>`,
      '    </dados_vinculados>',
      '  </evento>',
    ].join('\n');
  });

  return ['<?xml version="1.0" encoding="UTF-8"?>', '<logs>', ...eventos, '</logs>'].join('\n');
}

module.exports = {
  escapeXml,
  buildLogsXml,
};
