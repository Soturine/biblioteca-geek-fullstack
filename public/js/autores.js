let autores = [];

function limparAutor() {
  document.getElementById('idAutor').value = '';
  document.getElementById('nomeAutor').value = '';
  document.getElementById('nacionalidadeAutor').value = '';
  document.getElementById('tituloFormAutor').textContent = 'Novo autor';
}

async function carregarAutores() {
  const resposta = await apiFetch('/autores');
  autores = resposta.data;
  const tbody = document.getElementById('tbodyAutores');

  tbody.innerHTML = autores.map((autor) => `
    <tr>
      <td>${escapeHtml(autor.nome)}</td>
      <td>${escapeHtml(autor.nacionalidade || '')}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editarAutor(${autor.id_autor})">Editar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="excluirAutor(${autor.id_autor})">Excluir</button>
      </td>
    </tr>
  `).join('');
}

function editarAutor(id) {
  const autor = autores.find((item) => Number(item.id_autor) === Number(id));
  if (!autor) {
    return;
  }

  document.getElementById('idAutor').value = autor.id_autor;
  document.getElementById('nomeAutor').value = autor.nome;
  document.getElementById('nacionalidadeAutor').value = autor.nacionalidade || '';
  document.getElementById('tituloFormAutor').textContent = 'Editar autor';
}

async function excluirAutor(id) {
  if (!confirm('Excluir este autor?')) {
    return;
  }

  try {
    await apiFetch(`/autores/${id}`, { method: 'DELETE' });
    showAlert('alertAutores', 'Autor excluido com sucesso.');
    await carregarAutores();
  } catch (error) {
    showAlert('alertAutores', error.message, 'danger');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  protegerPagina();
  montarNavbar('autores');

  document.getElementById('btnLimparAutor').addEventListener('click', limparAutor);

  document.getElementById('formAutor').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('idAutor').value;
    const payload = {
      nome: document.getElementById('nomeAutor').value,
      nacionalidade: document.getElementById('nacionalidadeAutor').value
    };

    try {
      await apiFetch(id ? `/autores/${id}` : '/autores', {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify(payload)
      });

      showAlert('alertAutores', id ? 'Autor atualizado com sucesso.' : 'Autor cadastrado com sucesso.');
      limparAutor();
      await carregarAutores();
    } catch (error) {
      showAlert('alertAutores', error.message, 'danger');
    }
  });

  try {
    await carregarAutores();
  } catch (error) {
    showAlert('alertAutores', error.message, 'danger');
  }
});
