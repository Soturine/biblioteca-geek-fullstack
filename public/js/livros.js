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
  const categoriasResp = await apiFetch('/categorias');
  categoriasLivro = categoriasResp.data;
  document.getElementById('filtroCategoriaLivro').innerHTML =
    '<option value="">Todas as categorias</option>' +
    categoriasLivro
      .map(
        (categoria) => `
      <option value="${categoria.id_categoria}">${escapeHtml(categoria.nome)}</option>
    `,
      )
      .join('');

  if (isAdmin()) {
    const autoresResp = await apiFetch('/autores');
    autoresLivro = autoresResp.data;
    document.getElementById('autorLivro').innerHTML = options(autoresLivro, 'id_autor', 'nome');
    document.getElementById('categoriaLivro').innerHTML = options(
      categoriasLivro,
      'id_categoria',
      'nome',
    );
  }
}

async function carregarLivros(busca = '') {
  const params = new URLSearchParams();
  const categoria = document.getElementById('filtroCategoriaLivro').value;

  if (busca) {
    params.append('busca', busca);
  }

  if (categoria) {
    params.append('categoria', categoria);
  }

  const query = params.toString() ? `?${params.toString()}` : '';
  const resposta = await apiFetch(`/livros${query}`);
  livros = resposta.data;
  const tbody = document.getElementById('tbodyLivros');
  const usuarioAdmin = isAdmin();

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
          ${
            usuarioAdmin
              ? `<button class="btn btn-sm btn-outline-primary me-1" onclick="editarLivro(${livro.id_livro})">Editar</button>
          <button class="btn btn-sm btn-outline-danger" onclick="excluirLivro(${livro.id_livro})">Excluir</button>`
              : `<button class="btn btn-sm btn-success" onclick="reservarLivro(${livro.id_livro})">Reservar</button>`
          }
        </td>
      </tr>
    `;
    })
    .join('');
}

function renderCatalogoResumo(containerId, lista) {
  const container = document.getElementById(containerId);

  if (!lista.length) {
    container.innerHTML = '<p class="text-secondary mb-0">Nenhum livro encontrado.</p>';
    return;
  }

  container.innerHTML = lista
    .slice(0, 10)
    .map(
      (livro) => `
    <button class="catalog-mini" type="button" onclick="abrirDetalhesLivro(${livro.id_livro})">
      <img src="${escapeHtml(livro.imagem || '')}" alt="Capa de ${escapeHtml(livro.titulo)}">
      <span>
        <strong>${escapeHtml(livro.titulo)}</strong>
        <small>${escapeHtml(livro.categoria_nome || livro.categoria || '')}</small>
      </span>
    </button>
  `,
    )
    .join('');
}

async function carregarDestaquesCatalogo() {
  if (isAdmin()) {
    return;
  }

  const [topResp, recomendadosResp] = await Promise.all([
    apiFetch('/livros/top-emprestados'),
    apiFetch('/livros/recomendados'),
  ]);

  renderCatalogoResumo('topLivrosCatalogo', topResp.data);
  renderCatalogoResumo('recomendacoesCatalogo', recomendadosResp.data);
}

function configurarTelaPorPerfil() {
  const admin = isAdmin();
  document.getElementById('tituloPaginaLivros').textContent = admin ? 'Livros' : 'Catálogo';
  document.querySelector('.breadcrumb-item.active').textContent = admin ? 'Livros' : 'Catálogo';
  document.getElementById('painelCatalogoLeitor').classList.toggle('d-none', admin);
  document.getElementById('colunaFormularioLivro').classList.toggle('d-none', !admin);
  document.getElementById('colunaListaLivros').className = admin ? 'col-lg-8' : 'col-lg-12';
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
  const texto = valor === 0 ? 0 : valor || 'Não informado';

  return `
    <div class="detail-item">
      <span>${rotulo}</span>
      <strong>${escapeHtml(texto)}</strong>
    </div>
  `;
}

async function abrirDetalhesLivro(id) {
  let livro = livros.find((item) => Number(item.id_livro) === Number(id));

  if (!livro) {
    const resposta = await apiFetch(`/livros/${id}`);
    livro = resposta.data;
  }

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
        <p class="detail-synopsis">${escapeHtml(livro.sinopse || 'Sinopse não informada.')}</p>
        <div class="detail-grid">
          ${detalheLinha('Autor', livro.autor_nome)}
          ${detalheLinha('Categoria', livro.categoria_nome)}
          ${detalheLinha('Ano', livro.ano)}
          ${detalheLinha('Páginas', livro.paginas)}
          ${detalheLinha('Editora', livro.editora)}
          ${detalheLinha('ISBN', livro.isbn)}
          ${detalheLinha('Disponível', livro.quantidade)}
        </div>
      </div>
    </div>
  `;

  bootstrap.Modal.getOrCreateInstance(document.getElementById('modalDetalhesLivro')).show();
}

