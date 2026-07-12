async function include(id, file) {

    const html = await fetch(file).then(r => r.text());

    document.getElementById(id).innerHTML = html;

}

async function init() {
    await include("header", "components/header.html");
    await include("footer", "components/footer.html");

    initMenu();

    playTransition();

}

window.addEventListener("DOMContentLoaded", init);
