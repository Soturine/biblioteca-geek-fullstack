let dadosRelatorio = [];

async function carregarCategoriasRelatorio() {
  const resposta = await apiFetch('/categorias');
  const select = document.getElementById('categoriaRelatorio');
  select.innerHTML =
    '<option value="">Todas</option>' +
    resposta.data
      .map(
        (categoria) => `
    <option value="${categoria.id_categoria}">${escapeHtml(categoria.nome)}</option>
  `,
      )
      .join('');
}

async function carregarRelatorio() {
  const categoria = document.getElementById('categoriaRelatorio').value;
  const query = categoria ? `?categoria=${encodeURIComponent(categoria)}` : '';
  const resposta = await apiFetch(`/relatorios/livros${query}`);
  dadosRelatorio = resposta.data.livros;

  document.getElementById('tbodyRelatorio').innerHTML = dadosRelatorio
    .map(
      (livro) => `
    <tr>
      <td>${escapeHtml(livro.titulo)}</td>
      <td>${escapeHtml(livro.autor)}</td>
      <td>${escapeHtml(livro.categoria)}</td>
      <td>${escapeHtml(livro.ano)}</td>
      <td>${escapeHtml(livro.paginas || 0)}</td>
      <td>${escapeHtml(livro.quantidade)}</td>
    </tr>
  `,
    )
    .join('');

  document.getElementById('totalRelatorio').textContent = resposta.data.total;
  document.getElementById('totalPaginasRelatorio').textContent = dadosRelatorio.reduce(
    (total, livro) => total + Number(livro.paginas || 0),
    0,
  );
}

function gerarPdf() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const usuario = usuarioAtual();
  const agora = new Date().toLocaleString('pt-BR');
  const categoriaSelect = document.getElementById('categoriaRelatorio');
  const categoriaTexto = categoriaSelect.value
    ? categoriaSelect.options[categoriaSelect.selectedIndex].text
    : 'Todas';
  const totalExemplares = dadosRelatorio.reduce(
    (total, livro) => total + Number(livro.quantidade),
    0,
  );
  const totalPaginas = dadosRelatorio.reduce(
    (total, livro) => total + Number(livro.paginas || 0),
    0,
  );

  // O PDF é gerado no navegador para atender ao requisito de jsPDF do frontend.
  doc.setFontSize(16);
  doc.text('Relatório de livros - Biblioteca Geek', 14, 16);
  doc.setFontSize(10);
  doc.text(`Gerado em: ${agora}`, 14, 24);
  doc.text(`Usuário: ${usuario ? usuario.nome : 'Não identificado'}`, 14, 30);
  doc.text(`Filtro de categoria: ${categoriaTexto}`, 14, 36);

  doc.autoTable({
    startY: 44,
    head: [['Livro', 'Autor', 'Categoria', 'Ano', 'Páginas', 'Quantidade']],
    body: dadosRelatorio.map((livro) => [
      livro.titulo,
      livro.autor,
      livro.categoria,
      livro.ano,
      livro.paginas || 0,
      livro.quantidade,
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [49, 87, 213] },
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  doc.text(`Total de livros cadastrados: ${dadosRelatorio.length}`, 14, finalY);
  doc.text(`Total de exemplares disponíveis: ${totalExemplares}`, 14, finalY + 6);
  doc.text(`Total de páginas: ${totalPaginas}`, 14, finalY + 12);
  doc.text('Biblioteca Geek - Programação para Internet', 14, 285);
  doc.save('relatorio_livros_biblioteca_geek.pdf');
}

document.addEventListener('DOMContentLoaded', async () => {
  if (!protegerAdmin()) {
    return;
  }
  montarNavbar('relatorio');

  document.getElementById('formRelatorio').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await carregarRelatorio();
    } catch (error) {
      showAlert('alertRelatorio', error.message, 'danger');
    }
  });

  document.getElementById('btnGerarPdf').addEventListener('click', gerarPdf);

  try {
    await carregarCategoriasRelatorio();
    await carregarRelatorio();
  } catch (error) {
    showAlert('alertRelatorio', error.message, 'danger');
  }
});
