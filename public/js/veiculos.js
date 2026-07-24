document.addEventListener("DOMContentLoaded", () => {

    const placa = document.getElementById("placa");

    if (placa) {
        placa.addEventListener("input", function () {
            this.value = this.value.toUpperCase();
        });
    }

    const formulario = document.querySelector("form");

    if (formulario) {
        formulario.addEventListener("submit", (e) => {

            const modelo = document.getElementById("modelo");
            const marca = document.getElementById("marca");

            if (modelo && modelo.value.trim() === "") {
                alert("Informe o modelo.");
                e.preventDefault();
                return;
            }

            if (marca && marca.value.trim() === "") {
                alert("Informe a marca.");
                e.preventDefault();
            }

        });
    }

});