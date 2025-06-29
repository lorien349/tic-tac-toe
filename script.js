function createPlayer(name, symbol) {
    return { name, symbol };
}

const firstPlayer = createPlayer("Player 1", "X");
const secondPlayer = createPlayer("Player 2", "O");

const Gameboard = (function() {
    const gameboard = document.getElementById("gameboard");

    let rows = 4;

    const getRows = () => rows;
    const setRows = (n) => rows = n;

    const buidGameboard = (rows) => {
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
        buidGameboard,
        selectBox,
        clearGameboard,
        setRows,
        getRows,
    };
})();

const GameController = (function() {
    let currentPlayer = firstPlayer;

    const playRound = (box) => {
        let cls = currentPlayer === firstPlayer ? "player-1" : "player-2";
        try {
            if ((box.className === document.getElementById(Number(box.id)+1).className && box.className === document.getElementById(Number(box.id)+2).className)
                || (box.className === document.getElementById(Number(box.id)-1).className && box.className === document.getElementById(Number(box.id)+1).className)
                || (box.className === document.getElementById(Number(box.id)-2).className && box.className === document.getElementById(Number(box.id)-1).className)) {
                    WinScreen.open("row", currentPlayer.name);
            }
        } catch (e) {}

        try {
            if ((box.classList.contains(cls) && document.getElementById(Number(box.id)+Gameboard.getRows()).classList.contains(cls) && document.getElementById(Number(box.id)+(Gameboard.getRows())*2).classList.contains(cls))
                || (box.classList.contains(cls) && document.getElementById(Number(box.id)-Gameboard.getRows()).classList.contains(cls) && document.getElementById(Number(box.id)+(Gameboard.getRows())).classList.contains(cls))
                || (box.classList.contains(cls) && document.getElementById(Number(box.id)-Gameboard.getRows()).classList.contains(cls) && document.getElementById(Number(box.id)-(Gameboard.getRows())*2).classList.contains(cls))) {
                    WinScreen.open("column", currentPlayer.name);
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

const WinScreen = (function() {
    const winScreen = document.getElementById("win-screen");
    const winText = document.getElementById("win-text");
    const winPlayer = document.getElementById("win-player");

    const open = (winMethod, winner) => {
        winText.textContent = `Three in ${winMethod}!!!`;
        winPlayer.textContent = `${winner} wins`
        winScreen.showModal();
    };

    const close = () => {
        Gameboard.clearGameboard();
        winScreen.close();
    };

    return {
        open,
        close,
    }
})();



Gameboard.buidGameboard(Gameboard.getRows());

document.getElementById("gameboard").addEventListener("click", (e) => Gameboard.selectBox(e.target));
document.getElementById("clear-btn").addEventListener("click", () => Gameboard.clearGameboard());
document.getElementById("new-btn").addEventListener("click", () => {
    let rows = 0;
    while (!(rows >= 3 && rows < 8)) {
        rows = prompt("Insert number of rows (between 3 and 7)");
    }
    Gameboard.setRows(rows);
    Gameboard.buidGameboard(Gameboard.getRows());
});
document.getElementById("restart-btn").addEventListener("click", () => WinScreen.close());