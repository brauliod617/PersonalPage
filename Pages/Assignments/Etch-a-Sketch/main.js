const gridContainer = document.getElementById('gridContainer')
const grids = document.createElement("div");
const rainbowBtnDiv = document.createElement("div");
const clearBtnDiv = document.createElement("div");
const rainbowBtn = document.createElement('button');
const clearBtn = document.createElement('button');
const buttonsDiv = document.createElement("div");
let isRainbowMode = false;

clearBtn.textContent = "Clear Sketch";
rainbowBtn.textContent = "Rainbow Mode";
clearBtn.setAttribute("id", "clearBtn");
rainbowBtn.setAttribute("id", "rainbowBtn");
clearBtnDiv.classList.add("buttons");
rainbowBtnDiv.classList.add("buttons");
grids.setAttribute("id", "grid");
buttonsDiv.classList.add("buttonDiv");
clearBtnDiv.appendChild(clearBtn);
rainbowBtnDiv.appendChild(rainbowBtn);
buttonsDiv.appendChild(rainbowBtnDiv);
buttonsDiv.appendChild(clearBtnDiv);
gridContainer.appendChild(grids);
gridContainer.appendChild(buttonsDiv);
document.body.appendChild(gridContainer);

function generateGrids(x){
    for(let i = 0; i < x; i++){
        for(let y = 0; y < x; y++){
            let grid = document.createElement('div');
            grid.addEventListener('mouseover', pixalate);
            grid.classList.add('grid');
            grid.style.backgroundColor = 'white';
            grid.style.filter = 'brightness(100%)';
            grids.appendChild(grid);
        }
    }
}
generateGrids(16);

function pixalate(){
    if(isRainbowMode){
        //if grid is either black or white we paint it random color
        if(this.style.backgroundColor === 'white' || this.style.backgroundColor === 'black'){
            let random = Math.floor((Math.random() * 7));
            switch (random) {
                case 0:
                    this.style.backgroundColor = "rgb(238,82,238)";//violet
                    break;
                case 1:
                    this.style.backgroundColor = "rgb(75,00,82)";//indigo
                    break;
                case 2:
                    this.style.backgroundColor = "rgb(00,00,255)";//blue
                    break;
                case 3:
                    this.style.backgroundColor = "rgb(00,80,00)";//green
                    break;
                case 4:
                    this.style.backgroundColor = "rgb(255,255,00)";//yellow
                    break;
                case 5:
                    this.style.backgroundColor = "rgb(255,165,00)";//orange
                    break;
                case 6:
                    this.style.backgroundColor = "rgb(255,00,00)";//red
                    break;
            }
        }else {//if grid is a color, we darken that color by 10%
            let indexOfClosingBrace = this.style.filter.indexOf(')', 10);
            let brightnessStr = this.style.filter.substring(11, indexOfClosingBrace-1);
            this.style.filter = 'brightness(' + (brightnessStr - 10) + "%)";
        }
    }else {//if rainbow button is unclicked
        this.style.backgroundColor = "black";
    }
}

clearBtn.addEventListener('click', clearScreen);
rainbowBtn.addEventListener('click', rainbowMode);

function rainbowMode(){
    isRainbowMode = !isRainbowMode;
}
function clearScreen(){
    let children = grids.childNodes;
    let input = prompt("How many squares per side would you like on new grid?");
    let regex = /^[0-9]+$/;

    while(!input.match(regex)){
       input = prompt("please enter a numerical value");
    }
    //need to erase current grids other wise new grids are just append to grids div
    eraseGrids();

    //divide by 480 so size of etch-a-sketch remains the same
    //gridTemplateRows = repeat( # of rows, grid size, name)
    //change css setting for grids div, grids div is parent of grid, where each grid is child
    grids.style.gridTemplateRows = "repeat(" +
     input + ", " + 480/input + "px [row-start]";
    grids.style.gridTemplateColumns = "repeat(" +
     input + ", " + 480/input + "px [col-start]";

    generateGrids(input);
    //set the width and height of each grid div to match that of grid element
    for(let i = 0; i < grids.childElementCount; i++ ){
        children[i].style.width = (480/input).toString() + "px";
        children[i].style.height = (480/input).toString() + "px";
    }
}

function eraseGrids(){
    let count = grids.childElementCount;
    for(let i = 0; i < count; i++){
        grids.removeChild(grids.children[0]);
    }
}

