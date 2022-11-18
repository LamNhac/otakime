const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 18, value: 4 },
  { minDegree: 19, maxDegree: 36, value: 1 },
  { minDegree: 37, maxDegree: 54, value: 4 },
  { minDegree: 55, maxDegree: 72, value: 1 },
  { minDegree: 73, maxDegree: 90, value: 4 },

  { minDegree: 91, maxDegree: 108, value: 4 },
  { minDegree: 109, maxDegree: 126, value: 1 },
  { minDegree: 127, maxDegree: 144, value: 4 },
  { minDegree: 145, maxDegree: 162, value: 1 },
  { minDegree: 163, maxDegree: 180, value: 4 },

  { minDegree: 181, maxDegree: 198, value: 4 },
  { minDegree: 199, maxDegree: 216, value: 1 },
  { minDegree: 217, maxDegree: 234, value: 4 },
  { minDegree: 235, maxDegree: 252, value: 4 },
  { minDegree: 253, maxDegree: 270, value: 3 },

  { minDegree: 271, maxDegree: 288, value: 4 },
  { minDegree: 289, maxDegree: 306, value: 3 },
  { minDegree: 307, maxDegree: 324, value: 4 },
  { minDegree: 325, maxDegree: 342, value: 4 },
  { minDegree: 343, maxDegree: 360, value: 2 },
];
//Size of each piece
const data = [
  18, 18, 18, 18, 18,

  18, 18, 18, 18, 18,

  18, 18, 18, 18, 18,

  18, 18, 18, 18, 18,
];
//background color for each piece
var pieColors = [
  "#454545",
  "#D3D3D3",
  "#454545",
  "#D3D3D3",
  "#454545",

  "#D3D3D3",
  "#454545",
  "#D3D3D3",
  "#454545",
  "#D3D3D3",

  "#454545",
  "#D3D3D3",
  "#454545",
  "#D3D3D3",
  "#454545",

  "#D3D3D3",
  "#454545",
  "#D3D3D3",
  "#454545",
  "#D3D3D3",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)

    /* 
       labels: [
           1, 2, 3, 4, 5,
           6, 7, 8, 9, 10,
           11, 12, 13, 14, 15,
           16, 17, 18, 19, 20
        ],
       */
    labels: [4, 1, 4, 1, 4, 2, 4, 4, 3, 4, 3, 4, 4, 1, 4, 4, 1, 4, 1, 4],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 20 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p style="font-size:20px; ">Chúc mừng bạn đã nhận phần thưởng <span class = "font-semibold"> số ${i.value}</span> !</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Đang xoay...</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
        Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
        */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);

  $(".wrapperWheel")
    .addClass("disabledbutton")
    .addClass("disableWrapper")
    .removeClass("enablebutton")

});
