let matrix = [
    [],
    [],
    [],
    [],
    [],
    []
]

let gameTable = document.getElementById("gameTable");
let flag = true;

function generateTable() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            let casella = document.createElement("div");
            casella.className += "divs";
            casella.id +=  i + " " + j;
            matrix[i][j] = casella;
            casella.addEventListener("click", play);
            gameTable.appendChild(casella);
			casella.style.backgroundColor = "#0a0908ff";
        }
    }
}

function play() {
    const pos = this.id.split(" ");
    const row = parseInt(pos[0]);
    const col = parseInt(pos[1]);

    if (!checkWin() && flag == true) {
        if (row === 5 || matrix[row + 1][col].style.backgroundColor === "rgb(227, 23, 10)" || matrix[row + 1][col].style.backgroundColor === "rgb(255, 149, 5)") {
            // Verifica se la casella corrente è già selezionata
			
            if (this.style.backgroundColor === "rgb(10, 9, 8)") {
                this.style.backgroundColor = "rgb(227, 23, 10)";
                if (!checkWin()) {
					flag = false;
					setTimeout(function(){
						computerTurn();
					}, 500);
                } else {
                    let output = document.getElementById("playerScore");
                    output.textContent++;
                    createButton();
                }
            } else {
                console.log("Questa casella è già selezionata.");
            }
        } else {
            console.log("Non puoi selezionare questa casella.");
        }
    }
}

function computerTurn() {
    let i = Math.round(Math.random() * 5);
    let j = Math.round(Math.random() * 6);

    while (i < 5 && (matrix[i][j].style.backgroundColor === "rgb(227, 23, 10)" || matrix[i][j].style.backgroundColor === "rgb(255, 149, 5)" || matrix[i + 1][j].style.backgroundColor === "rgb(10, 9, 8)")) {
        i = Math.round(Math.random() * 5);
        j = Math.round(Math.random() * 6);
    }

    if (matrix[i][j].style.backgroundColor === "rgb(10, 9, 8)") {
        matrix[i][j].style.backgroundColor = "rgb(255, 149, 5)";
    } else {
        computerTurn();
    }

    if (checkWin()) {
        let output = document.getElementById("computerScore");
        output.textContent++;
    }
	flag = true;
}

/*function clear() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            matrix[i][j].style.backgroundColor = "#0a0908ff";
        }
    }
    let scores = document.getElementById("scores");
    document.getElementById("newGameButton").remove();
}*/

function checkWin() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (
                matrix[i][j].style.backgroundColor !== "rgb(10, 9, 8)" /*#0a0908ff*/ &&
                matrix[i][j].style.backgroundColor === matrix[i][j + 1].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i][j + 2].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i][j + 3].style.backgroundColor
            ) {
                //console.log("Vittoria in orizzontale");
                return true;
            }
        }
    }

    // Controlla vittoria in verticale
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 7; j++) {
            if (
                matrix[i][j].style.backgroundColor !== "rgb(10, 9, 8)" &&
                matrix[i][j].style.backgroundColor === matrix[i + 1][j].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i + 2][j].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i + 3][j].style.backgroundColor
            ) {
                //console.log("Vittoria in verticale");
                return true;
            }
        }
    }

    // Controlla vittoria in diagonale (verso sinistra)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (
                matrix[i][j].style.backgroundColor !== "rgb(10, 9, 8)" &&
                matrix[i][j].style.backgroundColor === matrix[i + 1][j + 1].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i + 2][j + 2].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i + 3][j + 3].style.backgroundColor
            ) {
                //console.log("Vittoria in diagonale (verso sinistra)");
                return true;
            }
        }
    }

    // Controlla vittoria in diagonale (verso destra)
    for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 7; j++) {
            if (
                matrix[i][j].style.backgroundColor !== "rgb(10, 9, 8)" &&
                matrix[i][j].style.backgroundColor === matrix[i + 1][j - 1].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i + 2][j - 2].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i + 3][j - 3].style.backgroundColor
            ) {
                //console.log("Vittoria in diagonale (verso destra)");
                return true;
            }
        }
    }

    // Nessuna vittoria
    return false;
}

function rematch() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            matrix[i][j].style.backgroundColor = "#0a0908ff";
        }
    }
}

function newGame() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            matrix[i][j].style.backgroundColor = "#0a0908ff";
        }
    }

    let output = document.getElementById("playerScore");
    output.textContent = 0;

    output = document.getElementById("computerScore");
    output.textContent = 0;
}