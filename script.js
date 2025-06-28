const PlayerController = (function() {
    const firstPlayer = {
        name: "Player 1",
        symbol: "X",
    };

    const secondPlayer = {
        name: "Player 2",
        symbol: "O",
    };

    const setFirstPlayer = (name, symbol) => {
        firstPlayer.name = name;
        firstPlayer.symbol = symbol;
    };
    const setSecondPlayer = (name, symbol) => {
        secondPlayer.name = name;
        secondPlayer. symbol = symbol;
    };

    const getFirstPlayer = () => firstPlayer;
    const getSecondPlayer = () => secondPlayer;

    return {
        setFirstPlayer,
        setSecondPlayer,
        getFirstPlayer,
        getSecondPlayer,
    };
})();



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
            box.classList.add(GameController.getCurrentPlayer() === PlayerController.getFirstPlayer() ? "player-1" : "player-2")
            box.textContent = GameController.getCurrentPlayer().symbol;
            GameController.playRound();
        }
    };

    const clearGameboard = () => {
        Array.from(gameboard.children).forEach((box) => {
            box.classList.remove("player-1", "player-2");
            box.textContent = "";
        });
        if (!(GameController.getCurrentPlayer() === PlayerController.getFirstPlayer())) GameController.playRound();
    };

    return {
        setRows,
        selectBox,
        clearGameboard,
    };
})();

const GameController = (function() {
    let currentPlayer = PlayerController.getFirstPlayer();

    const playRound = () => {
        currentPlayer = currentPlayer === PlayerController.getFirstPlayer() ? PlayerController.getSecondPlayer() : PlayerController.getFirstPlayer();
    };

    const getCurrentPlayer = () => currentPlayer;

    return {
        getCurrentPlayer,
        playRound,
    };
})();



Gameboard.setRows(7);

document.getElementById("gameboard").addEventListener("click", (e) => {
    PlayerController.setFirstPlayer(document.getElementById("player-1-name").value,
    document.getElementById("player-1-symbol").value);
    PlayerController.setSecondPlayer(document.getElementById("player-2-name").value,
    document.getElementById("player-2-symbol").value);
    Gameboard.selectBox(e.target);
});
document.getElementById("clear-btn").addEventListener("click", () => Gameboard.clearGameboard());
document.getElementById("new-btn").addEventListener("click", () => {
    let rows = 0;
    while (!(rows >= 3 && rows < 8)) {
        rows = prompt("Insert number of rows (between 3 and 7)");
    }
    Gameboard.setRows(rows);
});