const container = document.querySelector('#PosContainer');
let slider = document.querySelector('.slider');
let sliderValue = document.querySelector('#BoxIndicator');
sliderValue.innerHTML = slider.value;
numRows = slider.value;
let selectedColor = 'purple';

function createBoxes(numRows) {
    let boxCount = 0;
    for (let count=0; count<numRows; count++) {
        const smallContainer = document.createElement('div');
        smallContainer.classList.add('container-'+ count);
        smallContainer.style.display = 'flex'; 
        smallContainer.style.flexDirection = 'column'; 
        smallContainer.style.justifyContent = 'space-between'; 

        for (let i=0; i< numRows; i++) {
            let box = document.createElement('div');
            box.classList.add('boxes');
            box.classList.add('boxes-' + boxCount);
            boxCount++;
            let widthValue = 960/numRows + 'px';
            box.style.width = widthValue;
            box.style.height = widthValue;
            smallContainer.appendChild(box);
        };
        container.appendChild(smallContainer);    
    };

    // Creates for every box a variable 'clickedOn[i]' to register if its clicked on or not. 
    // Creates for every box a variable 'colorBox[i]' to remember what color it was, to set correct back when hovering over. 
    let clickedOn = [];
    let colorBox = [];
    let numContainers = numRows * numRows;
    for (let i=0; i<numContainers; i++) {
        clickedOn[i] = false;
        colorBox[i] = 'white';
    };

    // Makes boxes react to mouse
    // Need to fix that 'onmouseleave' get ignored when mouse has 'clicked' on box.
    let boxColor = 'white';
    let btnBoxes = document.querySelectorAll('.boxes');
    for (box in btnBoxes) {
        btnBoxes[box].onmousedown = function() {
            this.style.backgroundColor = selectedColor;

            let boxNum = this.className.split('-')[1];
            clickedOn[boxNum] = true;
            colorBox[boxNum] = selectedColor;

        };

        btnBoxes[box].onmouseover = function() {
            this.style.backgroundColor = selectedColor;
        };
        
        btnBoxes[box].onmouseleave = function() {

            let boxNum = this.className.split('-')[1];
            if (clickedOn[boxNum]) {
                this.style.backgroundColor = colorBox[boxNum];
            } else {
                this.style.backgroundColor = 'white';
            }
        };
    };

};

createBoxes(numRows);

// Remember what color is selected. 
const colorOptions = document.querySelectorAll('.colorBox')
const selectedColorBox = document.querySelector('.selectedColor');
for (color in colorOptions) {
    colorOptions[color].onclick = function() {
        selectedColor = this.innerHTML;
        selectedColorBox.style.backgroundColor = selectedColor;

        // if (this.innerHTML === 'Random')
        if (this.classList.contains('Random')) {
            let red = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);
            selectedColor = ["rgb(",red,",",green,",",blue,")"].join("");
            selectedColorBox.style.backgroundColor = selectedColor;
        }
    };
};


// Slider Event
slider.oninput = function() {
    sliderValue.innerHTML= this.value;
}

// Slider Event to create boxes
slider.onclick = function () {
    let divContainers = document.querySelectorAll('.boxes');

    for (let box of divContainers) {
        box.remove();
    };
    numRows = slider.value;
    createBoxes(numRows);
};
