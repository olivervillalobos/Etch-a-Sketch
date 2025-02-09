const eraseBtn = document.querySelector("#eraseBtn");
const saveBtn = document.querySelector("#saveBtn");
const etchSketchContainer = document.querySelector("#etchSketchContainer");
let opacityValue = 0.1;
const resetValue = 0;
let size = 0;

function downloadURI(uri, name) {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link); // Append to document to ensure it works in some browsers
    link.click();
    document.body.removeChild(link); // Cleanup after download
}

function printToFile(etchSketchContainer) {
    html2canvas(etchSketchContainer).then(canvas => {
        let myImage = canvas.toDataURL("image/jpeg"); // Correct format
        downloadURI(myImage, "yourImage.jpg"); // No need to prepend "data:"
    });
}

saveBtn.addEventListener("click", () => {
    let etchSketchContainer = document.querySelector("#etchSketchContainer"); // Replace with your actual container ID
    if (etchSketchContainer) {
        printToFile(etchSketchContainer);
    } else {
        console.error("etchSketchContainer not found!");
    }
});


window.addEventListener("load", () => {
    const etchSketchContainer = document.getElementById("etchSketchContainer");

    if (!etchSketchContainer) {
        console.error("etchSketchContainer not found!");
        return;
    }

    let size = parseInt(prompt("Enter the canvas size desired:"), 10);

    if (isNaN(size) || size <= 0) {
        alert("Invalid size. Please enter a positive number.");
        return;
    }

    etchSketchContainer.innerHTML = ""; // Clear previous grid

    etchSketchContainer.setAttribute("style", `
        display: grid;
        grid-template-columns: repeat(${size}, 1fr);
        grid-template-rows: repeat(${size}, 1fr);
        border: 1px solid black;
        height: 20rem;
        width: 20rem;
    `);

    for (let i = 0; i < size * size; i++) {
        let divCell = document.createElement("div");
        divCell.setAttribute("class", "sketchSection");
        divCell.setAttribute("style", `
            border: 0.5px solid #B7B7B7;
            width: 100%;
            height: 100%;
            background-color: white;
            opacity: 1;
        `);
        divCell.setAttribute("data-opacity", "0.1"); // Initialize opacity
        etchSketchContainer.appendChild(divCell);
    }

    attachSketchListeners(); // Attach event listeners
});

// Function to generate random RGB color
function randColorNum() {
    return Math.floor(Math.random() * 256);
}

function randomRGB() {
    return `rgb(${randColorNum()},${randColorNum()},${randColorNum()})`;
}

// Function to attach event listeners **after** elements are created
function attachSketchListeners() {
    const sketchItems = document.querySelectorAll(".sketchSection");
    sketchItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            item.style.opacity = opacityValue;
            item.style.backgroundColor = randomRGB();
            opacityValue = opacityValue + 0.1;
        });
    });
}

eraseBtn.addEventListener("click", () => {
    // Get the latest sketch items
    const sketchItm = document.querySelectorAll(".sketchSection");

    sketchItm.forEach(item => {
        item.style.backgroundColor = "white"; // Reset background color
        item.style.opacity = "1"; // Reset opacity
        item.setAttribute("data-opacity", "0.1"); // Reset stored opacity value
    });
});

