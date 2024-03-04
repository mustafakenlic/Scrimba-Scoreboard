//define the DOM objects
let convertTypeSelect = document.getElementById("convertType");
let convertNumberInput = document.getElementById("convertNumber");
let convertButton = document.getElementById("convertBtn");

let lengthTable = document.querySelector("#length table");
let areaTable = document.querySelector("#area table");
let volumeTable = document.querySelector("#volume table");
let weigthTable = document.querySelector("#weigth table");

//define global varibles
let tableHeader = "";
let convertType = "m2i"; //assing default valu as metric to imperial

const lengthConversionRates = [
  { imperialSembole: "in", metricSembole: "cm", rate: 2.54 },
  { imperialSembole: "ft", metricSembole: "cm", rate: 30.48 },
  { imperialSembole: "yd", metricSembole: "m", rate: 0.9144 },
  { imperialSembole: "mi", metricSembole: "km", rate: 1.6093 },
];

const areaConversionRates = [
  { imperialSembole: "in²", metricSembole: "cm²", rate: 6.4516 },
  { imperialSembole: "ft²", metricSembole: "cm²", rate: 0.929 },
  { imperialSembole: "yd²", metricSembole: "m²", rate: 0.8361 },
  { imperialSembole: "mi²", metricSembole: "km²", rate: 2.59 },
];

const volumeConversionRates = [
  { imperialSembole: "fl oz", metricSembole: "ml", rate: 29.57 },
  { imperialSembole: "pt", metricSembole: "L", rate: 0.4732 },
  { imperialSembole: "gal", metricSembole: "L", rate: 3.7854 },
];

const weigthConversionRates = [
  { imperialSembole: "oz", metricSembole: "gr", rate: 28.35 },
  { imperialSembole: "lb", metricSembole: "kg", rate: 0.4536 },
  { imperialSembole: "ton", metricSembole: "t", rate:  0.9072},
];

convertButton.addEventListener("click", () => {
  genrateAllTables();
});

const genrateAllTables = () => {
  const number = convertNumberInput.value;
  convertType = convertTypeSelect.value;

  //hence all table header are same creat all at once
  createTableHead();

  //make calculations
  calculateTables(number, lengthConversionRates, lengthTable);
  calculateTables(number, areaConversionRates, areaTable);
  calculateTables(number, volumeConversionRates, volumeTable);
  calculateTables(number, weigthConversionRates, weigthTable);
};
const calculateTables = (number, arr, table) => {
    let result = calculate(number, arr);

    // render the output
    renderOutPutTable(result, table);
}


const createTableHead = () => {
  //asing default output to table head
  tableHeader = `<thead>
                    <tr>
                        <td>Metric</td>
                        <td>Imperial</td>
                    </tr>
                </thead>`;

  //if table head is imperial to metric
  if (convertType === "i2m") {
    tableHeader = `<thead>
                        <tr>
                            <td>Imperial</td>
                            <td>Metric</td>
                        </tr>
                    </thead>`;
  }
};

// calculate result and table body output based on number and given object
const calculate = (number, arr) => {
  let result = "<tbody>";

  for (let i = 0; i < arr.length; i++) {
    // define and assign default metric to imperial conversion values
    let semboleLeft = arr[i].metricSembole;
    let sembolerigth = arr[i].imperialSembole;
    let calc = round(Number(number) / Number(arr[i].rate), 3);

    // if it is imperial to metric
    if (convertType === "i2m") {
      semboleLeft = arr[i].imperialSembole;
      sembolerigth = arr[i].metricSembole;
      calc = round(Number(number) * Number(arr[i].rate), 3);
    }

    result += `<tr>
                    <td>${number} ${semboleLeft}</td>
                    <td>${calc} ${sembolerigth}</td>
                </tr>`;
  }
  result += "</tbody>";
  return result;
};
// only last 3 digit
const round = (n, dp) => {
  const h = +"1".padEnd(dp + 1, "0"); // 10 or 100 or 1000 or etc
  return Math.round(n * h) / h;
};


const renderOutPutTable = (result, table) => {
  table.innerHTML = tableHeader;
  table.innerHTML += result;
};


//genrate all tables at page load
genrateAllTables();