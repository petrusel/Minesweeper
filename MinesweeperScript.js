const table = document.querySelector('table');
let nrRows = 9, nrColumns = 9, nrBombs = 10;
let gameOver = 0;

function drawTable() {
    for (let iRow = 0; iRow < nrRows; ++iRow) {
        let row = table.insertRow();
        for (let iCell = 0; iCell < nrColumns; ++iCell) {
            let cell = row.insertCell();
            let text = document.createTextNode('0');
            cell.appendChild(text);
        }
    }
}

drawTable();

function setBombs() {
    for (let iBomb = 0; iBomb <= nrRows; ++iBomb) {
        do {
            iRow = Math.floor(Math.random() * 9);
            iCell = Math.floor(Math.random() * 9);
        } while (isNaN(table.rows[iRow].cells[iCell].innerHTML));
        table.rows[iRow].cells[iCell].innerHTML = `<i class="las la-bomb" style="color: red;"></i>`;
    }
}

setBombs();

function setNeighbours() {
    for (let iRow = 0; iRow < nrRows; ++iRow) {
        for (let iCell = 0; iCell < nrColumns; ++iCell) {
            if (isNaN(table.rows[iRow].cells[iCell].innerHTML)) {
                console.log("bomba la " + iRow + " " + iCell);
                const iX = [-1, -1, -1, 0, 1, 1, 1, 0];
                const iY = [-1, 0, 1, 1, 1, 0, -1, -1];
                for (let index = 0; index < iX.length; ++index) {
                    if (iRow + iX[index] >= 0 && iRow + iX[index] < nrRows && iCell + iY[index] >= 0 && iCell + iY[index] < nrColumns && 
                        !isNaN(table.rows[iRow + iX[index]].cells[iCell + iY[index]].innerHTML)) {
                        let value = table.rows[iRow + iX[index]].cells[iCell + iY[index]].innerHTML;
                        table.rows[iRow + iX[index]].cells[iCell + iY[index]].innerHTML = ++value;
                    }
                }
            }
        }
    }
}

setNeighbours();

function setButtons() {
    for (let iRow = 0; iRow < nrRows; ++iRow) {
        for (let iCell = 0; iCell < nrColumns; ++iCell) {
            let btn = document.createElement("button");
            btn.className = "btn_cover";
            let icon = document.createElement("i");
            icon.className = "lab la-font-awesome-flag";
            icon.style = "color: darkgreen; font-size: 32px";
            btn.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if (btn.hasChildNodes()) {
                    btn.removeChild(icon);
                    document.getElementById("id_nrBombs_b").innerHTML = 'Bombs: ' + ++nrBombs;
                } else {
                    btn.appendChild(icon);
                    document.getElementById("id_nrBombs_b").innerHTML = 'Bombs: ' + --nrBombs;
                }
            }); 
            table.rows[iRow].cells[iCell].appendChild(btn);
        }
    }
}

setButtons();

document.querySelectorAll('td').forEach(e => e.addEventListener("click", function() {
    let x = e.parentNode.rowIndex, y = e.cellIndex;
    if (table.rows[x].cells[y].firstChild?.tagName?.toLowerCase() === 'i' && table.rows[x].cells[y].lastChild?.tagName?.toLowerCase() === 'button') {
        [...document.getElementsByClassName("btn_cover")].forEach(function(el) {
          if (el?.tagName?.toLowerCase() === 'button') {
            el.parentNode.removeChild(el);
          }
        });
        document.getElementById("id_startGame_btn").innerHTML = `<i class="las la-sad-tear" style="color: red;"></i>`;
        gameOver = 1;
    } else if (table.rows[x].cells[y].lastChild?.tagName?.toLowerCase() === 'button') {
        if (table.rows[x].cells[y].innerText == 0) {
            table.rows[x].cells[y].removeChild(table.rows[x].cells[y].lastChild);
            removeNullButtons(x, y);
        } else {
            table.rows[x].cells[y].removeChild(table.rows[x].cells[y].lastChild);
        }
    }
    if (document.querySelectorAll('.btn_cover').length == 10 && gameOver == 0) {
        document.getElementById('id_winner_h2').innerHTML = `<p>YOU WIN</p>`;
    }
}));

function removeNullButtons(x, y) {
    const iX = [-1, -1, -1, 0, 1, 1, 1, 0];
    const iY = [-1, 0, 1, 1, 1, 0, -1, -1];
    for (let index = 0; index < iX.length; ++index) {
        let xIndex = x + iX[index], yIndex = y + iY[index];
        if (xIndex >= 0 && xIndex < nrRows && yIndex >= 0 && yIndex < nrColumns && 
            table.rows[xIndex].cells[yIndex].lastChild?.tagName?.toLowerCase() === 'button') {
            if (table.rows[xIndex].cells[yIndex].innerText == 0) {
                table.rows[xIndex].cells[yIndex].removeChild(table.rows[xIndex].cells[yIndex].lastChild);
                removeNullButtons(xIndex, yIndex);
            } else {
                table.rows[xIndex].cells[yIndex].removeChild(table.rows[xIndex].cells[yIndex].lastChild);
            }
        }
    }
}

function startGame() {
    document.location.reload();
}


