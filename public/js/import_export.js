document.addEventListener('DOMContentLoaded', () => {
  protegerPagina();
  montarNavbar('json');

  document.getElementById('btnExportarJson').addEventListener('click', async () => {
    const entidade = document.getElementById('entidadeExportar').value;

    try {
      const resposta = await apiFetch(`/json/exportar/${entidade}`);
      baixarArquivo(`${entidade}.json`, JSON.stringify(resposta.data, null, 2), 'application/json');
      showAlert('alertJson', 'Arquivo exportado com sucesso.');
    } catch (error) {
      showAlert('alertJson', error.message, 'danger');
    }
  });

  document.getElementById('btnImportarJson').addEventListener('click', async () => {
    const entidade = document.getElementById('entidadeImportar').value;
    const input = document.getElementById('arquivoJson');

    if (!input.files.length) {
      showAlert('alertJson', 'Selecione um arquivo JSON.', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('arquivo', input.files[0]);

    try {
      const resposta = await apiFetch(`/json/importar/${entidade}`, {
        method: 'POST',
        body: formData
      });

      showAlert('alertJson', `Importados: ${resposta.data.importados}. Erros: ${resposta.data.erros.length}.`);
      input.value = '';
    } catch (error) {
      showAlert('alertJson', error.message, 'danger');
    }
  });
});
