// RSVP

const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxxzy-esBSxy5czwkO-KczwED1x52siv2G0DGudKXk6rdROHRH3MA-fYxL2svEQvXBeLQ/exec";

const form =
    document.getElementById("rsvp-form");

if (form) {
    const button =
        document.getElementById("submitButton");

    const loading =
        document.getElementById("loading") || document.getElementById("sending");

    const result =
        document.getElementById("result");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        if (!button) return;

        button.disabled = true;

        if (loading) {
            loading.style.display = "block";
        }

        if (result) {
            result.innerHTML = "";
        }

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

            if (result) {
                if (json.status === "success") {
                    result.textContent = "回答ありがとうございました。";
                } else {
                    result.textContent = json.message;
                }
            }

        } catch (error) {

            console.log(error);

            if (result) {
                result.innerHTML = "通信エラーが発生しました。";
            }

        } finally {
            button.disabled = false;

            if (loading) {
                loading.style.display = "none";
            }
        }

    });
}