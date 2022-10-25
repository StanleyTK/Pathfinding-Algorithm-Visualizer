
var canvas;
var ctx;
var WIDTH = 1200;
var HEIGHT = 800;

tileW = 20;
tileH = 20;

tileRowCount = 25;
tileColumnCount = 43;

dragok = false;
boundX = 0;
boundY = 0;
endPoints = false;
endPoint = false;
resetFunction = false;
beginningPoint = false;

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}


var tiles = [];
for (i = 0; i < tileColumnCount; i++) {
    tiles[i] = [];
    for (j = 0; j < tileRowCount; j++) {
        tiles[i][j] = {x: i*(tileW + 3), y: j*(tileH + 3), state: 'e'};  //state e for empty
    }
}

startX = 0;
startY = 0;
endX = tileColumnCount - 1;
endY = tileRowCount - 1;


tiles[startX][startY].state = 's';
tiles[endX][endY].state = 'f';

function rect(x,y,w,h,state) {
    if (state == 's') {
        ctx.fillStyle = '#00FF00'; //start
    } else if (state == 'f') {
        ctx.fillStyle = '#FF0000'; //finish
    } else if (state == 'e') {
        ctx.fillStyle = '#AAAAAA'; //White, not used
    } else if (state == 'w') {
        ctx.fillStyle = '#0000FF'; //blue, walls
    } else if (state == 'x') {
        ctx.fillStyle = '#000000'; //black, way to find
    } else {
        ctx.fillStyle = '#FFFF00'; //Yellow
    }

    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}

function clear() {
    ctx.clearRect(0,0,WIDTH,HEIGHT);
}

function draw() {
    clear();    
    for (i = 0; i < tileColumnCount; i++) {
        for (j = 0; j < tileRowCount; j++) {
            rect(tiles[i][j].x, tiles[i][j].y, tileW, tileH, tiles[i][j].state);
        }
    }
}





async function solveMaze() {

    resetFunction = false;
    let option = document.getElementById("select-algorithm").value;
    console.log(option);
    var speed = document.getElementById("speed").value;
    console.log(speed);
    if (speed == "Fastest") speed = 5;
    else if (speed == "Instant") speed = -1;
    else if (speed == "Fast") speed = 15;
    else if (speed == "Average") speed = 30;
    else if (speed == "Slow") speed = 50;
    else if (speed = "Slowest") speed = 100;
    
    console.log(speed);


    if (option == "Dijkstra's algorithm") {
        if (speed == -1) {
            InstantDijkstraAlgorithm();
        }
        else {
            DijkstraAlgorithm(speed);
        }
    } else if (option == "A* Search") {
        if (speed == -1) {
            InstantAstar();
        }
        else {
            Astar(speed);
        }
    }

}




function resetNoWalls() {
    for (i = 0; i < tileColumnCount; i++) {
        tiles[i] = [];
        for (j = 0; j < tileRowCount; j++) {
            // if (tiles[i][j].state != s tiles[i][j].state != s)
            tiles[i][j] = {x: i*(tileW + 3), y: j*(tileH + 3), state: 'e'};  //state e for empty
        }
    }
}


function reset() {
    resetFunction = true;
    for (i = 0; i < tileColumnCount; i++) {
        tiles[i] = [];
        for (j = 0; j < tileRowCount; j++) {
            tiles[i][j] = {x: i*(tileW + 3), y: j*(tileH + 3), state: 'e'};  //state e for empty
        }
    }
    
    tiles[0][0].state = 's';
    tiles[tileColumnCount - 1][tileRowCount - 1].state = 'f';
    output.innerHTML = "";
    startX = 0;
    startY = 0;
    endX = tileColumnCount - 1;
    endY = tileRowCount - 1;

    document.getElementById("select-algorithm").selectedIndex = 0;;
}

function resetNoEndPoints() {
    resetFunction = true;
    for (i = 0; i < tileColumnCount; i++) {
        tiles[i] = [];
        for (j = 0; j < tileRowCount; j++) {
            tiles[i][j] = {x: i*(tileW + 3), y: j*(tileH + 3), state: 'e'};  //state e for empty
        }
    }


    document.getElementById("select-algorithm").selectedIndex = 0;;
}


function changeEndPoints() {
    resetNoEndPoints();
  
    endPoints = true;
    beginningPoint = true;
    
}


function init() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    output = document.getElementById("outcome");
    return setInterval(draw, 1);
}

