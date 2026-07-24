window.addEventListener("load", () => {

    const loading = document.getElementById("loading");

    if (loading) {

        loading.style.opacity = "0";

        setTimeout(() => {
            loading.style.display = "none";
        }, 500);

    }

});