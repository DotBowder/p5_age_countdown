let weekTotal = 52;
let yearTotal = 100;
var weekCurrent;
var yearCurrent;
var userInputWeek;
var userInputYear;
var userResultWeek;
var userResultYear;
var yearLeft;
var weekLeft;

var WinX;
var WinY;
// RGB for later
// var R;
// var G;
// var B;

var x;

let squareBuffer = 1;
let wallbuffer = 10

var boxSize = 10;
let guiOffsetY = 100;
let guiOffsetX = 300;



// Helper function to determine if a given string can be interpreted as a number
//  *used for validating user input as a number.
function IsNumeric(input)
{
    return (input - 0) == input && (''+input).trim().length > 0;
}

// Helper functions for User Input from GUI on Right Panel
function UpdateInputWeek() {
  if (IsNumeric(Number(this.value()))) {
    if ( Number(this.value()) < weekTotal ) {
      weekCurrent = Number(this.value())
    }
  }
}
function UpdateInputYear() {
  if (IsNumeric(Number(this.value()))) {
    if ( Number(this.value()) < yearTotal ) {
      yearCurrent = Number(this.value())
    }
  }
}
function UpdateInputYearTotal() {
  if ( Number(this.value()) <= 100 && Number(this.value()) > yearCurrent) {
    yearTotal = Number(this.value())
    gridWidth = ((boxSize * (yearTotal)) + (squareBuffer * yearTotal));
    gridHeight = ((boxSize * weekTotal) + (squareBuffer * weekTotal));
    WinX =  wallbuffer + gridWidth + wallbuffer + guiOffsetX; // left to right
    WinY =  wallbuffer + gridHeight + wallbuffer + bottomLabel + wallbuffer; // top to bottom
    resizeCanvas(WinX, WinY);
  }
}



function setup() {

  // Start week and year values
  weekCurrent = 15;
  yearCurrent = 35;

  // Setup canvas dimentions
  //   *note that the WinX and WinY variables are written as the elements are displayed.
  //   *Written as objects are visualized, left to right, and top to bottom.
  //
  //    eg: LEFT OF WINDOW   -->|  buffer | grid | buffer | etc | buffer  |<--  RIGHT OF WINDOW
  //
  //    eg: TOP OF WINDOW    -->|   buffer    |    grid    |    buffer    |<--  BOTTOM OF WINDOW
  //
  gridWidth = ((boxSize * (yearTotal)) + (squareBuffer * yearTotal));
  gridHeight = ((boxSize * weekTotal) + (squareBuffer * weekTotal));
  bottomLabel = 100
  WinX =  wallbuffer + gridWidth + wallbuffer + guiOffsetX; // left to right
  WinY =  wallbuffer + gridHeight + wallbuffer + bottomLabel + wallbuffer; // top to bottom
  print(WinX, WinY)

  // Setup User Inputs on Right GUI Panel
  yearInputUser = createInput(yearCurrent,"text");
  weekInputUser = createInput(weekCurrent,"text");
  maxYearInputUser = createInput(yearTotal,"text");

  yearInputUser.input(UpdateInputYear);
  weekInputUser.input(UpdateInputWeek);
  maxYearInputUser.input(UpdateInputYearTotal);

  // Create our Canvas
  createCanvas(WinX, WinY)

  // RGB for later
  // R = random(PI);
  // G = random(PI);
  // B = random(PI);

}


