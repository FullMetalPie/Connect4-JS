let matrix = [
    [],
    [],
    [],
    [],
    [],
    []
]

let gameTable = document.getElementById("gameTable");

function generateTable() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            let casella = document.createElement("div");
            casella.className += "divs";
            casella.id +=  i + " " + j;
            matrix[i][j] = casella;
            casella.addEventListener("click", play);
            gameTable.appendChild(casella);
        }
    }
}

function play() {
    const pos = this.id.split(" ");
    const row = parseInt(pos[0]);
    const col = parseInt(pos[1]);

    if (!checkWin()) {
        if (row === 5 || matrix[row + 1][col].style.backgroundColor === "red" || matrix[row + 1][col].style.backgroundColor === "yellow") {
            // Verifica se la casella corrente è già selezionata
            if (this.style.backgroundColor === "") {
                this.style.backgroundColor = "red";
                if (!checkWin()) {
                    computerTurn();
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

    while (i < 5 && (matrix[i][j].style.backgroundColor === "red" || matrix[i][j].style.backgroundColor === "yellow" || matrix[i + 1][j].style.backgroundColor === "")) {
        i = Math.round(Math.random() * 5);
        j = Math.round(Math.random() * 6);
    }

    if (matrix[i][j].style.backgroundColor === "") {
        matrix[i][j].style.backgroundColor = "yellow";
    } else {
        computerTurn();
    }

    if (checkWin()) {
        let output = document.getElementById("computerScore");
        output.textContent++;
        createButton();
    }
}

function createButton() {
    let newGameButton = document.createElement("div");
    newGameButton.innerHTML = "New Game";
    let scores = document.getElementById("scores");
    scores.appendChild(newGameButton);
    newGameButton.addEventListener("click", clear);
    newGameButton.id += "newGameButton";
}

function clear() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            matrix[i][j].style.backgroundColor = "";
        }
    }
    let scores = document.getElementById("scores");
    document.getElementById("newGameButton").remove();
}

function checkWin() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (
                matrix[i][j].style.backgroundColor !== "" &&
                matrix[i][j].style.backgroundColor === matrix[i][j + 1].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i][j + 2].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i][j + 3].style.backgroundColor
            ) {
                console.log("Vittoria in orizzontale");
                return true;
            }
        }
    }

    // Controlla vittoria in verticale
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 7; j++) {
            if (
                matrix[i][j].style.backgroundColor !== "" &&
                matrix[i][j].style.backgroundColor === matrix[i + 1][j].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i + 2][j].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i + 3][j].style.backgroundColor
            ) {
                console.log("Vittoria in verticale");
                return true;
            }
        }
    }

    // Controlla vittoria in diagonale (verso sinistra)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (
                matrix[i][j].style.backgroundColor !== "" &&
                matrix[i][j].style.backgroundColor === matrix[i + 1][j + 1].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i + 2][j + 2].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i + 3][j + 3].style.backgroundColor
            ) {
                console.log("Vittoria in diagonale (verso sinistra)");
                return true;
            }
        }
    }

    // Controlla vittoria in diagonale (verso destra)
    for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 7; j++) {
            if (
                matrix[i][j].style.backgroundColor !== "" &&
                matrix[i][j].style.backgroundColor === matrix[i + 1][j - 1].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i + 2][j - 2].style.backgroundColor &&
                matrix[i][j].style.backgroundColor === matrix[i + 3][j - 3].style.backgroundColor
            ) {
                console.log("Vittoria in diagonale (verso destra)");
                return true;
            }
        }
    }

    // Nessuna vittoria
    return false;
}