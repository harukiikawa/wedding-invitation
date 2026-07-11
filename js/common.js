async function include(id, file) {

    const html = await fetch(file).then(r => r.text());

    document.getElementById(id).innerHTML = html;

}

async function init() {

    await include("header", "components/header.html");

    initMenu();

    playTransition();

}

window.addEventListener("DOMContentLoaded", init);

// // 共通パーツ読み込み
// async function include(id, file) {
//     const html = await fetch(file).then(r => r.text());
//     document.getElementById(id).innerHTML = html;
// }


// async function init() {

//     await include("header", "components/header.html");

//     const menu = document.getElementById("menu");
//     const button = document.getElementById("menu-button");

//     button.addEventListener("click", () => {
//         menu.classList.toggle("open");
//     });

//     document.querySelectorAll(".menu a").forEach(link => {

//         link.addEventListener("click", e => {

//             const href = link.getAttribute("href");

//             // detail.html内リンクだけ横取りする
//             if (
//                 location.pathname.endsWith("detail.html") &&
//                 href.startsWith("detail.html#")
//             ) {
//                 e.preventDefault();

//                 menu.classList.remove("open");

//                 const id = href.split("#")[1];
//                 document.getElementById(id).scrollIntoView({
//                     behavior: "smooth"
//                 });

//                 return;
//             }

//             // 他のページへの遷移はブラウザに任せる
//             menu.classList.remove("open");
//         });

//     });

// }

// init();