const game = () => {

    var playerName = "Player";
    let pScore = 0;
    let cScore = 0;
   
    
    var startGame = function(){
        const playBtn = document.querySelector(".introduction button");
        const introScreen = document.querySelector(".introduction");
        const nameScreen = document.querySelector(".playerScreen");

        playBtn.addEventListener("click", () => {
            introScreen.classList.add("fadeOut");
            nameScreen.classList.add("fadeIn");
            const saveNameBtn = document.querySelector(".playerScreen button");
            
            saveNameBtn.addEventListener("click",() => {
                saveName(nameScreen);
            });
        });
    };

    var saveName = function(nameScreen){
        
        var playerInput =  document.querySelector('input[name=playerName]');
        const playerNameScreen = document.querySelector(".player-score h2");
        if(playerInput.value.length > 0 && playerInput.value.trim().length > 0){
            const match = document.querySelector(".match");
            const score = document.querySelector(".score");
            nameScreen.classList.add("fadeOut");
            nameScreen.style.display = "none";
            match.classList.add("fadeIn");
            score.classList.add("fadeIn");
            playerName = playerInput.value;
        }else{

            playerInput.value = "";
            playerInput.placeholder = "Please enter valid name";
            playerInput.classList.add('error');
            playerInput.style.border = "1px solid red";

            setTimeout(function() {
                playerInput.classList.remove('error');
                playerInput.style.border = "";
                playerInput.placeholder = "";
            }, 500);

        }
        playerNameScreen.textContent = playerName;
        playGame();
    };

    var playGame = function(){
        const options = document.querySelectorAll(".playerOptions button");
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const hands = document.querySelectorAll(".hands div img");
    
        hands.forEach(hand => {
          hand.addEventListener("animationend", function() {
            this.style.animation = "";
          });
        });

        //Computer Options
        const computerOptions = ["rock", "paper", "scissors"];
    
        options.forEach(option => {
          option.addEventListener("click", function() {
            //Computer Choice
            const computerNumber = Math.floor(Math.random() * 3);
            const computerChoice = computerOptions[computerNumber];
    
            setTimeout(() => {
              debugger;
              //Here is where we call compare hands
              compareHands(this.value, computerChoice);
              //Update Images
             playerHand.src = `./images/${this.value}.png`;
             computerHand.src = `./images/${computerChoice}.png`;

            }, 2000);
            //Animation
            playerHand.style.animation = "shakePlayer 2s ease";
            computerHand.style.animation = "shakeComputer 2s ease";
          });
        });
    };

    var updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };
    
    var compareHands = (playerChoice, computerChoice) => {
        //Update Text
        const winner = document.querySelector(".winner");
        
        //Checking for a tie
        if (playerChoice === computerChoice) {
          winner.textContent = "It is a tie";
          return;
        }
       
        //Check for Rock
        if (playerChoice === "rock") {
          if (computerChoice === "scissors") {
            playerWins(winner);
          } else {
            computerWins(winner);
          }
        }
        //Check for Paper
        if (playerChoice === "paper") {
          if (computerChoice === "scissors") {
            computerWins(winner);
          } else {
            playerWins(winner);
          }
        }
        //Check for Scissors
        if (playerChoice === "scissors") {
          if (computerChoice === "rock") {
            computerWins(winner);
          } else {
            playerWins(winner);
          }
        }
    };

    var playerWins = function(winner){
        winner.textContent = playerName+" Wins";
        pScore++;
        updateScore();
        return;
    }

    var computerWins = function(winner){
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
    }

    startGame();
};

game();