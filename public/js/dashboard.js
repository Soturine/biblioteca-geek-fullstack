document.addEventListener('DOMContentLoaded', async () => {
  protegerPagina();
  montarNavbar('dashboard');

  try {
    const resposta = await apiFetch('/graficos/livros-por-categoria');
    const dados = resposta.data;
    const totalLivros = dados.reduce((total, item) => total + Number(item.quantidade_livros), 0);
    const totalExemplares = dados.reduce((total, item) => total + Number(item.quantidade_exemplares), 0);

    document.getElementById('statLivros').textContent = totalLivros;
    document.getElementById('statExemplares').textContent = totalExemplares;
    document.getElementById('statCategorias').textContent = dados.length;

    new Chart(document.getElementById('graficoCategorias'), {
      type: 'bar',
      data: {
        labels: dados.map((item) => item.categoria),
        datasets: [{
          label: 'Livros',
          data: dados.map((item) => item.quantidade_livros),
          backgroundColor: ['#3157d5', '#1f9d8a', '#d28a16', '#7c3aed', '#dc2626', '#0f766e']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
          }
        }
      }
    });
  } catch (error) {
    showAlert('alertDashboard', error.message, 'danger');
  }
});
