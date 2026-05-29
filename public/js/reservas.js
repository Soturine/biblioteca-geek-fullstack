let reservas = [];

function statusReservaBadge(status) {
  const classes = {
    liberada: 'success',
    aguardando: 'warning',
    cancelada: 'secondary',
    retirada: 'primary',
    expirada: 'danger',
  };
  return classes[status] || 'secondary';
}

function podeCancelarReserva(reserva) {
  return ['liberada', 'aguardando'].includes(reserva.status);
}

function renderAcoesReserva(reserva) {
  const botoes = [];

  if (isAdmin()) {
    botoes.push(`
      <select class="form-select form-select-sm d-inline-block w-auto me-1" onchange="alterarStatusReserva(${reserva.id_reserva}, this.value)">
        ${['liberada', 'aguardando', 'cancelada', 'retirada', 'expirada']
          .map(
            (status) => `
          <option value="${status}" ${status === reserva.status ? 'selected' : ''}>${status}</option>
        `,
          )
          .join('')}
      </select>
    `);
  }

  if (podeCancelarReserva(reserva)) {
    botoes.push(
      `<button class="btn btn-sm btn-outline-danger" onclick="cancelarReserva(${reserva.id_reserva})">Cancelar</button>`,
    );
  }

  return botoes.length ? botoes.join('') : '<span class="text-secondary">Sem ações</span>';
}

async function carregarReservas() {
  const resposta = await apiFetch(isAdmin() ? '/reservas' : '/reservas/minhas');
  reservas = resposta.data;
  const tbody = document.getElementById('tbodyReservas');
  document.getElementById('thUsuarioReserva').classList.toggle('d-none', !isAdmin());

  if (!reservas.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-secondary">Nenhuma reserva encontrada.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = reservas
    .map(
      (reserva) => `
    <tr>
      <td>
        <strong>${escapeHtml(reserva.livro_titulo)}</strong>
        <span class="d-block text-secondary">${escapeHtml(reserva.autor_nome || '')}</span>
      </td>
      <td class="${isAdmin() ? '' : 'd-none'}">
        ${escapeHtml(reserva.usuario_nome || '')}
        <span class="d-block text-secondary">${escapeHtml(reserva.usuario_email || '')}</span>
      </td>
      <td>
        <span class="badge text-bg-${statusReservaBadge(reserva.status)}">${escapeHtml(reserva.status)}</span>
      </td>
      <td>${formatDate(reserva.data_reserva)}</td>
      <td>${formatDate(reserva.data_prevista_retirada)}</td>
      <td>${escapeHtml(reserva.observacao || '')}</td>
      <td class="text-end text-nowrap">${renderAcoesReserva(reserva)}</td>
    </tr>
  `,
    )
    .join('');
}

async function cancelarReserva(id) {
  if (!confirm('Cancelar esta reserva?')) {
    return;
  }

  try {
    await apiFetch(`/reservas/${id}/cancelar`, { method: 'PUT' });
    showAlert('alertReservas', 'Reserva cancelada com sucesso.');
    await carregarReservas();
  } catch (error) {
    showAlert('alertReservas', error.message, 'danger');
  }
}

async function alterarStatusReserva(id, status) {
  try {
    await apiFetch(`/reservas/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    showAlert('alertReservas', 'Status atualizado com sucesso.');
    await carregarReservas();
  } catch (error) {
    showAlert('alertReservas', error.message, 'danger');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  protegerPagina();
  montarNavbar('reservas');

  if (isAdmin()) {
    document.getElementById('breadcrumbHomeReservas').href = 'dashboard.html';
    document.getElementById('breadcrumbHomeReservas').textContent = 'Dashboard';
    document.getElementById('tituloReservas').textContent = 'Reservas';
    document.getElementById('subtituloReservas').textContent = 'Todas as reservas';
  } else {
    document.getElementById('tituloReservas').textContent = 'Minhas reservas';
    document.getElementById('subtituloReservas').textContent = 'Reservas do usuário logado';
  }

  try {
    await carregarReservas();
  } catch (error) {
    showAlert('alertReservas', error.message, 'danger');
  }
});
