// Página inicial - Criar e listar mesas
if (document.getElementById("novaMesaForm")) {
  const form = document.getElementById("novaMesaForm");
  const lista = document.getElementById("listaMesas");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nomeMesa = document.getElementById("nomeMesa").value;
    const item = document.createElement("li");
    item.innerHTML = `<a href="comanda.html?mesa=${nomeMesa}">${nomeMesa}</a>`;
    lista.appendChild(item);
    form.reset();
  });
}

// Página da comanda
if (document.getElementById("formPedido")) {
  const params = new URLSearchParams(window.location.search);
  const nomeMesa = params.get("mesa");
  document.getElementById("tituloComanda").textContent = `Comanda - ${nomeMesa}`;

  const form = document.getElementById("formPedido");
  const lista = document.getElementById("listaPedidos");
  const pedidos = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const produto = document.getElementById("produto").value;
    const quantidade = document.getElementById("quantidade").value;
    pedidos.push({ produto, quantidade });

    const item = document.createElement("li");
    item.textContent = `${quantidade}x ${produto}`;
    lista.appendChild(item);
    form.reset();
  });

  // Enviar pedidos (simulação com fetch POST)
  document.getElementById("btnEnviar").addEventListener("click", () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mesa: nomeMesa, pedidos })
    })
    .then(res => res.json())
    .then(data => {
      abrirModal();
      console.log("Pedido enviado:", data);
    });
  });
}

// Modal
function abrirModal() {
  document.getElementById("modal").style.display = "flex";
}
function fecharModal() {
  document.getElementById("modal").style.display = "none";
}
