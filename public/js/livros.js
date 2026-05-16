let livros = [];
let autoresLivro = [];
let categoriasLivro = [];

function options(lista, idCampo, textoCampo) {
  return `<option value="">Selecione</option>${lista
    .map(
      (item) => `
    <option value="${item[idCampo]}">${escapeHtml(item[textoCampo])}</option>
  `,
    )
    .join('')}`;
}

function limparLivro() {
  document.getElementById('idLivro').value = '';
  document.getElementById('tituloLivro').value = '';
  document.getElementById('anoLivro').value = new Date().getFullYear();
  document.getElementById('quantidadeLivro').value = 1;
  document.getElementById('paginasLivro').value = 0;
  document.getElementById('editoraLivro').value = '';
  document.getElementById('isbnLivro').value = '';
  document.getElementById('sinopseLivro').value = '';
  document.getElementById('autorLivro').value = '';
  document.getElementById('categoriaLivro').value = '';
  document.getElementById('imagemLivro').value = '';
  document.getElementById('previewImagemLivro').classList.add('d-none');
  document.getElementById('previewImagemLivro').removeAttribute('src');
  document.getElementById('tituloFormLivro').textContent = 'Novo livro';
  document.getElementById('formLivro').classList.remove('was-validated');
}

async function carregarCombosLivro() {
  const [autoresResp, categoriasResp] = await Promise.all([
    apiFetch('/autores'),
    apiFetch('/categorias'),
  ]);

  autoresLivro = autoresResp.data;
  categoriasLivro = categoriasResp.data;
  document.getElementById('autorLivro').innerHTML = options(autoresLivro, 'id_autor', 'nome');
  document.getElementById('categoriaLivro').innerHTML = options(
    categoriasLivro,
    'id_categoria',
    'nome',
  );
}

async function carregarLivros(busca = '') {
  const query = busca ? `?busca=${encodeURIComponent(busca)}` : '';
  const resposta = await apiFetch(`/livros${query}`);
  livros = resposta.data;
  const tbody = document.getElementById('tbodyLivros');

  tbody.innerHTML = livros
    .map((livro) => {
      const capa = livro.imagem
        ? `<img class="cover-thumb" src="${escapeHtml(livro.imagem)}" alt="Capa de ${escapeHtml(livro.titulo)}">`
        : '<span class="empty-cover">Sem capa</span>';

      return `
      <tr>
        <td>${capa}</td>
        <td>
          <strong>${escapeHtml(livro.titulo)}</strong>
          <span class="d-block text-secondary">${escapeHtml(livro.ano)}</span>
        </td>
        <td>${escapeHtml(livro.autor_nome)}</td>
        <td>${escapeHtml(livro.categoria_nome)}</td>
        <td>${escapeHtml(livro.quantidade)}</td>
        <td class="text-end text-nowrap">
          <button class="btn btn-sm btn-outline-secondary me-1" onclick="abrirDetalhesLivro(${livro.id_livro})">Detalhes</button>
          <button class="btn btn-sm btn-outline-primary me-1" onclick="editarLivro(${livro.id_livro})">Editar</button>
          <button class="btn btn-sm btn-outline-danger" onclick="excluirLivro(${livro.id_livro})">Excluir</button>
        </td>
      </tr>
    `;
    })
    .join('');
}

function preencherPreview(livro) {
  const preview = document.getElementById('previewImagemLivro');
  if (livro.imagem) {
    preview.src = livro.imagem;
    preview.classList.remove('d-none');
    return;
  }

  preview.classList.add('d-none');
  preview.removeAttribute('src');
}

function editarLivro(id) {
  const livro = livros.find((item) => Number(item.id_livro) === Number(id));
  if (!livro) {
    return;
  }

  document.getElementById('idLivro').value = livro.id_livro;
  document.getElementById('tituloLivro').value = livro.titulo;
  document.getElementById('anoLivro').value = livro.ano;
  document.getElementById('quantidadeLivro').value = livro.quantidade;
  document.getElementById('paginasLivro').value = livro.paginas || 0;
  document.getElementById('editoraLivro').value = livro.editora || '';
  document.getElementById('isbnLivro').value = livro.isbn || '';
  document.getElementById('sinopseLivro').value = livro.sinopse || '';
  document.getElementById('autorLivro').value = livro.id_autor;
  document.getElementById('categoriaLivro').value = livro.id_categoria;
  document.getElementById('imagemLivro').value = '';
  preencherPreview(livro);
  document.getElementById('tituloFormLivro').textContent = 'Editar livro';
}

function detalheLinha(rotulo, valor) {
  return `
    <div class="detail-item">
      <span>${rotulo}</span>
      <strong>${escapeHtml(valor || 'Não informado')}</strong>
    </div>
  `;
}

