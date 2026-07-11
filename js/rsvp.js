// RSVP

const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxxzy-esBSxy5czwkO-KczwED1x52siv2G0DGudKXk6rdROHRH3MA-fYxL2svEQvXBeLQ/exec";

const form =
    document.getElementById("rsvp-form");


if (form){
    const button =
        document.getElementById("submitButton");

    const loading =
        document.getElementById("loading");

    const result =
        document.getElementById("result");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        button.disabled = true;

        loading.style.display = "block";

        result.innerHTML = "";

        const formData =
            new FormData(form);

        const data =
            Object.fromEntries(formData.entries());

        try {

            const response = await fetch(GAS_URL, {
                method: "POST",
                body: JSON.stringify(data)
            });

            const json = await response.json();

            console.log(json);

            if (json.status === "success") {
                result.textContent = "回答ありがとうございました。";
            } else {
                result.textContent = json.message;
            }

        } catch (error) {

            console.log(error);

            result.innerHTML =
                "通信エラーが発生しました。";

            button.disabled = false;

        }

        loading.style.display = "none";

    });
}