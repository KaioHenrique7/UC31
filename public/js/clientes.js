document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");

    if (formulario) {
        formulario.addEventListener("submit", (e) => {
            const nome = document.getElementById("nome");
            const telefone = document.getElementById("telefone");
            const email = document.getElementById("email");

            if (nome && nome.value.trim() === "") {
                alert("Informe o nome do cliente.");
                e.preventDefault();
                return;
            }

            if (telefone && telefone.value.trim() === "") {
                alert("Informe o telefone.");
                e.preventDefault();
                return;
            }

            if (email && email.value.trim() === "") {
                alert("Informe o e-mail.");
                e.preventDefault();
            }
        });
    }
});