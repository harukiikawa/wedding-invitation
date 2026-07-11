function initMenu() {

    const menu = document.getElementById("menu");

    const button = document.getElementById("menu-button");

    button.addEventListener("click", () => {

        menu.classList.toggle("open");

    });

    document.querySelectorAll(".menu a").forEach(link => {

        link.addEventListener("click", e => {

            const href = link.getAttribute("href");

            if (
                location.pathname.endsWith("detail.html") &&
                href.startsWith("detail.html#")
            ) {

                e.preventDefault();

                menu.classList.remove("open");

                const id = href.split("#")[1];

                document.getElementById(id).scrollIntoView({

                    behavior: "smooth"

                });

                return;

            }

            menu.classList.remove("open");

        });

    });

}