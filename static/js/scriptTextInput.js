//import CODE from "../../codeWheelTest";

var input = document.getElementById("codeSpin");

//var btn = document.getElementById("btnSpin")

$("#codeSpin").keypress(function (e) {
  if (e.which == 13) {
    $.getJSON("static/json/wheel.json", function (data) {
      var codeArr = data["code"];
      for (let i = 0; i < codeArr.length; i++) {
        if (input.value == codeArr[i]) {
          console.log("Ket qua chinh xac: ", codeArr[i]);
          alert("Chúc mừng bạn đã nhập đúng! :D");
          $(".wrapperWheel")
            .addClass("enablebutton")
            .removeClass("disabledbutton")
            .removeClass("disableWrapper");

          break;
        }
      }
    });
  }
});
