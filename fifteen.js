//Change picture additional functioon was implemented
//620064846
//Quewayne Grant
//Project 2

var blankX=300;
var blankY=300;
var pieces=[];

//carries out script functions as soon as page has finished loading
window.onload=function() {
	pieces = $$('#puzzlearea div');
  layout();
  $("shufflebutton").observe("click", shuffle);
	imageSwitch();
};
//function to attach the puzzlepiece class to the items of the puzzlearea
function layout() {
  //pieces = $$('#puzzlearea div');
  var j=0;
  var t=3;
  for(i=0;i<pieces.length;i++){
    for(x=0;x<=t;x++){
      pieces[i].addClassName("puzzlepiece");
      pieces[i].style.backgroundImage= 'url(Adele.jpg)';
      pieces[i].style.top=100*j+"px";
      pieces[i].style.left=100*x+"px";
      pieces[i].style.backgroundPosition =-x*100+"px "+j*-100+"px";
      pieces[i].observe("click",moveTile);
      pieces[i].observe("mouseover",hover);
      i++;
    }
    j++;
    if(j>2){
      t=2;
    }
    i--;
  }
} 
// Attaches class movablepiece while the cursor is placed over square that is moveable, i.e next to the blank square
function hover(event) {
  if (blankTile(this.style.left, this.style.top)) {
    this.addClassName("movablepiece");
  } else if (this.hasClassName("movablepiece")) {
    this.removeClassName("movablepiece");
  }
}
// Helper function to switch tile with blank tile 
function moveHelper(piece) {
  if (blankTile(piece.style.left, piece.style.top)) {
    var x = piece.style.left;
    var y = piece.style.top;
    piece.style.left = blankX + "px";
    piece.style.top = blankY + "px";
    blankX = parseInt(x);
    blankY = parseInt(y);
  }
}
//Calls function moveHelper to switch tiles
function moveTile(event) {
  moveHelper(this);
}
//rearranges the puzzle into a solvable state by simulating 300 tile switches
function shuffle() {
  var temp = [];
  for (i=0;i<300;i++) {
    for (j=0;j<pieces.length;j++) {
      if (blankTile(pieces[j].style.left, pieces[j].style.top)) {
        temp.push(pieces[j]);
      }
    }
    moveHelper(temp[Math.floor(Math.random()*temp.length)]);
    temp = [];
  }
}
// tests whether a given piece neighbors the blank square
function blankTile(x, y) {
  if (Math.abs(blankY-parseInt(y))==100){
    if (Math.abs(blankX-parseInt(x))==0){
      return true;
    }
  } else if (Math.abs(blankX-parseInt(x))==100){
    if (Math.abs(blankY-parseInt(y))==0){
      return true;
    }
  }
  return false;
}

function imageSwitch(){
//var myDiv = document.getElementById("myDiv");

//Create array of options to be added
var array = ["Adele","Apple","DocWho","flower"];

//Create and append select list
var selectList = document.createElement("select");
selectList.id = "mySelect";
$("controls").appendChild(selectList);
selectList.style.left="200px";
//Create and append the options
for (var i = 0; i < array.length; i++) {
    var option = document.createElement("option");
    option.value = array[i];
    option.text = array[i];
    selectList.appendChild(option);
}
selectList.observe("change", function(){
//(this.options[this.selectedIndex].innerHTML)
for(i=0;i<pieces.length;i++){
    for(x=0;x<=t;x++){
      pieces[i].addClassName("puzzlepiece");
      pieces[i].style.backgroundImage= this.options[this.selectedIndex].innerHTML;
      pieces[i].style.top=100*j+"px";
      pieces[i].style.left=100*x+"px";
      pieces[i].style.backgroundPosition =-x*100+"px "+j*-100+"px";
      
      i++;
    }
    j++;
    if(j>2){
      t=2;
    }
    i--;
  }


});
}
