export function toggleDiv(selector) {
    if (selector) {

        try {

            let element = document.querySelector(selector);
            element.classList.toggle("hidden");

        } catch (err) {
            console.error(err);
        }

    } else {
        console.error({message: "No selector was provided to Toggle Div"});
    }
}

