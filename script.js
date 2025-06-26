const Gameboard = (function() {
    let gameboard = document.getElementById("gameboard");

    const setRows = (rows) => {
        for (i = 0; i < rows**2; i++) {
            const box = document.createElement("button");
            box.classList.add("box");
            box.style.height = `${(548 / rows) - 2}px`;
            box.style.width = `${(548 / rows) - 2}px`;
            gameboard.appendChild(box);
        }
        gameboard.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
    }

    return {
        setRows,
    }
})();


Gameboard.setRows(4);