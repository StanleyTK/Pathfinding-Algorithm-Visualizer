// Dijkstra Algorithm, no animation
function InstantDijkstraAlgorithm() {
    console.log(startX + " " + startY);
    var Xqueue = [startX];
    var Yqueue = [startY];

    var pathFound = false;
    var xLocation = startX;
    var yLocation = startY;
    
    while (Xqueue.length > 0 && !pathFound && !resetFunction) {
        xLocation = Xqueue.shift();
        yLocation = Yqueue.shift();
        console.log(xLocation + " " + yLocation);
  

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
            Xqueue.push(xLocation - 1);
            Yqueue.push(yLocation);
            tiles[xLocation - 1][yLocation].state = tiles[xLocation][yLocation].state + "l";
        }
        if (xLocation < tileColumnCount - 1 && tiles[xLocation + 1][yLocation].state == 'e') {
            Xqueue.push(xLocation + 1);
            Yqueue.push(yLocation);
            tiles[xLocation + 1][yLocation].state = tiles[xLocation][yLocation].state + "r";
        }
        if (yLocation > 0 && tiles[xLocation][yLocation - 1].state == 'e') {
            Xqueue.push(xLocation);
            Yqueue.push(yLocation - 1);
            tiles[xLocation][yLocation - 1].state = tiles[xLocation][yLocation].state + "u";
        }
        if (yLocation < tileRowCount - 1 && tiles[xLocation][yLocation + 1].state == 'e') {
            Xqueue.push(xLocation);
            Yqueue.push(yLocation + 1);
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




async function DijkstraAlgorithm(speed) {
    console.log(startX + " " + startY);
    var Xqueue = [startX];
    var Yqueue = [startY];

    var pathFound = false;
    var xLocation = startX;
    var yLocation = startY;
    
    while (Xqueue.length > 0 && !pathFound && !resetFunction) {
        xLocation = Xqueue.shift();
        yLocation = Yqueue.shift();
  

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
            Xqueue.push(xLocation - 1);
            Yqueue.push(yLocation);
            tiles[xLocation - 1][yLocation].state = tiles[xLocation][yLocation].state + "l";
        }
        if (xLocation < tileColumnCount - 1 && tiles[xLocation + 1][yLocation].state == 'e') {
            Xqueue.push(xLocation + 1);
            Yqueue.push(yLocation);
            tiles[xLocation + 1][yLocation].state = tiles[xLocation][yLocation].state + "r";
        }
        if (yLocation > 0 && tiles[xLocation][yLocation - 1].state == 'e') {
            Xqueue.push(xLocation);
            Yqueue.push(yLocation - 1);
            tiles[xLocation][yLocation - 1].state = tiles[xLocation][yLocation].state + "u";
        }
        if (yLocation < tileRowCount - 1 && tiles[xLocation][yLocation + 1].state == 'e') {
            Xqueue.push(xLocation);
            Yqueue.push(yLocation + 1);
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
