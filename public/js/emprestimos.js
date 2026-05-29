let emprestimos = [];
let livrosEmprestimo = [];
let itensEmprestimo = [];

function renderItens() {
  const lista = document.getElementById('listaItensEmprestimo');

  if (!itensEmprestimo.length) {
    lista.innerHTML = '<span class="text-secondary">Nenhum item selecionado</span>';
    return;
  }

  lista.innerHTML = itensEmprestimo
    .map((item, index) => {
      const livro = livrosEmprestimo.find(
        (livroItem) => Number(livroItem.id_livro) === Number(item.id_livro),
      );
      return `
      <div class="d-flex justify-content-between align-items-center border-bottom py-1">
        <span>${escapeHtml(livro ? livro.titulo : item.livro_titulo)} <strong>x${item.quantidade}</strong></span>
        <button class="btn btn-sm btn-outline-danger" type="button" onclick="removerItem(${index})">Remover</button>
      </div>
    `;
    })
    .join('');
}

function removerItem(index) {
  itensEmprestimo.splice(index, 1);
  renderItens();
}

function limparEmprestimo() {
  document.getElementById('idEmprestimo').value = '';
  document.getElementById('nomeLeitor').value = '';
  document.getElementById('dataDevolucao').value = '';
  document.getElementById('statusEmprestimo').value = 'aberto';
  document.getElementById('quantidadeItem').value = 1;
  itensEmprestimo = [];
  document.getElementById('tituloFormEmprestimo').textContent = 'Novo empréstimo';
  renderItens();
}

async function carregarLivrosEmprestimo() {
  const resposta = await apiFetch('/livros');
  livrosEmprestimo = resposta.data;
  document.getElementById('livroItem').innerHTML = `
    <option value="">Selecione</option>
    ${livrosEmprestimo
      .map(
        (livro) => `
      <option value="${livro.id_livro}">${escapeHtml(livro.titulo)} (${livro.quantidade})</option>
    `,
      )
      .join('')}
  `;
}

async function carregarEmprestimos() {
  const resposta = await apiFetch('/emprestimos');
  emprestimos = resposta.data;
  const tbody = document.getElementById('tbodyEmprestimos');

  tbody.innerHTML = emprestimos
    .map(
      (emprestimo) => `
    <tr>
      <td>${escapeHtml(emprestimo.nome_leitor)}</td>
      <td>${formatDate(emprestimo.data_emprestimo)}</td>
      <td><span class="badge text-bg-${emprestimo.status === 'aberto' ? 'warning' : 'secondary'}">${escapeHtml(emprestimo.status)}</span></td>
      <td>${escapeHtml(emprestimo.total_itens)}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editarEmprestimo(${emprestimo.id_emprestimo})">Editar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="excluirEmprestimo(${emprestimo.id_emprestimo})">Excluir</button>
      </td>
    </tr>
  `,
    )
    .join('');
}

async function editarEmprestimo(id) {
  try {
    const resposta = await apiFetch(`/emprestimos/${id}`);
    const emprestimo = resposta.data;

    document.getElementById('idEmprestimo').value = emprestimo.id_emprestimo;
    document.getElementById('nomeLeitor').value = emprestimo.nome_leitor;
    document.getElementById('dataDevolucao').value = emprestimo.data_devolucao
      ? String(emprestimo.data_devolucao).slice(0, 10)
      : '';
    document.getElementById('statusEmprestimo').value = emprestimo.status;
    itensEmprestimo = emprestimo.itens.map((item) => ({
      id_livro: Number(item.id_livro),
      quantidade: Number(item.quantidade),
      livro_titulo: item.livro_titulo,
    }));
    document.getElementById('tituloFormEmprestimo').textContent = 'Editar empréstimo';
    renderItens();
  } catch (error) {
    showAlert('alertEmprestimos', error.message, 'danger');
  }
}

async function excluirEmprestimo(id) {
  if (!confirm('Excluir este empréstimo?')) {
    return;
  }

  try {
    await apiFetch(`/emprestimos/${id}`, { method: 'DELETE' });
    showAlert('alertEmprestimos', 'Empréstimo excluído e estoque devolvido.');
    limparEmprestimo();
    await carregarLivrosEmprestimo();
    await carregarEmprestimos();
  } catch (error) {
    showAlert('alertEmprestimos', error.message, 'danger');
  }
}

function adicionarItem() {
  const idLivro = Number(document.getElementById('livroItem').value);
  const quantidade = Number(document.getElementById('quantidadeItem').value);

  if (!idLivro || quantidade <= 0) {
    showAlert('alertEmprestimos', 'Selecione um livro e uma quantidade válida.', 'warning');
    return;
  }

  const existente = itensEmprestimo.find((item) => Number(item.id_livro) === idLivro);
  if (existente) {
    existente.quantidade += quantidade;
  } else {
    itensEmprestimo.push({ id_livro: idLivro, quantidade });
  }

  renderItens();
}

document.addEventListener('DOMContentLoaded', async () => {
  if (!protegerAdmin()) {
    return;
  }
  montarNavbar('emprestimos');
  renderItens();

  document.getElementById('btnAddItem').addEventListener('click', adicionarItem);
  document.getElementById('btnLimparEmprestimo').addEventListener('click', limparEmprestimo);

  document.getElementById('formEmprestimo').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (
      !validarFormulario(
        event.target,
        'alertEmprestimos',
        'Informe o leitor e os dados obrigatórios.',
      )
    ) {
      return;
    }

    if (!itensEmprestimo.length) {
      showAlert('alertEmprestimos', 'Adicione pelo menos um livro ao empréstimo.', 'warning');
      return;
    }

    const usuario = usuarioAtual();
    const id = document.getElementById('idEmprestimo').value;
    const payload = {
      id_usuario: usuario ? usuario.id : null,
      nome_leitor: document.getElementById('nomeLeitor').value,
      data_devolucao: document.getElementById('dataDevolucao').value || null,
      status: document.getElementById('statusEmprestimo').value,
      itens: itensEmprestimo,
    };

    try {
      await apiFetch(id ? `/emprestimos/${id}` : '/emprestimos', {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });

      showAlert(
        'alertEmprestimos',
        id ? 'Empréstimo atualizado com sucesso.' : 'Empréstimo cadastrado com sucesso.',
      );
      limparEmprestimo();
      await carregarLivrosEmprestimo();
      await carregarEmprestimos();
    } catch (error) {
      showAlert('alertEmprestimos', error.message, 'danger');
    }
  });

  try {
    await carregarLivrosEmprestimo();
    await carregarEmprestimos();
  } catch (error) {
    showAlert('alertEmprestimos', error.message, 'danger');
  }
});
