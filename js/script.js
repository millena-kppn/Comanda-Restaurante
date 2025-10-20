// Abre a comanda da mesa clicada
function abrirComanda(numeroMesa) {
  localStorage.setItem("mesaAtual", numeroMesa);
  window.location.href = `comanda.html?mesa=${numeroMesa}`;
}

//  Lógica da página Comanda 
const form = document.getElementById("formPedido");
const listaPedidos = document.getElementById("listaPedidos");
const btnEnviar = document.getElementById("btnEnviar");

let pedidos = [];

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const produto = document.getElementById("produto").value.trim();
    const quantidade = document.getElementById("quantidade").value.trim();

    if (!produto || !quantidade) return;

    pedidos.push({ produto, quantidade });
    atualizarLista();
    form.reset();
  });
}

function atualizarLista() {
  listaPedidos.innerHTML = "";
  pedidos.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = `${p.produto} - ${p.quantidade}x`;
    listaPedidos.appendChild(li);
  });
}

if (btnEnviar) {
  btnEnviar.addEventListener("click", () => {
    const mesa = localStorage.getItem("mesaAtual") || "Sem mesa";
    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidosCozinha")) || [];

    pedidosSalvos.push({ mesa, pedidos });
    localStorage.setItem("pedidosCozinha", JSON.stringify(pedidosSalvos));

    pedidos = [];
    atualizarLista();
    abrirModal();
  });
}

//  Modal de confirmação 
function abrirModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "flex";
}

function fecharModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "none";
}

//  Página da Cozinha 
function carregarPedidos() {
  const container = document.getElementById("pedidosContainer");
  if (!container) return;

  const pedidosCozinha = JSON.parse(localStorage.getItem("pedidosCozinha")) || [];
  container.innerHTML = "";

  pedidosCozinha.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("pedido");
    div.innerHTML = `<h3>Mesa ${item.mesa}</h3><ul>${item.pedidos.map(p => `<li>${p.produto} - ${p.quantidade}x</li>`).join("")}</ul>`;
    container.appendChild(div);
  });
}

function limparPedidos() {
  localStorage.removeItem("pedidosCozinha");
  carregarPedidos();
}

document.addEventListener("DOMContentLoaded", carregarPedidos);
