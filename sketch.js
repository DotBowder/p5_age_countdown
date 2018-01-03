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
let bufferSize = 1;
var boxSize = 10;
let guiOffsetY = 100;



// Helper function to determine if a given string can be interpreted as a number
//  *used for validating user input as a number.
function IsNumeric(input)
{
    return (input - 0) == input && (''+input).trim().length > 0;
}

// Helper functions for User Input from GUI on Right Panel
function UpdateInputWeek() {
  if (IsNumeric(this.value())) {
    if ( this.value() < weekTotal ) {
      weekCurrent = this.value()
    }
  }
}
function UpdateInputYear() {
  if (IsNumeric(this.value())) {
    if ( this.value() < yearTotal ) {
      yearCurrent = this.value()
    }
  }
}
function UpdateInputYearTotal() {
  if (IsNumeric(this.value())) {
    if ( this.value() <= 100 ) {
      yearTotal = this.value()
    }
  }
}


function setup() {

  // Start week and year values
  weekCurrent = 15;
  yearCurrent = 35;

  // Setup Javascript Size
  WinX = 10 + 10 + ((boxSize * (yearTotal)) + (bufferSize * yearTotal)) + 300;
  WinY = 20 + ((boxSize * weekTotal) + (bufferSize * weekTotal));
  print(WinX, WinY)

  // Setup User Inputs on Right GUI Panel
  yearInputUser = createInput(23,"text");
  yearInputUser.position(WinX - 256, guiOffsetY + 5)
  weekInputUser = createInput(33,"text");
  weekInputUser.position(WinX - 256, guiOffsetY + 30)
  maxYearInputUser = createInput(yearTotal,"text");
  maxYearInputUser.position(WinX - 195, guiOffsetY + 455)
  weekInputUser.input(UpdateInputWeek);
  yearInputUser.input(UpdateInputYear);
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
      vertex(       10 + ((boxSize * r) + (bufferSize * r))      , 10 + ((boxSize * i) + (bufferSize * i))      );
      vertex(       10 + ((boxSize * r) + (bufferSize * r))      , 20 + ((boxSize * i) + (bufferSize * i))      );
      vertex(       10+10 + ((boxSize * r) + (bufferSize * r))   , 20 + ((boxSize * i) + (bufferSize * i))      );
      vertex(       10+10 + ((boxSize * r) + (bufferSize * r))   , 20 + ((boxSize * i) + (bufferSize * i)) - 10   );
      endShape(CLOSE);
    }
  }


  // Right UI Panel
  fill(140,140,140);
  rect(WinX - 300 , 10, 290, WinY - 20);
  fill(63,63,63);
  rect(WinX - 300 , 70, 290 , 5)

  fill(0);noStroke();textSize(32);textStyle(BOLD);
  t=`Countdown to ${yearTotal}`;
  text( t, WinX - 300 + ((300 - (10) - textWidth(t)) / 2), 50)

  fill(0);noStroke();textSize(20);textStyle(NORMAL);
  t="You have lived...";
  text( t, WinX - 300 + 5, guiOffsetY)
  t="  for                                  years";
  text( t, WinX - 300 + 5, guiOffsetY + 25)
  t="and                                  weeks.";
  text( t, WinX - 300 + 5, guiOffsetY + 49)


  yearLeft = yearTotal - yearCurrent;
  weekLeft = weekTotal - weekCurrent;
  fill(0);textSize(20);textStyle(NORMAL);
  t=`There are ${yearLeft} years, and ${weekLeft}`;
  text( t, WinX - 300 + 5, guiOffsetY + 80);
  t=`weeks left until you reach ${yearTotal}.`;
  text( t, WinX - 300 + 5, guiOffsetY + 102);


  fill(0);noStroke();textSize(20);textStyle(BOLD);
  t=`Total Yrs:`;
  text( t, WinX - 300 + 5, guiOffsetY + 473);

}
