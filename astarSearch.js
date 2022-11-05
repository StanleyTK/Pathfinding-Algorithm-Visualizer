// A* Search Algorithm, no animation
function InstantAstar() {
    var queue = [[startX, startY]];

    var pathFound = false;
    var xLocation = startX;
    var yLocation = startY;

    var index = manhattan(queue);
    
    while (queue.length > 0 && !pathFound && !resetFunction) {

        var index = manhattan(queue);
        xLocation = queue[index][0];
        yLocation = queue[index][1];
        console.log(xLocation + " " + yLocation);
        console.log(index);

        console.log(queue); 
        queue.splice(index,1);
        console.log(queue);
  

        if (xLocation > 0 && tiles[xLocation - 1][yLocation].state == 'f') {
            pathFound = true;          
        }
        if (xLocation < tileColumnCount - 1 && tiles[xLocation + 1][yLocation].state == 'f') {
            pathFound = true;          
        }
        if (yLocation > 0 && tiles[xLocation][yLocation - 1].state == 'f') {
            pathFound = true;          
        }
        if (yLocation < tileRowCount - 1 && tiles[xLocation][yLocation + 1].state == 'f') {
            pathFound = true;          
        }


        if (xLocation > 0 && tiles[xLocation - 1][yLocation].state == 'e') {
            queue.push([xLocation-1, yLocation])
            tiles[xLocation - 1][yLocation].state = tiles[xLocation][yLocation].state + "l";
        }
        if (xLocation < tileColumnCount - 1 && tiles[xLocation + 1][yLocation].state == 'e') {
            queue.push([xLocation+1, yLocation])
          
            tiles[xLocation + 1][yLocation].state = tiles[xLocation][yLocation].state + "r";
        }
        if (yLocation > 0 && tiles[xLocation][yLocation - 1].state == 'e') {
            queue.push([xLocation, yLocation - 1])
            tiles[xLocation][yLocation - 1].state = tiles[xLocation][yLocation].state + "u";
        }
        if (yLocation < tileRowCount - 1 && tiles[xLocation][yLocation + 1].state == 'e') {
            queue.push([xLocation, yLocation + 1])
            tiles[xLocation][yLocation + 1].state = tiles[xLocation][yLocation].state + "d";
        }
    }
    if (!pathFound && !resetFunction) {
        output.innerHTML = 'No Solution';
    } else if (pathFound) {
        output.innerHTML = 'Success!';
        var path = tiles[xLocation][yLocation].state;
        var pathLength = path.length;
        var currX = startX;
        var currY = startY;

        for (var i = 0; i < pathLength - 1; i++) {
            if (path.charAt(i+1) == 'u') {
                currY -= 1;
            }
            if (path.charAt(i+1) == 'd') {
                currY += 1;
            }
            if (path.charAt(i+1) == 'r') {
                currX += 1;
            }
            if (path.charAt(i+1) == 'l') {
                currX -= 1;
            }
            tiles[currX][currY].state = 'x';

        }
    }
}



async function Astar(speed) {
    var queue = [[startX, startY]];

    var pathFound = false;
    var xLocation = startX;
    var yLocation = startY;

    var index = manhattan(queue);
    
    while (queue.length > 0 && !pathFound && !resetFunction) {

        var index = manhattan(queue);
        xLocation = queue[index][0];
        yLocation = queue[index][1];
        console.log(xLocation + " " + yLocation);
        console.log(index);

        console.log(queue);
        queue.splice(index,1);
        console.log(queue);
  

        if (xLocation > 0 && tiles[xLocation - 1][yLocation].state == 'f') {
            pathFound = true;          
        }
        if (xLocation < tileColumnCount - 1 && tiles[xLocation + 1][yLocation].state == 'f') {
            pathFound = true;          
        }
        if (yLocation > 0 && tiles[xLocation][yLocation - 1].state == 'f') {
            pathFound = true;          
        }
        if (yLocation < tileRowCount - 1 && tiles[xLocation][yLocation + 1].state == 'f') {
            pathFound = true;          
        }


        if (xLocation > 0 && tiles[xLocation - 1][yLocation].state == 'e') {
            queue.push([xLocation-1, yLocation])
            tiles[xLocation - 1][yLocation].state = tiles[xLocation][yLocation].state + "l";
        }
        if (xLocation < tileColumnCount - 1 && tiles[xLocation + 1][yLocation].state == 'e') {
            queue.push([xLocation+1, yLocation])
          
            tiles[xLocation + 1][yLocation].state = tiles[xLocation][yLocation].state + "r";
        }
        if (yLocation > 0 && tiles[xLocation][yLocation - 1].state == 'e') {
            queue.push([xLocation, yLocation - 1])
            tiles[xLocation][yLocation - 1].state = tiles[xLocation][yLocation].state + "u";
        }
        if (yLocation < tileRowCount - 1 && tiles[xLocation][yLocation + 1].state == 'e') {
            queue.push([xLocation, yLocation + 1])
            tiles[xLocation][yLocation + 1].state = tiles[xLocation][yLocation].state + "d";
        }
        await sleep(speed);
    }
    if (!pathFound && !resetFunction) {
        output.innerHTML = 'No Solution';
    } else if (pathFound) {
        output.innerHTML = 'Success!';
        var path = tiles[xLocation][yLocation].state;
        var pathLength = path.length;
        var currX = startX;
        var currY = startY;

        for (var i = 0; i < pathLength - 1; i++) {
            if (path.charAt(i+1) == 'u') {
                currY -= 1;
            }
            if (path.charAt(i+1) == 'd') {
                currY += 1;
            }
            if (path.charAt(i+1) == 'r') {
                currX += 1;
            }
            if (path.charAt(i+1) == 'l') {
                currX -= 1;
            }
            tiles[currX][currY].state = 'x';
            await sleep(20);

        }
    }
}

function manhattan(queue) {
    var biggestIndex = 0;
    for (var i = 0; i < queue.length; i++) {
        if (queue[i][0] + queue[i][1] > queue[biggestIndex][0] + queue[biggestIndex][1]) {
            biggestIndex = i;
        }
    }

    return biggestIndex;
}


