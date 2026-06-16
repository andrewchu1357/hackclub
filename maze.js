const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 40; // Each grid square is 40x40 pixels

// 0 = Path, 1 = Wall, 2 = Start/Player, 3 = Goal
const maze = [
   ,
   ,
   ,
   ,
   ,
   ,
   ,
   ,
   ,
   
];

// Player starting position in the array index (y = row, x = col)
let player = { x: 0, y: 0 };

// Draw the maze grid
function drawMaze() {
    for (let r = 0; r < maze.length; r++) {
        for (let c = 0; c < maze[r].length; c++) {
            if (maze[r][c] === 1) {
                ctx.fillStyle = "#34495e"; // Wall color
                ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
            } else if (maze[r][c] === 3) {
                ctx.fillStyle = "#2ecc71"; // Goal color
                ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
            } else {
                ctx.fillStyle = "#111"; // Path color
                ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }
    drawPlayer();
}

// Draw the player
function drawPlayer() {
    ctx.fillStyle = "#3498db"; // Player color (Blue)
    ctx.fillRect(player.x * tileSize + 5, player.y * tileSize + 5, tileSize - 10, tileSize - 10);
}

// Handle player movement
function movePlayer(dx, dy) {
    let newX = player.x + dx;
    let newY = player.y + dy;

    // Check boundaries and wall collisions
    if (newY >= 0 && newY < maze.length && newX >= 0 && newX < maze.length) {
        if (maze[newY][newX] !== 1) { 
            player.x = newX;
            player.y = newY;
        }
    }

    // Clear canvas and redraw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();

    // Check for win condition
    if (maze[player.y][player.x] === 3) {
        setTimeout(() => {
            alert("You escaped the maze! 🎉");
            player.x = 0; // Reset game
            player.y = 0;
            drawMaze();
        }, 50);
    }
}

// Listen for keyboard inputs
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") movePlayer(0, -1);
    if (e.key === "ArrowDown") movePlayer(0, 1);
    if (e.key === "ArrowLeft") movePlayer(-1, 0);
    if (e.key === "ArrowRight") movePlayer(1, 0);
});

// Initial game load
drawMaze();