function draw() {
  background(63,63,63);

  yearInputUser.position(WinX - 256, guiOffsetY + 5)
  weekInputUser.position(WinX - 256, guiOffsetY + 32)
  maxYearInputUser.position(WinX - 195, guiOffsetY + 565)

  gridWidth = ((boxSize * (yearTotal)) + (squareBuffer * yearTotal))
  gridHeight = ((boxSize * weekTotal) + (squareBuffer * weekTotal))

  // Square Grid
  aged=false;
  let i = 0;
  let r = 0;
  fill(255, 255, 255);noStroke();

  for (r = 0; r < yearTotal; r++) {
    for (i = 0; i < weekTotal; i++) {

      if (aged == false && r >= yearCurrent && i >= weekCurrent) {
        fill(127,127,255);
        aged = true;
      }

      // RGB for later
      // if (aged == true) {
      //   if ( (R+B+G)/3 < 127) {
      //     R = R + random(10)
      //     G = G + random(10)
      //     B = B + random(10)
      //   } else {
      //     R = R - random(10)
      //     G = G - random(10)
      //     B = B - random(10)
      //   }
      //   fill(R,G,B)
      // }

      beginShape();
      vertex(       wallbuffer + ((boxSize * r) + (squareBuffer * r))        , wallbuffer + ((boxSize * i) + (squareBuffer * i))      );
      vertex(       wallbuffer + ((boxSize * r) + (squareBuffer * r))        , wallbuffer + 10 + ((boxSize * i) + (squareBuffer * i))      );
      vertex(       wallbuffer + 10 + ((boxSize * r) + (squareBuffer * r))   , wallbuffer + 10 + ((boxSize * i) + (squareBuffer * i))      );
      vertex(       wallbuffer + 10 + ((boxSize * r) + (squareBuffer * r))   , wallbuffer + 10 + ((boxSize * i) + (squareBuffer * i)) - 10   );
      endShape(CLOSE);
    }
  }

  // Info Pane Below grid
  fill(140,140,140);stroke(0);strokeWeight(2);
  let x = wallbuffer
  let y = wallbuffer + gridHeight + wallbuffer
  let w = WinX - (wallbuffer + 0 + wallbuffer + guiOffsetX)
  let h = WinY - (wallbuffer + gridHeight + wallbuffer + 0 + wallbuffer )
  rect(x,y,w,h);

  let lineDistY = 20
  let lineDistX = 5
  let lineHeight = 10
  x = wallbuffer + lineDistX
  y = wallbuffer + gridHeight + wallbuffer + lineDistY + 5
  let xx = wallbuffer + gridWidth - lineDistX
  let yy = wallbuffer + gridHeight + wallbuffer + lineDistY + 5
  stroke(0);strokeWeight(1)
  line(x, y, xx, yy)
  for (r = 0; r < yearTotal; r++) {
    strokeWeight(1);
    lineHeight = 10
    lineDistY = 20
    if (r == yearTotal / 4 || r == yearTotal / 2 || r == yearTotal * 3 / 4 || r == 0 || r == yearTotal - 1 ) {
      strokeWeight(2);
      lineHeight = 20
      lineDistY = 15

      fill(0);noStroke();textSize(12);textStyle(NORMAL);
      t = `${r}`
      text( t, wallbuffer + lineDistX + ((boxSize + squareBuffer) * r) - (textWidth(t)/2),     wallbuffer + gridHeight + wallbuffer + 20 + 5 + 30);
    }
    stroke(0);
    line(wallbuffer + lineDistX + ((boxSize + squareBuffer) * r),     wallbuffer + gridHeight + wallbuffer + lineDistY,     wallbuffer + lineDistX + ((boxSize + squareBuffer) * r),     wallbuffer + gridHeight + wallbuffer + lineDistY + lineHeight)

    if (r == yearCurrent) {
      stroke(0);strokeWeight(14);
      point(wallbuffer + lineDistX + ((boxSize + squareBuffer) * r),     wallbuffer + gridHeight + wallbuffer + 20 + 5)
      stroke(255);strokeWeight(12);
      point(wallbuffer + lineDistX + ((boxSize + squareBuffer) * r),     wallbuffer + gridHeight + wallbuffer + 20 + 5)

      t = `${yearCurrent}`
      fill(255);stroke(0);strokeWeight(1);
      rect(wallbuffer + lineDistX + ((boxSize + squareBuffer) * r) - (textWidth(t)+1),     wallbuffer + gridHeight + wallbuffer + 20 + 5 + 12, 2*textWidth(t), 21)
      fill(0);noStroke();textSize(20);textStyle(BOLD);
      text( t,      wallbuffer + lineDistX + ((boxSize + squareBuffer) * r) - ((textWidth(t) + 2)/2),     wallbuffer + gridHeight + wallbuffer + 20 + 5 + 30);

    }

  }

  // Right UI Panel
  fill(140,140,140);stroke(0);strokeWeight(2);
  rect(WinX - guiOffsetX , wallbuffer, 290, 60);
  rect(WinX - guiOffsetX , wallbuffer + 60 + (wallbuffer/2), guiOffsetX - wallbuffer , WinY - (wallbuffer + 60 + (wallbuffer/2) + 0 + wallbuffer))

  fill(0);noStroke();textSize(32);textStyle(BOLD);
  t=`Countdown to ${yearTotal}`;
  text( t, WinX - 300 + ((300 - (10) - textWidth(t)) / 2), 50)

  fill(0);noStroke();textSize(20);textStyle(NORMAL);
  t="You have lived...\n  for                                  years\nand                                  weeks.";
  text( t, WinX - 300 + 5, guiOffsetY)


  yearLeft = yearTotal - yearCurrent - 1;
  weekLeft = weekTotal - weekCurrent;
  fill(0);textSize(20);textStyle(NORMAL);
  if (yearLeft == 1 && weekLeft == 1) {
    t=`There is ${yearLeft} year, and ${weekLeft} week\nleft, until you reach ${yearTotal}.`;
  } else if (yearLeft == 1 && weekLeft != 1) {
    t=`There is ${yearLeft} year, and ${weekLeft} weeks\nleft, until you reach ${yearTotal}.`;
  } else if (yearLeft != 1 && weekLeft == 1) {
    t=`There are ${yearLeft} years, and ${weekLeft}\nweek left, until you reach ${yearTotal}.`;
  } else {
    t=`There are ${yearLeft} years, and ${weekLeft}\nweeks left, until you reach ${yearTotal}.`;
  }
  text( t, WinX - 300 + 5, guiOffsetY + 80);


  fill(0);noStroke();textSize(20);textStyle(BOLD);
  t=`Total Yrs:`;
  text( t, WinX - 300 + 5, guiOffsetY + 583);

}
