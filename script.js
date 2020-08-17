window.onload = function() {
    document.getElementById("exec").addEventListener("click", execute);
    document.getElementById("circle").addEventListener("keyup", createCircles);
}

function createCircles() {
    clearDiv();
    var div = document.getElementById("position");
    var cir = document.getElementById("circle").value;
    var p = document.createElement("div");
    p.innerHTML = "Enter circle position(s) here";
    div.appendChild(p);
    if(isNaN(cir)) return;
    for(let i = 0; i < cir; i++) {
        createCircle(div, i);
    }
}

function clearDiv() {
    var node = document.getElementById("position").childNodes;
    for(let i = node.length - 1; i>= 0; i--) {
        document.getElementById("position").removeChild(node[i]);
    }
}

function getCircleList() {
    var list = [];
    let c = document.getElementById("circle").value;
    for(let i = 0; i < c; i++) {
        let x = document.getElementById("x-" + i).value;
        let y = document.getElementById("y-" + i).value;
        list.push([x, y]);
    }
    return list;
}

function createCircle(div, i) {
    var d = document.createElement("div");
    var x = document.createElement("input");
    x.id = "x-" + i;
    x.placeholder = "X"
    var y = document.createElement("input");
    y.id = "y-" + i;
    y.placeholder = "Y";
    d.appendChild(x);
    d.appendChild(y);
    div.appendChild(d);
}

function execute() {
    clearTable();
    clear_alert();
    var r = document.getElementById("row").value;
    var c = document.getElementById("col").value;
    var rad = document.getElementById("radius").value;
    if(isNaN(r) || isNaN(c)) {
        return;
    }
    var graph = setup(r, c);
    fill_circle(graph, rad, getCircleList());
    print(graph);
    setTimeout(() => {
        let path = isReachable(graph);
        paths(path, graph[0].length);
        set_alert(graph);
    }, 2000);
}

function clear_alert() {
    var err = document.getElementById("error");
    var suc = document.getElementById("success");
    err.style.display = "none";
    suc.style.display = "none";
}

function set_alert(graph) {
    var err = document.getElementById("error");
    var suc = document.getElementById("success");
    console.log(graph);
    if(graph[graph.length - 1][graph[0].length - 1] == -1) {
        suc.style.display = "block";
    } else {
        err.style.display = "block";
    }
}

function isReachable(graph) {
    var queue = [];
    var path = []
    if(graph[0][0] != 0) return path;
	queue.push([0, 0]);
		
    while(queue.length != 0) {
        let temp = queue[0];
        queue = queue.slice(1);
        if(temp[0] == graph.length-1 && temp[1] == graph[0].length-1) {
            if(graph[temp[0]][temp[1]] == 0) {
            graph[temp[0]][temp[1]] = -1;
            path.push([temp[0], temp[1]]);
            }
            return path;
        }
        graph[temp[0]][temp[1]] = -1;
        path.push([temp[0], temp[1]]);
        if(temp[0] - 1 >= 0 && graph[temp[0]-1][temp[1]] == 0) 
        queue.push([temp[0]-1, temp[1]]);
        if(temp[0] + 1 < graph.length && graph[temp[0]+1][temp[1]] == 0)
        queue.push([temp[0]+1, temp[1]]);
        if(temp[1] - 1 >= 0 && graph[temp[0]][temp[1]-1] == 0)
        queue.push([temp[0], temp[1]-1]);
        if(temp[1] + 1 < graph[0].length && graph[temp[0]][temp[1]+1] == 0)
        queue.push([temp[0], temp[1]+1]);
        
    }
    
    return path; 
}

function paths(path, len) {
    var td = document.getElementsByTagName("td");
    for(let i = 0; i < path.length; i++) {
        dot(path[i][0], path[i][1], len, td);
    }
}

function dot(x, y, len, td) {
    td[x*len + y].style.backgroundColor = "purple";
}

function setup(r, c) {
    let graph = [];
    for(let i = 0; i < r; i++) {
        let temp = [];
        for(let j = 0; j < c; j++) {
            temp.push(0);
        }
        graph.push(temp);
    }
    return graph;
}

function fill_circle(graph, r, circles) {
    fill(graph, r, circles, circles.length);
}

function fill(graph, r, x, k) {
    for (let i = 0; i < graph.length; i++) { 
        for (let j = 0; j < graph[i].length; j++) { 
          for (let p = 0; p < k; p++) { 
            if (Math.sqrt((Math.pow((x[p][0] - i), 2) +  
                Math.pow((x[p][1] - j), 2))) <= r)  
            { 
              graph[i][j] = 1; 
            } 
          } 
        } 
    } 
}

function clearTable() {
    var table = document.getElementById("table");
    var tableRows = table.getElementsByTagName('tr');
    for(let i = tableRows.length - 1; i >= 0; i--) {
        table.removeChild(tableRows[i]);
    }
}

function print(graph) {
    var table = document.getElementById("table");
    for(let i = 0; i < graph.length; i++) {
        let col = graph[i];
        let tr = document.createElement("tr");
        for(let j = 0; j < col.length; j++) {
            let td = document.createElement("td");
            if((i == 0 && j == 0) ||
            (i == graph.length - 1 && j == col.length - 1)) {
                td.style.backgroundColor = "black";
                tr.appendChild(td);
                continue;
            }
            if(col[j] === 0) {
            td.style.backgroundColor = "red";
            } 
            if(col[j] === 1) {
                td.style.backgroundColor = "green";
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}