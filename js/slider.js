const setSlideshowHeight = (frame, slide) => {
    const ratio = Number(slide.dataset.imageRatio);

    if (ratio) {
        frame.style.height = `${frame.clientWidth * ratio}px`;
    }
};

const startSlideshow = () => {
    document.querySelectorAll(".img-frame").forEach(frame => {
        const slides = [...frame.querySelectorAll(".slide")];
        const previousButton = frame.querySelector(".slider-button-prev");
        const nextButton = frame.querySelector(".slider-button-next");

        if (!slides.length) return;

        slides.forEach(slide => {
            const imageUrl = getComputedStyle(slide).backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];

            if (!imageUrl) return;

            const image = new Image();
            image.addEventListener("load", () => {
                slide.dataset.imageRatio = image.naturalHeight / image.naturalWidth;

                if (slide.classList.contains("is-active")) {
                    setSlideshowHeight(frame, slide);
                }
            });
            image.src = imageUrl;
        });

        if (slides.length < 2) {
            slides[0]?.classList.add("is-active");
            previousButton?.setAttribute("hidden", "");
            nextButton?.setAttribute("hidden", "");
            return;
        }

        let activeIndex = 0;
        let autoPlayTimer;
        slides[activeIndex].classList.add("is-active");
        setSlideshowHeight(frame, slides[activeIndex]);

        const showSlide = nextIndex => {
            slides[activeIndex].classList.remove("is-active");
            activeIndex = (nextIndex + slides.length) % slides.length;
            slides[activeIndex].classList.add("is-active");
            setSlideshowHeight(frame, slides[activeIndex]);
        };

        const restartAutoPlay = () => {
            clearInterval(autoPlayTimer);
            autoPlayTimer = setInterval(() => {
                showSlide(activeIndex + 1);
            }, 4500);
        };

        const pauseAutoPlay = () => {
            clearInterval(autoPlayTimer);
        };

        previousButton?.addEventListener("click", () => {
            showSlide(activeIndex - 1);
            restartAutoPlay();
        });

        nextButton?.addEventListener("click", () => {
            showSlide(activeIndex + 1);
            restartAutoPlay();
        });

        frame.addEventListener("pointerdown", pauseAutoPlay);
        frame.addEventListener("pointerup", restartAutoPlay);
        frame.addEventListener("pointercancel", restartAutoPlay);
        frame.addEventListener("pointerleave", restartAutoPlay);

        restartAutoPlay();

        window.addEventListener("resize", () => {
            setSlideshowHeight(frame, slides[activeIndex]);
        });
    });
};

window.addEventListener("DOMContentLoaded", startSlideshow);