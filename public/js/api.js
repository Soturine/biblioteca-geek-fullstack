const API_BASE = '/api/v1';

function getToken() {
  return localStorage.getItem('biblioteca_geek_token');
}

function setToken(token) {
  localStorage.setItem('biblioteca_geek_token', token);
}

function clearToken() {
  localStorage.removeItem('biblioteca_geek_token');
}

function usuarioAtual() {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch (error) {
    return null;
  }
}

function protegerPagina() {
  if (!getToken()) {
    window.location.href = 'login.html';
  }
}

function authHeaders(extra = {}) {
  const headers = { ...extra };
  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function apiFetch(path, options = {}) {
  const opts = { ...options };
  opts.headers = authHeaders(opts.headers || {});

  if (opts.body && !(opts.body instanceof FormData) && !opts.headers['Content-Type']) {
    opts.headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${path}`, opts);

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = data && data.message ? data.message : 'Erro na requisicao';
    throw new Error(message);
  }

  return data;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showAlert(containerId, message, type = 'success') {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  container.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${escapeHtml(message)}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
    </div>
  `;
}

function validarFormulario(form, alertContainerId, mensagem = 'Preencha os campos obrigatórios.') {
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    showAlert(alertContainerId, mensagem, 'warning');
    return false;
  }

  form.classList.remove('was-validated');
  return true;
}

function formatDate(value) {
  if (!value) {
    return '';
  }
  return new Date(value).toLocaleDateString('pt-BR');
}

function montarNavbar(active = '') {
  const alvo = document.getElementById('navbar');
  if (!alvo) {
    return;
  }

  const links = [
    ['dashboard.html', 'Dashboard', 'dashboard'],
    ['livros.html', 'Livros', 'livros'],
    ['autores.html', 'Autores', 'autores'],
    ['categorias.html', 'Categorias', 'categorias'],
    ['emprestimos.html', 'Empréstimos', 'emprestimos'],
    ['import_export.html', 'JSON', 'json'],
    ['logs.html', 'Logs XML', 'logs'],
    ['relatorio.html', 'Relatório', 'relatorio'],
  ];

  alvo.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="dashboard.html">Biblioteca Geek</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Abrir menu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="menuPrincipal">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            ${links
              .map(
                ([href, label, key]) => `
              <li class="nav-item">
                <a class="nav-link ${active === key ? 'active' : ''}" href="${href}">${label}</a>
              </li>
            `,
              )
              .join('')}
          </ul>
          <span class="navbar-text me-3">${escapeHtml(usuarioAtual()?.nome || '')}</span>
          <button class="btn btn-outline-light btn-sm" id="btnLogout">Sair</button>
        </div>
      </div>
    </nav>
  `;

  document.getElementById('btnLogout').addEventListener('click', async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch (error) {
      // Mesmo se a API recusar o token, a sessao local deve ser limpa.
    } finally {
      clearToken();
      window.location.href = 'login.html';
    }
  });
}

function baixarArquivo(nome, conteudo, tipo) {
  const blob = new Blob([conteudo], { type: tipo });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nome;
  link.click();
  URL.revokeObjectURL(url);
}