function myMove(e) {
    x = e.pageX - canvas.offsetLeft;
    y = e.pageY - canvas.offsetTop;
    output.innerHTML = "";

      
    if (beginningPoint && endPoints) {
        output.innerHTML = "Select your beginning point";

        for (i = 0; i < tileColumnCount; i++) {
            for (j = 0; j < tileRowCount; j++) {
                if (i*(tileW+3) < x && x < i*(tileW+3)+tileW && j*(tileH+3) < y && y < j*(tileH+3) + tileH) {
                    if (tiles[i][j].state == "e" && (i != boundX || j != boundY)) {
                        tiles[i][j].state = "s";
                        boundX = i;
                        boundY = j;
                        beginningPoint = false;
                        endPoint = true;
                        startX = i;
                        startY = j;
                        
                    }
                }

            }
        }
    }
    if (endPoint && endPoints) {
        output.innerHTML = "Select your end point";

        for (i = 0; i < tileColumnCount; i++) {
            for (j = 0; j < tileRowCount; j++) {
                if (i*(tileW+3) < x && x < i*(tileW+3)+tileW && j*(tileH+3) < y && y < j*(tileH+3) + tileH) {
                    if (tiles[i][j].state == "e" && (i != boundX || j != boundY)) {
                        tiles[i][j].state = "f";
                        boundX = i;
                        boundY = j;
                        endPoints = false;
                        endPoint = false;
                        output.innerHTML = "";
                        endX = i;
                        endY = j;

                    }
                }

            }

        }
    }


    for (i = 0; i < tileColumnCount; i++) {
        for (j = 0; j < tileRowCount; j++) {
            if (i*(tileW+3) < x && x < i*(tileW+3)+tileW && j*(tileH+3) < y && y < j*(tileH+3) + tileH) {
                if (tiles[i][j].state == "e" && (i != boundX || j != boundY)) {
                    tiles[i][j].state = "w";
                    boundX = i;
                    boundY = j;
                }
                else if (tiles[i][j].state == "w" && (i != boundX || j != boundY)) {
                    tiles[i][j].state = "e";
                    boundX = i;
                    boundY = j;
                }
            }

        }
    }
}

function myDown(e) {
    canvas.onmousemove = myMove;
    x = e.pageX - canvas.offsetLeft;
    y = e.pageY - canvas.offsetTop;


    
    if (beginningPoint && endPoints) {
        output.innerHTML = "Select your beginning point";
        for (i = 0; i < tileColumnCount; i++) {
            for (j = 0; j < tileRowCount; j++) {
                if (i*(tileW+3) < x && x < i*(tileW+3)+tileW && j*(tileH+3) < y && y < j*(tileH+3) + tileH) {
                    if (tiles[i][j].state == "e" && (i != boundX || j != boundY)) {
                        tiles[i][j].state = "s";
                        boundX = i;
                        boundY = j;
                        beginningPoint = false;
                        endPoint = true;
                        startX = i;
                        startY = j;
                        console.log(i + " " + j);
                        console.log(startX + " " + startY);
                    }
                }

            }
        }
    } 
    if (endPoint && endPoints) {
        output.innerHTML = "Select your end point";

        for (i = 0; i < tileColumnCount; i++) {
            for (j = 0; j < tileRowCount; j++) {
                if (i*(tileW+3) < x && x < i*(tileW+3)+tileW && j*(tileH+3) < y && y < j*(tileH+3) + tileH) {
                    if (tiles[i][j].state == "e" && (i != boundX || j != boundY)) {
                        tiles[i][j].state = "f";
                        boundX = i;
                        boundY = j;
                        endPoints = false;
                        endPoint = false;
                        output.innerHTML = "";
                        endX = i;
                        endY = j;

                    }
                }

            }

        }
    }
    if (!endPoint) {
        for (i = 0; i < tileColumnCount; i++) {
            for (j = 0; j < tileRowCount; j++) {
                if (i*(tileW+3) < x && x < i*(tileW+3)+tileW && j*(tileH+3) < y && y < j*(tileH+3) + tileH) {
                    if (tiles[i][j].state == "e") {
                        tiles[i][j].state = "w";
                        boundX = i;
                        boundY = j;
                    }
                    else if (tiles[i][j].state == "w") {
                        tiles[i][j].state = "e";
                        boundX = i;
                        boundY = j;
                    }
                }

            }
        }
    }
}

function myUp() {
    canvas.onmousemove = null;
}

init();
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