function abrirDetalhesLivro(id) {
  const livro = livros.find((item) => Number(item.id_livro) === Number(id));
  if (!livro) {
    return;
  }

  document.getElementById('detalheTitulo').textContent = livro.titulo;
  const capa = livro.imagem
    ? `<img class="detail-cover" src="${escapeHtml(livro.imagem)}" alt="Capa de ${escapeHtml(livro.titulo)}">`
    : '<span class="detail-cover empty-cover">Sem capa</span>';

  document.getElementById('detalheLivroConteudo').innerHTML = `
    <div class="book-detail">
      <div>${capa}</div>
      <div>
        <h3>${escapeHtml(livro.titulo)}</h3>
        <div class="detail-grid">
          ${detalheLinha('Autor', livro.autor_nome)}
          ${detalheLinha('Categoria', livro.categoria_nome)}
          ${detalheLinha('Ano', livro.ano)}
          ${detalheLinha('Páginas', livro.paginas)}
          ${detalheLinha('Editora', livro.editora)}
          ${detalheLinha('ISBN', livro.isbn)}
          ${detalheLinha('Disponível', livro.quantidade)}
        </div>
        <h4 class="h6 mt-3">Sinopse</h4>
        <p class="mb-0">${escapeHtml(livro.sinopse || 'Sinopse não informada.')}</p>
      </div>
    </div>
  `;

  bootstrap.Modal.getOrCreateInstance(document.getElementById('modalDetalhesLivro')).show();
}

function validarArquivoImagem(input) {
  if (!input.files.length) {
    return true;
  }

  const arquivo = input.files[0];
  const extensoes = ['png', 'jpg', 'jpeg', 'webp'];
  const mimetypes = ['image/png', 'image/jpeg', 'image/webp'];
  const extensao = arquivo.name.split('.').pop().toLowerCase();

  if (!extensoes.includes(extensao) || !mimetypes.includes(arquivo.type)) {
    showAlert('alertLivros', 'A capa deve ser PNG, JPG, JPEG ou WEBP.', 'warning');
    input.value = '';
    document.getElementById('previewImagemLivro').classList.add('d-none');
    return false;
  }

  if (arquivo.size > 2 * 1024 * 1024) {
    showAlert('alertLivros', 'A capa deve ter no máximo 2 MB.', 'warning');
    input.value = '';
    document.getElementById('previewImagemLivro').classList.add('d-none');
    return false;
  }

  return true;
}

function validarDetalhesLivro() {
  const paginas = Number(document.getElementById('paginasLivro').value || 0);
  const sinopse = document.getElementById('sinopseLivro').value.trim();

  if (!Number.isInteger(paginas) || paginas < 0) {
    showAlert('alertLivros', 'Páginas deve ser um número maior ou igual a zero.', 'warning');
    return false;
  }

  if (sinopse && sinopse.length < 10) {
    showAlert('alertLivros', 'A sinopse deve ter pelo menos 10 caracteres.', 'warning');
    return false;
  }

  return true;
}

async function enviarImagemLivro(id) {
  const input = document.getElementById('imagemLivro');
  if (!input.files.length) {
    return;
  }

  const formData = new FormData();
  formData.append('imagem', input.files[0]);
  await apiFetch(`/livros/${id}/imagem`, {
    method: 'POST',
    body: formData,
  });
}

async function excluirLivro(id) {
  if (!confirm('Excluir este livro?')) {
    return;
  }

  try {
    await apiFetch(`/livros/${id}`, { method: 'DELETE' });
    showAlert('alertLivros', 'Livro excluído com sucesso.');
    await carregarLivros(document.getElementById('buscaLivro').value);
  } catch (error) {
    showAlert('alertLivros', error.message, 'danger');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  protegerPagina();
  montarNavbar('livros');
  limparLivro();

  document.getElementById('btnLimparLivro').addEventListener('click', limparLivro);

  document.getElementById('imagemLivro').addEventListener('change', (event) => {
    const input = event.target;
    if (!validarArquivoImagem(input) || !input.files.length) {
      return;
    }

    const preview = document.getElementById('previewImagemLivro');
    preview.src = URL.createObjectURL(input.files[0]);
    preview.classList.remove('d-none');
  });

  document.getElementById('formBuscaLivro').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await carregarLivros(document.getElementById('buscaLivro').value);
    } catch (error) {
      showAlert('alertLivros', error.message, 'danger');
    }
  });

  document.getElementById('formLivro').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (
      !validarFormulario(
        event.target,
        'alertLivros',
        'Informe título, ano, quantidade, autor e categoria.',
      )
    ) {
      return;
    }

    if (!validarDetalhesLivro() || !validarArquivoImagem(document.getElementById('imagemLivro'))) {
      return;
    }

    const id = document.getElementById('idLivro').value;
    const payload = {
      titulo: document.getElementById('tituloLivro').value,
      ano: Number(document.getElementById('anoLivro').value),
      quantidade: Number(document.getElementById('quantidadeLivro').value),
      paginas: Number(document.getElementById('paginasLivro').value || 0),
      editora: document.getElementById('editoraLivro').value,
      isbn: document.getElementById('isbnLivro').value,
      sinopse: document.getElementById('sinopseLivro').value,
      id_autor: Number(document.getElementById('autorLivro').value),
      id_categoria: Number(document.getElementById('categoriaLivro').value),
    };

    try {
      const resposta = await apiFetch(id ? `/livros/${id}` : '/livros', {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });

      const idSalvo = id || resposta.data.id_livro;
      await enviarImagemLivro(idSalvo);
      showAlert(
        'alertLivros',
        id ? 'Livro atualizado com sucesso.' : 'Livro cadastrado com sucesso.',
      );
      limparLivro();
      await carregarLivros(document.getElementById('buscaLivro').value);
    } catch (error) {
      showAlert('alertLivros', error.message, 'danger');
    }
  });

  try {
    await carregarCombosLivro();
    await carregarLivros();
  } catch (error) {
    showAlert('alertLivros', error.message, 'danger');
  }
});
