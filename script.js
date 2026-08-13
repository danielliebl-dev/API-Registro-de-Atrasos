
// Substitua pela URL gerada na publicação do seu Google Apps Script
const URL_DO_WEB_APP = "COLE_AQUI_A_URL_DO_SEU_WEB_APP";

// Preenche automaticamente a data e hora atuais no formulário
window.addEventListener('DOMContentLoaded', () => {
  atualizarDataHora();
});

function atualizarDataHora() {
  const hoje = new Date();
  document.getElementById('data').value = hoje.toISOString().split('T')[0];
  
  const horas = String(hoje.getHours()).padStart(2, '0');
  const minutos = String(hoje.getMinutes()).padStart(2, '0');
  document.getElementById('hora').value = `${horas}:${minutos}`;
}

// Manipulação do envio do formulário
document.getElementById('formAtraso').addEventListener('submit', function(e) {
  e.preventDefault();

  const btn = document.getElementById('btnSalvar');
  const msg = document.getElementById('mensagem');

  // Estado de carregamento
  btn.disabled = true;
  btn.textContent = "Registrando...";
  msg.style.display = "none";

  // Objeto com os dados do formulário
  const dados = {
    nome: document.getElementById('nome').value,
    turma: document.getElementById('turma').value,
    data: document.getElementById('data').value,
    hora: document.getElementById('hora').value,
    motivo: document.getElementById('motivo').value,
    pedagoga: document.getElementById('pedagoga').value
  };

  // Envio dos dados para o Google Apps Script
  fetch(URL_DO_WEB_APP, {
    method: 'POST',
    mode: 'no-cors', // Necessário para contornar políticas de CORS do Apps Script
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
  .then(() => {
    msg.className = "sucesso";
    msg.textContent = "Atraso registrado na planilha com sucesso!";
    msg.style.display = "block";
    
    // Limpa o formulário e redefine a data/hora atuais
    document.getElementById('formAtraso').reset();
    atualizarDataHora();
  })
  .catch(error => {
    msg.className = "erro";
    msg.textContent = "Ocorreu um erro ao registrar: " + error.message;
    msg.style.display = "block";
  })
  .finally(() => {
    btn.disabled = false;
    btn.textContent = "Registrar Atraso";
  });
});