document.addEventListener('DOMContentLoaded', () => {
  if (getToken()) {
    window.location.href = 'dashboard.html';
    return;
  }

  document.getElementById('formLogin').addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      const email = document.getElementById('loginEmail').value;
      const senha = document.getElementById('loginSenha').value;
      const resposta = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, senha })
      });

      setToken(resposta.data.token);
      window.location.href = 'dashboard.html';
    } catch (error) {
      showAlert('alertAuth', error.message, 'danger');
    }
  });

  document.getElementById('formRegister').addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      const nome = document.getElementById('registerNome').value;
      const email = document.getElementById('registerEmail').value;
      const senha = document.getElementById('registerSenha').value;
      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ nome, email, senha })
      });

      showAlert('alertAuth', 'Conta criada. Entre com seu email e senha.', 'success');
      event.target.reset();
      bootstrap.Tab.getOrCreateInstance(document.getElementById('login-tab')).show();
    } catch (error) {
      showAlert('alertAuth', error.message, 'danger');
    }
  });
});
