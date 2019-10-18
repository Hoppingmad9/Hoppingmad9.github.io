var rows = 14;
var columns = 14;
var cellSize = 30;
var fr = 30;
var width;
var height;
var board;
var colours = [[255, 204, 0], [0, 0, 255], [255, 0, 0], [255, 170, 238], [0, 255, 0], [0, 0, 0]];
var buttons;
var colorChangeCount;
var win;
var winAlert;


function setup() {
	win = false;
	winAlert = false;
	colorChangeCount = 0;
	boardWidth = (columns+2)*cellSize;
	boardHeight = (rows+2)*cellSize;
	controllerWidth = (3*2+2)*cellSize;
	controllerHeight = (2*2+2)*cellSize;
	createCanvas(boardWidth+controllerWidth-cellSize,Math.max(boardHeight, controllerHeight));
	frameRate(fr);
	board = new Array(rows);
	for (let y = 0; y < rows; y++) {
		board[y] = new Array(columns);
		for (let x = 0; x < columns; x++) {
			board[y][x] = Math.floor(Math.random()*6);
		}
	}
	buttons = new Array(6);
	for (let y = 0; y < 2; y++) {
		for (let x = 0; x < 3; x++)
		{
			buttons[x+y*3] = createButton(x+y*3);
			buttons[x+y*3].position((x*2+1)*cellSize+boardWidth-cellSize,(y*2+1)*cellSize);
			buttons[x+y*3].size(cellSize*2, cellSize*2);
			buttons[x+y*3].style('background-color', color(colours[x+y*3]));
		}
	}
	buttons[0].mousePressed(updateBoard0);
	buttons[1].mousePressed(updateBoard1);
	buttons[2].mousePressed(updateBoard2);
	buttons[3].mousePressed(updateBoard3);
	buttons[4].mousePressed(updateBoard4);
	buttons[5].mousePressed(updateBoard5);

	//add github link
	strokeWeight(1);
	linktext = createP('<a href="https://github.com/Hoppingmad9/dench" target="_blank">See the code on github.</a>');
	linktext.position(1.5*cellSize+boardWidth-cellSize+0.5,9*cellSize);
	linktext.size(cellSize*6, cellSize*2);
}

function draw() {
	background(200);
	//draw board
	strokeWeight(0);
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < columns; x++) {
			fill(colours[board[y][x]]);
			rect((x+1)*cellSize,(y+1)*cellSize,cellSize,cellSize);
		}
	}

	//add board border
	noFill();
	strokeWeight(5);
	stroke(0);
	rect(cellSize,cellSize,columns*cellSize,rows*cellSize);

	//add controller border
	noFill();
	strokeWeight(5);
	stroke(0);
	rect((0*2+1)*cellSize+boardWidth-cellSize-0.5,(0*2+1)*cellSize-0.5,3*cellSize*2, 2*cellSize*2)

	//add score
	fill(0);
	strokeWeight(1);
	textSize(32);
	text('score:', 1.5*cellSize+boardWidth-cellSize+0.5, 7*cellSize);
	text(colorChangeCount, 1.5*cellSize+boardWidth-cellSize+0.5, 8*cellSize);

	//add score border
	noFill();
	strokeWeight(5);
	stroke(0);
	rect((0*2+1)*cellSize+boardWidth-cellSize-0.5, 6*cellSize, 6*cellSize, 3*cellSize)

	if (winAlert) {
		window.alert("You win with a score of "+colorChangeCount+"!");
		winAlert = false;
	}

	if (win) {
		win = false;
		winAlert = true;
	}
}

function updateBoard(newColor) {
	let y = 0;
	let x = 0;
	let newBoard = board;
	let oldColor = board[y][x];
	newBoard[y][x] = newColor;
	if (newColor != oldColor) {
		colorChangeCount++;
		changeColor(y, x, oldColor, newColor, newBoard);
	}
	board = newBoard;
	if (checkWin()) {
		win = true;
	}
}

function changeColor(y, x, oldColor, newColor, newBoard) {

	newBoard[y][x] = newColor;
	if (y != 0) {
		if (newBoard[y-1][x] == oldColor) {
			changeColor(y-1, x, oldColor, newColor, newBoard);
		}
	}
	if (y != rows-1) {
		if (newBoard[y+1][x] == oldColor) {
			changeColor(y+1, x, oldColor, newColor, newBoard);
		}
	}
	if (x != 0) {
		if (newBoard[y][x-1] == oldColor) {
			changeColor(y, x-1, oldColor, newColor, newBoard);
		}
	}
	if (x != columns-1) {
		if (newBoard[y][x+1] == oldColor) {
			changeColor(y, x+1, oldColor, newColor, newBoard);
		}
	}
}

function checkWin() {
	currColor = board[0][0];
	for (let y = 0; y < rows; y++){
		for (let x = 0; x < columns; x++) {
			if (board[y][x] != currColor) {
				return false;
			}
		}
	}
	return true;
}

function updateBoard0() {updateBoard(0);}
function updateBoard1() {updateBoard(1);}
function updateBoard2() {updateBoard(2);}
function updateBoard3() {updateBoard(3);}
function updateBoard4() {updateBoard(4);}
function updateBoard5() {updateBoard(5);}
