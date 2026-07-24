document.addEventListener("DOMContentLoaded", () => {

    const valor = document.getElementById("valor");

    if (valor) {

        valor.addEventListener("blur", function () {

            if (this.value !== "") {

                const numero = parseFloat(this.value);

                if (!isNaN(numero)) {
                    this.value = numero.toFixed(2);
                }

            }

        });

    }

});