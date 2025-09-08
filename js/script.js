document.getElementById("leadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Pegando os elementos
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const instagramInput = document.getElementById("instagram");

  // Pegando valores
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const instagram = instagramInput.value.trim();

  // Regex simples para email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Reset visual de erro
  [nomeInput, emailInput, instagramInput].forEach(input => input.classList.remove("is-invalid"));

  let hasError = false;

  // Validações
  if (!nome) {
    nomeInput.classList.add("is-invalid");
    hasError = true;
  }

  if (!email || !emailRegex.test(email)) {
    emailInput.classList.add("is-invalid");
    hasError = true;
  }

  if (!instagram || !instagram.startsWith("@")) {
    instagramInput.classList.add("is-invalid");
    hasError = true;
  }

  if (hasError) return; // para envio se algum campo inválido

  // Monta objeto para enviar
  const data = { nome, email, instagram };

  try {
    const response = await fetch("https://dce344c3fa8d.ngrok-free.app/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
  // Esconde formulário
  document.getElementById("leadForm").classList.add("d-none");
  // Mostra botão
  const downloadDiv = document.getElementById("download");
  downloadDiv.classList.remove("d-none");

  // Cria link de download temporário e dispara
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "meu-arquivo.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

});
