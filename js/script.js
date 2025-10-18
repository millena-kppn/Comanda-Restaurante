// FUNÇÃO PARA ABRIR COMANDA (botões da página inicial)
function abrirComanda(numeroMesa) {
  localStorage.setItem("mesaAtual", numeroMesa);
  window.location.href = "html/comanda.html?mesa=" + numeroMesa;
}
// PÁGINA DE COMANDA
if (document.getElementById("formPedido")) {
  const params = new URLSearchParams(window.location.search);
  const nomeMesa = params.get("mesa") || localStorage.getItem("mesaAtual") || "Mesa Desconhecida";
  document.getElementById("tituloComanda").textContent = `Comanda - Mesa ${nomeMesa}`;

  const form = document.getElementById("formPedido");
  const lista = document.getElementById("listaPedidos");
  const pedidos = [];
  // Adicionar itens à comanda
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const produto = document.getElementById("produto").value.trim();
    const quantidade = document.getElementById("quantidade").value;

    if (!produto || quantidade <= 0) return;

    pedidos.push({ produto, quantidade });
    const item = document.createElement("li");
    item.textContent = `${quantidade}x ${produto}`;
    lista.appendChild(item);
    form.reset();
  });
  // Enviar pedidos para cozinha
  document.getElementById("btnEnviar").addEventListener("click", () => {
    if (pedidos.length === 0) {
      alert("Adicione pelo menos um pedido antes de enviar!");
      return;
    }

    const novoPedido = {
      mesa: nomeMesa,
      pedidos: pedidos,
      hora: new Date().toLocaleTimeString(),
      status: "Em preparo"
    };

    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidosCozinha") || "[]");
    pedidosSalvos.push(novoPedido);
    localStorage.setItem("pedidosCozinha", JSON.stringify(pedidosSalvos));

    abrirModal();
    lista.innerHTML = "";
    pedidos.length = 0;
  });
}
// PÁGINA DA COZINHA
if (document.getElementById("pedidosContainer")) {
  const container = document.getElementById("pedidosContainer");
  const pedidos = JSON.parse(localStorage.getItem("pedidosCozinha") || "[]");

  if (pedidos.length === 0) {
    container.innerHTML = "<p>Nenhum pedido enviado ainda.</p>";
  } else {
    pedidos.forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "pedido-card";
      card.innerHTML = `
        <h3>🍽️ Mesa: ${p.mesa}</h3>
        <p><strong>Hora:</strong> ${p.hora}</p>
        <ul>${p.pedidos.map(item => `<li>${item.quantidade}x ${item.produto}</li>`).join('')}</ul>
        <p>Status: <strong>${p.status}</strong></p>
        <button onclick="marcarPronto(${i})" ${p.status === "Pronto" ? "disabled" : ""}>
          ✅ ${p.status === "Pronto" ? "Pronto" : "Marcar como Pronto"}
        </button>
      `;
      container.appendChild(card);
    });
  }
}
// Função para marcar pedido como pronto
function marcarPronto(index) {
  const pedidos = JSON.parse(localStorage.getItem("pedidosCozinha") || "[]");
  pedidos[index].status = "Pronto";
  localStorage.setItem("pedidosCozinha", JSON.stringify(pedidos));
  window.location.reload();
}
// Função para limpar pedidos
function limparPedidos() {
  if (confirm("Deseja realmente limpar todos os pedidos?")) {
    localStorage.removeItem("pedidosCozinha");
    window.location.reload();
  }
}
// MODAL DE CONFIRMAÇÃO
function abrirModal() {
  document.getElementById("modal").style.display = "flex";
}
function fecharModal() {
  document.getElementById("modal").style.display = "none";
}


