function createPlayer(name, symbol) {
    return { name, symbol };
}

const firstPlayer = createPlayer("Player 1", "X");
const secondPlayer = createPlayer("Player 2", "O");

const Gameboard = (function() {
    const gameboard = document.getElementById("gameboard");

    const setRows = (rows) => {
        gameboard.innerHTML = "";
        for (i = 1; i < (rows**2)+1; i++) {
            const box = document.createElement("button");
            box.setAttribute("id", i);
            box.classList.add("box");
            if (i > 0 && i <= rows) {
                box.classList.add("row-1");
            } else if (i > rows && i <= rows*2) {
                box.classList.add("row-2");
            } else if (i > rows && i <= rows*3) {
                box.classList.add("row-3");
            } else if (i > rows && i <= rows*4) {
                box.classList.add("row-4");
            } else if (i > rows && i <= rows*5) {
                box.classList.add("row-5");
            } else if (i > rows && i <= rows*6) {
                box.classList.add("row-6");
            } else if (i > rows && i <= rows*7) {
                box.classList.add("row-7");
            }
            box.style.height = `${(548 / rows) - 2}px`;
            box.style.width = `${(548 / rows) - 2}px`;
            gameboard.appendChild(box);
        }
        gameboard.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
        gameboard.style.fontSize = `${(548 / (rows*2))}px`;
    };

    const selectBox = (box) => {
        if (box.classList.contains("box") && !(box.classList.contains("player-1") || box.classList.contains("player-2"))) {
            box.classList.add(GameController.getCurrentPlayer() === firstPlayer ? "player-1" : "player-2")
            box.textContent = GameController.getCurrentPlayer().symbol;
            GameController.playRound(box);
        }
    };

    const clearGameboard = () => {
        Array.from(gameboard.children).forEach((box) => {
            box.classList.remove("player-1", "player-2");
            box.textContent = "";
        });
        if (!(GameController.getCurrentPlayer() === firstPlayer)) GameController.playRound();
    };

    return {
        setRows,
        selectBox,
        clearGameboard,
    };
})();

const GameController = (function() {
    let currentPlayer = firstPlayer;

    const playRound = (box) => {
        try {
            if ((box.className === document.getElementById(Number(box.id)+1).className && box.className === document.getElementById(Number(box.id)+2).className)
                || (box.className === document.getElementById(Number(box.id)-1).className && box.className === document.getElementById(Number(box.id)+1).className)
                || (box.className === document.getElementById(Number(box.id)-2).className && box.className === document.getElementById(Number(box.id)-1).className)) {
                console.log("three in row");
            }
        } catch (e) {}

        currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
    };

    const getCurrentPlayer = () => currentPlayer;

    return {
        getCurrentPlayer,
        playRound,
    };
})();



Gameboard.setRows(4);

document.getElementById("gameboard").addEventListener("click", (e) => Gameboard.selectBox(e.target));
document.getElementById("clear-btn").addEventListener("click", () => Gameboard.clearGameboard());
document.getElementById("new-btn").addEventListener("click", () => {
    let rows = 0;
    while (!(rows >= 3 && rows < 8)) {
        rows = prompt("Insert number of rows (between 3 and 7)");
    }
    Gameboard.setRows(rows);
});