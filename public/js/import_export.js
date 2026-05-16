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
    const detalhes = document.getElementById('detalhesImportacaoJson');
    detalhes.classList.add('d-none');
    detalhes.textContent = '';

    if (!input.files.length) {
      showAlert('alertJson', 'Selecione um arquivo JSON.', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('arquivo', input.files[0]);

    try {
      const resposta = await apiFetch(`/json/importar/${entidade}`, {
        method: 'POST',
        body: formData,
      });

      const resumo = resposta.data;
      showAlert(
        'alertJson',
        `Processados: ${resumo.total_processados}. Importados: ${resumo.importados}. Ignorados por duplicidade: ${resumo.ignorados_duplicidade}. Erros: ${resumo.erros_quantidade}.`,
      );

      if (resumo.erros.length || resumo.duplicidades.length) {
        detalhes.textContent = JSON.stringify(
          {
            duplicidades: resumo.duplicidades,
            erros: resumo.erros,
          },
          null,
          2,
        );
        detalhes.classList.remove('d-none');
      }

      input.value = '';
    } catch (error) {
      showAlert('alertJson', error.message, 'danger');
    }
  });
});
