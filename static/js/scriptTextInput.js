//import CODE from "../../codeWheelTest";

var input = document.getElementById("codeSpin")


input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        console.log("enter")
        // Cancel the default action, if needed

        // Trigger the button element with a click
        document.getElementById("btnSpin").click();

        $('.wrapperWheel').addClass('enablebutton').removeClass('disabledbutton').removeClass("disableWrapper")
    }
}
)


