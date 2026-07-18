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
        window.addEventListener(event,showButtonLater);
    });
}

window.addEventListener("DOMContentLoaded", init);
