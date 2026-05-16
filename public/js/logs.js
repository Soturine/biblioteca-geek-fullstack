document.addEventListener('DOMContentLoaded', () => {
  protegerPagina();
  montarNavbar('logs');

  document.getElementById('formLogs').addEventListener('submit', async (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    const usuario = document.getElementById('usuarioLog').value;
    const dataInicio = document.getElementById('dataInicioLog').value;
    const dataFim = document.getElementById('dataFimLog').value;

    if (usuario) params.append('usuario', usuario);
    if (dataInicio) params.append('dataInicio', dataInicio);
    if (dataFim) params.append('dataFim', dataFim);

    try {
      const response = await fetch(`${API_BASE}/logs/exportar/xml?${params.toString()}`, {
        headers: authHeaders(),
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.message || 'Erro ao exportar XML');
      }

      const xml = await response.text();
      baixarArquivo('logs_biblioteca_geek.xml', xml, 'application/xml');
      showAlert('alertLogs', 'XML gerado com sucesso.');
    } catch (error) {
      showAlert('alertLogs', error.message, 'danger');
    }
  });
});