function abrirModalNovaCategoria() {
  const form = document.getElementById('formNovaCategoria');
  form.reset();
  form.classList.remove('was-validated');
  document.getElementById('alertNovaCategoria').innerHTML = '';
  bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNovaCategoria')).show();
}

async function salvarNovaCategoria(event) {
  event.preventDefault();

  if (!validarFormulario(event.target, 'alertNovaCategoria', 'Informe o nome da nova categoria.')) {
    return;
  }

  const nome = document.getElementById('nomeNovaCategoria').value.trim();

  try {
    const resposta = await apiFetch('/categorias', {
      method: 'POST',
      body: JSON.stringify({ nome }),
    });

    await carregarCombosLivro();
    const categoriaCriada =
      resposta?.data || categoriasLivro.find((categoria) => categoria.nome === nome);

    if (categoriaCriada?.id_categoria) {
      document.getElementById('categoriaLivro').value = categoriaCriada.id_categoria;
    }

    bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNovaCategoria')).hide();
    showAlert('alertLivros', 'Categoria cadastrada com sucesso.');
  } catch (error) {
    showAlert('alertNovaCategoria', error.message, 'danger');
  }
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

async function reservarLivro(id) {
  try {
    const resposta = await apiFetch('/reservas', {
      method: 'POST',
      body: JSON.stringify({ id_livro: id }),
    });
    showAlert('alertLivros', resposta.message || 'Reserva realizada com sucesso.');
    await carregarDestaquesCatalogo();
  } catch (error) {
    showAlert('alertLivros', error.message, 'danger');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  protegerPagina();
  montarNavbar('livros');
  configurarTelaPorPerfil();

  if (isAdmin()) {
    limparLivro();
    document.getElementById('btnLimparLivro').addEventListener('click', limparLivro);
    document.getElementById('btnNovaCategoria').addEventListener('click', abrirModalNovaCategoria);
    document.getElementById('formNovaCategoria').addEventListener('submit', salvarNovaCategoria);

    document.getElementById('imagemLivro').addEventListener('change', (event) => {
      const input = event.target;
      if (!validarArquivoImagem(input) || !input.files.length) {
        return;
      }

      const preview = document.getElementById('previewImagemLivro');
      preview.src = URL.createObjectURL(input.files[0]);
      preview.classList.remove('d-none');
    });
  }

  document.getElementById('formBuscaLivro').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await carregarLivros(document.getElementById('buscaLivro').value);
    } catch (error) {
      showAlert('alertLivros', error.message, 'danger');
    }
  });

  document.getElementById('filtroCategoriaLivro').addEventListener('change', async () => {
    try {
      await carregarLivros(document.getElementById('buscaLivro').value);
    } catch (error) {
      showAlert('alertLivros', error.message, 'danger');
    }
  });

  if (isAdmin()) {
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

      if (
        !validarDetalhesLivro() ||
        !validarArquivoImagem(document.getElementById('imagemLivro'))
      ) {
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
        await carregarDestaquesCatalogo();
      } catch (error) {
        showAlert('alertLivros', error.message, 'danger');
      }
    });
  }

  try {
    await carregarCombosLivro();
    await carregarLivros();
    await carregarDestaquesCatalogo();
  } catch (error) {
    showAlert('alertLivros', error.message, 'danger');
  }
});
