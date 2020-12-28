(function setUp() {
     humanGame = new HumanGame();
     compGame = new CompGame();
    
    function checkState() {
        if (document.getElementById("human").checked) {
            console.log("playing against Human");
            humanGame.start();
        } else if (document.getElementById("comp").checked) {
            console.log("playing against comp");
            compGame.start();
        }else {
            return false;
        }
    }

    window.addEventListener("input", ((evt => {
        checkState();
    })));


}());
