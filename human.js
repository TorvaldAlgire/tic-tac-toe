function HumanGame() {
    console.log("humanGame");
    const board = new Board();
    const player1 = new Player1(board);
    const player2 = new Player2(board);
    let turn = 0;

    this.start = function () {
        const config = { childList: true };
        const observer = new MutationObserver(() => takeTurn());
        board.positions.forEach((el) => observer.observe(el, config));
        takeTurn();
    }

    function takeTurn() {
        if (board.checkForWinner() === true) {
            location.reload();
        }


        if (turn % 2 === 0) {
            player1.takeTurn();
        } else {
            player2.takeTurn();
        }
        turn++;

        if (turn >= 10) {
            location.reload();
        }
    }
}

function Board() {
    this.positions = Array.from(document.querySelectorAll('.col'));

    // 0 1 2
    // 3 4 5
    //6 7 8
    this.checkForWinner = function () {
        let winner = false;
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const positions = this.positions;

        winningCombinations.forEach((winningCombo) => {
            const pos0InnerText = positions[winningCombo[0]].innerText;
            const pos1InnerText = positions[winningCombo[1]].innerText;
            const pos2InnerText = positions[winningCombo[2]].innerText;
            const isWinningCombo = pos0InnerText !== '' &&
                pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;

            if (isWinningCombo) {
                winner = true;
                winningCombo.forEach((index) => {
                    positions[index].className += ' winner'; //if there is no space here then the class is not appended.
                })

            }
        });

        return winner;
    }
}

function Player1(board) {
    this.takeTurn = function () {
        board.positions.forEach(el => el.addEventListener('click', handleTurnTaken));
    }

    function handleTurnTaken(event) {
        event.target.innerText = 'X';
        board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
    }
}

function Player2(board) {
    this.takeTurn = function () {
        board.positions.forEach(el => el.addEventListener('click', handleTurnTaken));
    }

    function handleTurnTaken(event) {
        event.target.innerText = 'O';
        board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
    }
}