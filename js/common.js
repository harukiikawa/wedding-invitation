async function include(id, file) {
    const html = await fetch(file).then(r => r.text());
    document.getElementById(id).innerHTML = html;
}

let floatingItems = [];
let timer;
let formVisible = false;

function showFloating(){

    if(formVisible) return;

    floatingItems.forEach(item=>{
        item.classList.add("show");
    });

}

function hideFloating(){

    floatingItems.forEach(item=>{
        item.classList.remove("show");
    });

}

function showButtonLater(){

    hideFloating();

    clearTimeout(timer);

    if(formVisible) return;

    timer = setTimeout(showFloating,2500);

}

async function init() {

    await include("header", "components/header.html");
    await include("footer", "components/footer.html");

    floatingItems = document.querySelectorAll(".floating-ui");

    const form = document.querySelector("#footer-hide-area"); // または #note

    if(form){
        const observer = new IntersectionObserver(entries => {

            formVisible = entries[0].isIntersecting;

            if(formVisible){
                hideFloating();
            }else{
                showButtonLater();
            }

        },{
            threshold:0.2
        });

        observer.observe(form);
    }

    initMenu();
    playTransition();

    showButtonLater();

    ["scroll","touchstart","mousemove"].forEach(event=>{

        window.addEventListener(event,()=>{

            if(!formVisible){
                showButtonLater();
            }

        });

    });
    const lightSections = document.querySelectorAll("#bow-black");

    const colorObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){
                document
                    .querySelector(".scroll-indicator")
                    ?.classList.add("dark-mode");
            }else{
                document
                    .querySelector(".scroll-indicator")
                    ?.classList.remove("dark-mode");
            }

        });

    },{
        threshold:0.5
    });

    lightSections.forEach(section=>{
        colorObserver.observe(section);
    });
}

window.addEventListener("DOMContentLoaded", init);


window.addEventListener("load", () => {

    const loading = document.getElementById("loading");
    const page = document.getElementById("page");

    if (!page) return;

    // loading が既に削除されている
    if (!loading) {
        page.classList.add("show");
        return;
    }

    if (sessionStorage.getItem("loadingPlayed")) {
        loading.remove();
        page.classList.add("show");
        return;
    }

    sessionStorage.setItem("loadingPlayed", "true");

    setTimeout(() => {

        loading.classList.add("hide");

        // 少し待ってからCoverを表示
        setTimeout(() => {
            page.classList.add("show");
        }, 400);

        setTimeout(() => {
            loading.remove();
        }, 900);

    }, 1800);

});