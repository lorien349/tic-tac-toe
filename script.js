function createPlayer(name, symbol) {
    return { name, symbol };
}

const firstPlayer = createPlayer("Player 1", "X");
const secondPlayer = createPlayer("Player 2", "O");

const Gameboard = (function() {
    const gameboard = document.getElementById("gameboard");

    const setRows = (rows) => {
        gameboard.innerHTML = "";
        for (i = 0; i < rows**2; i++) {
            const box = document.createElement("button");
            box.classList.add("box");
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
            GameController.playRound();
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

    const playRound = () => {
        currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
    };

    const getCurrentPlayer = () => currentPlayer;

    return {
        getCurrentPlayer,
        playRound,
    };
})();



Gameboard.setRows(7);

document.getElementById("gameboard").addEventListener("click", (e) => Gameboard.selectBox(e.target));
document.getElementById("clear-btn").addEventListener("click", () => Gameboard.clearGameboard());
document.getElementById("new-btn").addEventListener("click", () => {
    let rows = 0;
    while (!(rows >= 3 && rows < 8)) {
        rows = prompt("Insert number of rows (between 3 and 7)");
    }
    Gameboard.setRows(rows);
});