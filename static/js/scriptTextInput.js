//import CODE from "../../codeWheelTest";


var input = document.getElementById("codeSpin");

//var btn = document.getElementById("btnSpin")

$("#codeSpin").keypress(function (e) {
  if (e.which == 13) {
    const dbRef = firebase.database().ref().child('wheel').child('code')

    dbRef.once('value', async (data) => {
      var snapshot = await data.val()
     
      for (const [key, value] of Object.entries(snapshot)) {
        if (input.value == value) {
          alert("Chúc mừng bạn đã nhập thành công !")
          $(".wrapperWheel")
            .addClass("enablebutton")
            .removeClass("disabledbutton")
            .removeClass("disableWrapper");

            dbRef.child(key).remove()
        } 
      }
    })


  }
});
