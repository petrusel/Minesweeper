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
            cell.onclick = (function() { 
                if(isNaN(cell.innerHTML)) {
                    console.log("BOMBA -> game over");
                    [...document.getElementsByClassName("btn_cover")].forEach(function(el) {
                        el.parentNode.removeChild(el); });
                    document.getElementById("id_startGame_btn").innerHTML = `<i class="las la-sad-tear" style="color: red;"></i>`;
                    gameOver = 1;
                } 
            });
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
        console.log(iRow + " " + iCell);
    }
}

setBombs();

function setNeighbours() {
    for (let iRow = 0; iRow < nrRows; ++iRow) {
        for (let iCell = 0; iCell < nrColumns; ++iCell) {
            if (isNaN(table.rows[iRow].cells[iCell].innerHTML)) {
                console.log("bomba la " + iRow + " " + iCell);
                if (iRow - 1 >= 0 && iCell - 1 >= 0 && !isNaN(table.rows[iRow-1].cells[iCell-1].innerHTML)) {
                    //stanga sus
                    let value = table.rows[iRow-1].cells[iCell-1].innerHTML;
                    table.rows[iRow-1].cells[iCell-1].innerHTML = ++value;
                }
                if (iRow - 1 >= 0 && !isNaN(table.rows[iRow-1].cells[iCell].innerHTML)) {
                    //sus
                    let value = table.rows[iRow-1].cells[iCell].innerHTML;
                    table.rows[iRow-1].cells[iCell].innerHTML = ++value;
                }
                if (iRow - 1 >= 0 && iCell + 1 < nrColumns && !isNaN(table.rows[iRow-1].cells[iCell+1].innerHTML)) {
                    //dreapta sus
                    let value = table.rows[iRow-1].cells[iCell+1].innerHTML;
                    table.rows[iRow-1].cells[iCell+1].innerHTML = ++value;
                }
                if (iCell + 1 < nrColumns && !isNaN(table.rows[iRow].cells[iCell+1].innerHTML)) {
                    //dreapta
                    let value = table.rows[iRow].cells[iCell+1].innerHTML;
                    table.rows[iRow].cells[iCell+1].innerHTML = ++value;
                }
                if (iRow + 1 < nrRows && iCell + 1 < nrColumns && !isNaN(table.rows[iRow+1].cells[iCell+1].innerHTML)) {
                    //dreapta jos
                    let value = table.rows[iRow+1].cells[iCell+1].innerHTML;
                    table.rows[iRow+1].cells[iCell+1].innerHTML = ++value;
                }
                if (iRow + 1 < nrRows && !isNaN(table.rows[iRow+1].cells[iCell].innerHTML)) {
                    //jos
                    let value = table.rows[iRow+1].cells[iCell].innerHTML;
                    table.rows[iRow+1].cells[iCell].innerHTML = ++value;
                }
                if (iRow + 1 < nrRows && iCell - 1 >= 0 && !isNaN(table.rows[iRow+1].cells[iCell-1].innerHTML)) {
                    //stanga jos
                    let value = table.rows[iRow+1].cells[iCell-1].innerHTML;
                    table.rows[iRow+1].cells[iCell-1].innerHTML = ++value;
                }
                if (iCell - 1 >= 0 && !isNaN(table.rows[iRow].cells[iCell-1].innerHTML)) {
                    //stanga
                    let value = table.rows[iRow].cells[iCell-1].innerHTML;
                    table.rows[iRow].cells[iCell-1].innerHTML = ++value;
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
            icon.style = "color: green; font-size: 32px";
            btn.onclick = (function() { 
                btn.parentNode.removeChild(btn);
                if (document.querySelectorAll('.btn_cover').length == 10 && gameOver == 0) {
                    document.getElementById('id_winner_h2').innerHTML = `<p>YOU WIN</p>`;
                }
            });
            btn.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                console.log("rightClick");
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

function startGame() {
    document.location.reload();
}


