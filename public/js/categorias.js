let categorias = [];

function limparCategoria() {
  document.getElementById('idCategoria').value = '';
  document.getElementById('nomeCategoria').value = '';
  document.getElementById('tituloFormCategoria').textContent = 'Nova categoria';
}

async function carregarCategorias() {
  const resposta = await apiFetch('/categorias');
  categorias = resposta.data;
  const tbody = document.getElementById('tbodyCategorias');

  tbody.innerHTML = categorias
    .map(
      (categoria) => `
    <tr>
      <td>${escapeHtml(categoria.nome)}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editarCategoria(${categoria.id_categoria})">Editar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="excluirCategoria(${categoria.id_categoria})">Excluir</button>
      </td>
    </tr>
  `,
    )
    .join('');
}

function editarCategoria(id) {
  const categoria = categorias.find((item) => Number(item.id_categoria) === Number(id));
  if (!categoria) {
    return;
  }

  document.getElementById('idCategoria').value = categoria.id_categoria;
  document.getElementById('nomeCategoria').value = categoria.nome;
  document.getElementById('tituloFormCategoria').textContent = 'Editar categoria';
}

async function excluirCategoria(id) {
  if (!confirm('Excluir esta categoria?')) {
    return;
  }

  try {
    await apiFetch(`/categorias/${id}`, { method: 'DELETE' });
    showAlert('alertCategorias', 'Categoria excluida com sucesso.');
    await carregarCategorias();
  } catch (error) {
    showAlert('alertCategorias', error.message, 'danger');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  protegerPagina();
  montarNavbar('categorias');

  document.getElementById('btnLimparCategoria').addEventListener('click', limparCategoria);

  document.getElementById('formCategoria').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validarFormulario(event.target, 'alertCategorias', 'Informe o nome da categoria.')) {
      return;
    }

    const id = document.getElementById('idCategoria').value;
    const payload = {
      nome: document.getElementById('nomeCategoria').value,
    };

    try {
      await apiFetch(id ? `/categorias/${id}` : '/categorias', {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });

      showAlert(
        'alertCategorias',
        id ? 'Categoria atualizada com sucesso.' : 'Categoria cadastrada com sucesso.',
      );
      limparCategoria();
      await carregarCategorias();
    } catch (error) {
      showAlert('alertCategorias', error.message, 'danger');
    }
  });

  try {
    await carregarCategorias();
  } catch (error) {
    showAlert('alertCategorias', error.message, 'danger');
  }
});
