      let score = JSON.parse(localStorage.getItem('score')) || 
        {
          Wins: 0,
          Losses: 0,
          Ties: 0
        };

        updateScoreElement();

        /*
      if (score === null) {
        score = {
          Wins: 0,
          Losses: 0,
          Ties: 0
        };
      }
        */
        /*
      short cut
      if (!score) {
        score = {
          Wins: 0,
          Losses: 0,
          Ties: 0
        };
      }
      */
      let isaAutoPlaying = false;
      let intervalId;

      function autoPlay() {
        if (!isaAutoPlaying) {
          intervalId = setInterval(function () {
            const playerMove = pickComputerMove();
            playGame(playerMove);
          }, 1000);
          isaAutoPlaying = true;
        } else {
          clearInterval(intervalId);
          isaAutoPlaying = false;
        }
      }

      document.querySelector('.js-rock-button').addEventListener('click', () => {
        playGame('rock');
      });

      document.querySelector('.js-paper-button').addEventListener('click', () => {
        playGame('paper')
      });

      document.querySelector('.js-scissor-button').addEventListener('click', () => {
        playGame('scissor')
      });

      document.querySelector(".js-reset-score-button").addEventListener('click', () => {
        score.Wins = 0;
        score.Losses = 0;
        score.Ties = 0;
        localStorage.removeItem("score");
        updateScoreElement();
      });

      document.querySelector(".js-auto-play-button").addEventListener('click', () => {
        autoPlay()
      });

      document.body.addEventListener('keydown', (event) => {
        if (event.key === 'r') {
          playGame('rock')
        } else if (event.key === 'p') {
          playGame('paper')
        } else if (event.key === 's') {
          playGame('scissor')
        }
        
      })

      function playGame(playerMove) {
        const computerMove = pickComputerMove();

        let result = '';

        //scissor move
        if (playerMove === 'scissor') {
          if (computerMove === 'rock') {
            result = 'You Loss';
          } else if (computerMove === 'paper') {
            result = 'You Win';
          } else if (computerMove === 'scissor') {
            result = 'Tie';
          }

          //paper move
        } else if (playerMove === 'paper') {
          if (computerMove === 'rock') {
          result = 'You Win';
          } else if (computerMove === 'paper') {
            result = 'Tie';
          } else if (computerMove === 'scissor') {
            result = 'You Loss';
          }

          //rock move
        } else if (playerMove === 'rock') {
          if (computerMove === 'rock') {
            result = 'Tie';
          } else if (computerMove === 'paper') {
            result = 'You Loss';
          } else if (computerMove === 'scissor') {
            result = 'You Win';
          }
        }
        
        if (result === 'You Win') {
          // score.Wins = score.Wins + 1;
          score.Wins += 1;
        } else if (result === 'You Loss') {
          // score.Losses = score.Losses + 1;
          score.Losses += 1;
        } else if (result === 'Tie') {
          // score.Ties = score.Ties + 1;
          score.Ties += 1;
        }

        localStorage.setItem('score', JSON.stringify(score));

        updateScoreElement();
        
        document.querySelector('.js-result').
            innerHTML = result;

        document.querySelector('.js-moves').
            innerHTML = `You <img class="move-icon" src="images/${playerMove}-emoji.png" alt=""> <img class="move-icon" src="images/${computerMove}-emoji.png" alt=""> Computer`;    
        

        //alert(`You Picked ${playerMove}. Computer Picked ${computerMove}. ${result}
        //Wins: ${score.Wins}. Losses: ${score.Losses}. Ties: ${score.Ties}`);
      }

      function updateScoreElement() {
        document.querySelector('.js-score').
            innerHTML = `Wins: ${score.Wins}. Losses: ${score.Losses}. Ties: ${score.Ties}`;
      }
      
      function pickComputerMove() {
        const randomNumber = Math.random();

        let computerMove = '';

        if (randomNumber >= 0 && randomNumber < 1 / 3) {
          computerMove = 'rock';
          
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
          computerMove = 'paper';
          
        }else if (randomNumber >= 2 / 3 && randomNumber < 3 / 3) {
          computerMove = 'scissor';
          
        }

        return computerMove;

      }
