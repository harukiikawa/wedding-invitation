function initMenu() {

    const menu = document.getElementById("menu");
    const button = document.getElementById("menu-button");

    // メニュー開閉
    button.addEventListener("click", (e) => {

        e.stopPropagation();

        menu.classList.toggle("open");
        button.classList.toggle("open");

    });

    // メニュー内のリンク
    document.querySelectorAll(".menu a").forEach(link => {

        link.addEventListener("click", e => {

            const href = link.getAttribute("href");

            if (
                location.pathname.endsWith("detail.html") &&
                href.startsWith("detail.html#")
            ) {

                e.preventDefault();

                menu.classList.remove("open");
                button.classList.remove("open");

                const id = href.split("#")[1];

                document.getElementById(id).scrollIntoView({
                    behavior: "smooth"
                });

                return;
            }

            menu.classList.remove("open");
            button.classList.remove("open");

        });

    });

    // メニュー外をクリックしたら閉じる
    document.addEventListener("click", (e) => {

        if (
            !menu.contains(e.target) &&
            !button.contains(e.target)
        ) {

            menu.classList.remove("open");
            button.classList.remove("open");

        }

    });

}