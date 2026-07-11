// transition.js

const TRANSITION_KEY = "pageTransitionDirection";

let moved = false;
let touchStartY = 0;

function isAtFirstGreetingTop() {
    const firstSection = document.getElementById("greeting");
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;

    if (!firstSection) {
        return scrollTop <= 80;
    }

    const rect = firstSection.getBoundingClientRect();
    return scrollTop <= 80 && rect.top >= -40 && rect.top <= 140;
}

/**
 * ページ表示時のフェードイン
 */
function playTransition() {
    const direction = sessionStorage.getItem(TRANSITION_KEY);
    const page = document.getElementById("page");

    if (!page) {
        sessionStorage.removeItem(TRANSITION_KEY);
        return;
    }

    if (direction === "down") {
        page.classList.add("fade-in-up");
        document.body.classList.add("fade-in-up");
    }

    if (direction === "up") {
        page.classList.add("fade-in-down");
        document.body.classList.add("fade-in-down");
    }

    sessionStorage.removeItem(TRANSITION_KEY);

    const hash = window.location.hash;
    if (hash) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: "auto" });
            }, 250);
        }
    }
}

document.addEventListener("DOMContentLoaded", playTransition);

/**
 * ページ遷移
 */
function transitionTo(page, direction, animation) {
    if (moved) return;
    moved = true;

    sessionStorage.setItem(TRANSITION_KEY, direction);

    const pageEl = document.getElementById("page");
    if (pageEl) {
        pageEl.classList.add(animation);
    }
    document.body.classList.add(animation);

    setTimeout(() => {
        location.href = page;
    }, 600);
}

/**
 * ページ遷移イベント設定
 */
function initTransition(options) {

    const {

        nextPage,
        direction,
        animation,
        wheel,
        swipe

    } = options;

    //--------------------------------------------------
    // リンククリック
    //--------------------------------------------------

    document.addEventListener("click", (e) => {

        const link =
            e.target.closest(`a[href^="${nextPage}"]`);

        if (!link || moved) return;

        const href = link.getAttribute("href");
        if (!href) return;

        e.preventDefault();

        transitionTo(
            href,
            direction,
            animation
        );

    });

    //--------------------------------------------------
    // マウスホイール
    //--------------------------------------------------

    window.addEventListener("wheel", (e) => {

        if (moved) return;

        const atTop = isAtFirstGreetingTop();

        // 下スクロールで遷移
        if (

            wheel === "down" &&
            e.deltaY > 30

        ) {

            transitionTo(
                nextPage,
                direction,
                animation
            );

        }

        // 上スクロールで遷移
        if (

            wheel === "up" &&
            atTop &&
            e.deltaY < -8

        ) {

            transitionTo(
                nextPage,
                direction,
                animation
            );

        }

    });

    //--------------------------------------------------
    // スワイプ開始
    //--------------------------------------------------

    window.addEventListener("touchstart", (e) => {

        touchStartY =
            e.touches[0].clientY;

    });

    //--------------------------------------------------
    // スワイプ終了
    //--------------------------------------------------

    window.addEventListener("touchend", (e) => {

        if (moved) return;

        const touchEndY =
            e.changedTouches[0].clientY;
        const atTop = isAtFirstGreetingTop();

        // 上スワイプ
        if (

            swipe === "up" &&
            atTop &&
            touchStartY - touchEndY > 80

        ) {

            transitionTo(
                nextPage,
                direction,
                animation
            );

        }

        // 下スワイプ
        if (

            swipe === "down" &&
            atTop &&
            touchEndY - touchStartY > 80

        ) {

            transitionTo(
                nextPage,
                direction,
                animation
            );

        }

    });

}