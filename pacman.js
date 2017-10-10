var world = [  // we create a variable array to turn our world into divs with values
				[2,2,2,2,2,2,2,2,2,2],
				[2,1,1,1,3,2,1,1,1,2],
				[2,2,2,2,1,2,2,2,1,2],
				[2,1,1,1,1,2,3,2,3,2],
				[2,1,2,2,2,2,1,2,1,2],
				[2,1,1,1,1,2,4,2,1,2],
				[2,2,2,2,1,1,1,2,1,2],
				[2,1,1,1,1,1,3,1,1,2],
				[2,2,2,2,2,2,2,2,2,2]
			];
			var score = 0; // sets our score to 0

			var pacman = {  // sets our pacman position in the world (1,1)
				x: 1,
				y: 1
			};
			function displayWorld(){ // create a function for the world
				var output = ''; // create an empty output variable (this will be our world)
				for (var i=0; i<world.length; i++) { // initialize a for loop that goes through the entire world array
					output += "\n<div class='row'>"; // creates a row followed by a for and if statements
					for (var j = 0; j<world[i].length; j++) { // go through the entire array and do the following
						if (world[i][j] == 2) // if the array value is 2, build a brick
							output +=  "<div class='brick'></div>";
						else if(world[i][j] == 1) // if the array value is 1, build a coin
							output += "<div class='coin'></div>";
						if (world[i][j] == 0) // if the array value is 0, make it empty
							output += "<div class='empty'></div>";
						else if(world[i][j] == 3) // if array value is 3, build a cherry
							output += "<div class='cherry'></div>"; 
						if(world[i][j] == 4)
							output += "<div class='ghost-purple'></div>";
					}
					output += "\n</div>"; // now spit out whatever the above array has created
				}
				//console.log(output);
				document.getElementById('world').innerHTML = output; // takes the innerHTML of the #world and replaces it with the output from above (our computer world)
			} // end our display world function

		function displayPacman(){ // creates our pacman function
			document.getElementById('pacman').style.top = pacman.y*20+"px"; // sets our pacman y position to whatever the array value is * 20 and converts it to px. This is because each box is 20px, so the computer is saying whatever the y value, multiply it by 20 and set that as the pixel value for absolute position on pacman to stick him in that spot
			document.getElementById('pacman').style.left = pacman.x*20+"px"; // again, check the x position in the array, mulitply by 20 (b/c this is px dimension per box) and then convert that to px and add it as a style to pacman (already in absolute positioning).
		}

		function hidePacman(){
			document.getElementById('pacman').style.display = "none";
			document.onkeydown = null;
			alert('Oh no, you died! Refresh to play again!')
		}	

		function displayScore(){ // creates score function
			document.getElementById('score').innerHTML = score; // sets #score html contents to score variable
		}

		displayWorld(); // show our world
		displayPacman(); // show pacman
		displayScore(); // show score

		document.onkeydown = function(e){ // when downkey is pressed
			if(e.keyCode == 37 && world[pacman.y][pacman.x-1] != 2){ // when left arrow key is pressed
				pacman.x--; // move pacman --1 on x axis if x-axis -1 is not brick (2)
				document.getElementById('pacman').style.transform = "rotate(-180deg)"; // rotate pacman left
			}
			else if(e.keyCode == 39 && world[pacman.y][pacman.x+1] != 2){ // when right arrow is pressed if x-axis +1 is not a brick (2)
				pacman.x++; // move pacman ++1 on x axis
				document.getElementById('pacman').style.transform = "rotate(0deg)"; // rotate pacman to original positioning
			}
			if(e.keyCode == 40 && world[pacman.y+1][pacman.x] != 2){ // when down arrow is pressed
				pacman.y++; // move pacman ++1 on y axis
				document.getElementById('pacman').style.transform = "rotate(90deg)"; // rotate pacman down

			} else if(e.keyCode == 38 && world[pacman.y-1][pacman.x] != 2){ // when up arrow is pressed
				pacman.y--; // move pacman --1 on y axis
				document.getElementById('pacman').style.transform = "rotate(-90deg)"; // rotate pacman up
			}

			if(world[pacman.y][pacman.x] == 1){  // basically saying: if the position of pacman in the #world is a variable of 1 (meaning a coin),  do the following:
				world[pacman.y][pacman.x] = 0; // set that variable instead to a 0 (which will make it clear)
				score+=10; // increase the score by 10pts
				displayWorld(); // rebuild the world (to show the now empty slot)
				displayScore(); // rebuild the score (to show the updated score)
			} else if (world[pacman.y][pacman.x] == 3) {
				world[pacman.y][pacman.x] = 0
				score+=50;
				displayWorld();
				displayScore();
			}
			if(world[pacman.y][pacman.x] == 4) {
				world[pacman.y][pacman.x] = 0;
				score = 0;

				displayWorld();
				displayScore();
				hidePacman();
			}
			//console.log(e.keyCode); // just used in developing to show the keycode
			displayPacman(); // build the pacman based on the above conditions
		}
