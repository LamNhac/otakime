//import CODE from "../../codeWheelTest";


var input = document.getElementById("codeSpin");

//var btn = document.getElementById("btnSpin")

$("#codeSpin").keypress(function (e) {
  if (e.which == 13) {
    const dbRef = firebase.database().ref().child('wheel').child('code')
    dbRef.on('value', function (data) {
      var snapshot = data.val()
      for (let i = 0; i < snapshot.length; i++) {

        if (input.value == snapshot[i]) {
          alert("Chúc mừng bạn đã nhập thành công! :D")
          $(".wrapperWheel")
            .addClass("enablebutton")
            .removeClass("disabledbutton")
            .removeClass("disableWrapper");

            snapshot[i].set(null)

        }
      }
    })


  }
});
