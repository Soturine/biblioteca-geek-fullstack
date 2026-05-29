document.addEventListener('DOMContentLoaded', async () => {
  if (!protegerAdmin()) {
    return;
  }
  montarNavbar('dashboard');

  try {
    const [graficoResp, livrosResp, autoresResp, categoriasResp, emprestimosResp] =
      await Promise.all([
        apiFetch('/graficos/livros-por-categoria'),
        apiFetch('/livros'),
        apiFetch('/autores'),
        apiFetch('/categorias'),
        apiFetch('/emprestimos'),
      ]);

    const dados = graficoResp.data;
    document.getElementById('statLivros').textContent = livrosResp.data.length;
    document.getElementById('statAutores').textContent = autoresResp.data.length;
    document.getElementById('statCategorias').textContent = categoriasResp.data.length;
    document.getElementById('statEmprestimos').textContent = emprestimosResp.data.length;

    try {
      const logsResp = await apiFetch('/logs');
      const ultimosLogs = logsResp.data.slice(0, 6);
      document.getElementById('tbodyUltimosLogs').innerHTML = ultimosLogs.length
        ? ultimosLogs
            .map(
              (log) => `
        <tr>
          <td>${escapeHtml(new Date(log.timestamp).toLocaleString('pt-BR'))}</td>
          <td>${escapeHtml(log.usuario || 'anonimo')}</td>
          <td><span class="badge text-bg-light">${escapeHtml(log.acao || '')}</span></td>
        </tr>
      `,
            )
            .join('')
        : '<tr><td colspan="3" class="text-secondary">Nenhum log encontrado</td></tr>';
    } catch (error) {
      document.getElementById('tbodyUltimosLogs').innerHTML =
        '<tr><td colspan="3" class="text-secondary">MongoDB indisponível para logs</td></tr>';
    }

    const coresGrafico = [
      '#3157d5',
      '#1f9d8a',
      '#d28a16',
      '#7c3aed',
      '#dc2626',
      '#0f766e',
      '#9333ea',
      '#ea580c',
      '#0891b2',
      '#4f46e5',
    ];

    new Chart(document.getElementById('graficoCategorias'), {
      type: 'bar',
      data: {
        labels: dados.map((item) => item.categoria),
        datasets: [
          {
            label: 'Livros',
            data: dados.map((item) => item.quantidade_livros),
            backgroundColor: dados.map((_, index) => coresGrafico[index % coresGrafico.length]),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 },
          },
        },
      },
    });
  } catch (error) {
    showAlert('alertDashboard', error.message, 'danger');
  }
});
