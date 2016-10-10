// xRes and yRes control how many pixels wide and tall
// the screen is, respectively
var xRes = 800;
var yRes = 600;

// bgColor and drawColor will control the background and
// draw colors, respectively. They will be set in setup()
// and in draw()
var bgColor;
var drawColor;

// markerColor controls the transparency of the dots drawn.
// 0 is transparent, and 1 is opaque. This value is very
// close to transparent, but the program will run so fast
// that the dots will overlap and brighten over time.
var markerAlpha = 0.1;

// numSpokes is the number of "spokes" fir the sketch.
// really, it's the number of dots that get drawn each
// frame, situated in a circular pattern.
var numSpokes = 12;

// t is the time variable. It will range from 0 to 360,
// increasing by dt every time a new frame is drawn.
// Smaller values of dt will make t change slower
var t = 0;
var dt = 1;

// minMarker and maxMarker control the smallest and largest
// size of the dots drawn
var minMarker = 2;
var maxMarker = 40;

// flag for whether it is the first frame or not
firstFrame = true;

// setup runs once when the script starts
function setup() {
  // get browser's window dimensions
  xRes = windowWidth;
  yRes = windowHeight;
  
  // set the color mode to HSB (hue, saturation, brightness)
  colorMode( HSB );
  
  // set the background color to black
  bgColor = color( 0 , 0 , 100 , 1 );
  
  // dots do not have a stroke (outline) drawn around them
  noStroke();
  
  // sets the size of the drawing canvas
  createCanvas( xRes , yRes );
  
  // draw the background (this only happens once)
  background( bgColor );
  
  // sets the mode for angle-based functions to degrees
  angleMode( DEGREES );
  
  // draw the title screen and set the start time
  fill( 0 , 0 , 0 , 1 );
  textAlign( CENTER );
  textSize( 60 );
  text("KALEIDOSCOPE" , 0.5*xRes , 0.5*yRes );
  textSize( 30 );
  text( "Click or touch to draw.\n-marthematicist-" , 0.5*xRes , 0.5*yRes + 35 );
  startTime = millis();
}
// ... and that's the end of setup()


// draw runs each time a new frame is drawn
function draw() {
  
  // if 3 seconds have not elapsed since the start time, do nothing
  if( millis() - startTime < 3000 ){
    return;
  }
  // clear the title screen on the first frame
  if( firstFrame ){ 
    background( bgColor );
    firstFrame = false;
  }
  
  // Increase t by dt. A new frame is being frawn, so t
  // goes up. Time marches on...
  t += dt;
  
  // Set t equal to t modulo 360. Effectively causes t to
  // loop back to zero when it goes over 360.
  t %= 360;
  
  // Create variables x and y based on the mouse position.
  // The -0.5*_Res is to measure the position based off of the
  // center of the screen instead of the upper left corner.
  var x = mouseX - 0.5*xRes;
  var y = mouseY - 0.5*yRes;
  
  // d = the distance from the center to the point (x,y)
  // good old Pythagorean Theorem!
  var d = sqrt( x*x + y*y );
  
  // dr is the distance ratio. It is =0 at the center and =1
  // at the edge of the screen.
  var dr = d / ( 0.5*min(xRes,yRes) );
  
  // marker is the size of the dot to be drawn. It is somewhere
  // between minMarker and maxMarker, depending on the distance
  // ratio.
  var marker = lerp( minMarker , maxMarker , dr );
  
  // Move the drawing canvas so that when we draw, we will be
  // basing our coordinates off of the center of the screen
  // (half the width, half the height)
  translate( 0.5*xRes , 0.5*yRes );
  
  // Define the fill color based off of the time variable.
  // as time goes by, the color will change.
  fillColor = color( t , 100 , 100 , markerAlpha );
  
  // Set the fill color
  fill( fillColor );
  
  // This block will only run if the mouse or touschreen are
  // activated. ||  means "or" in code! BTW, && means "and".
  if( touchIsDown || mouseIsPressed ){
    
    // The next part is the where the real magic happens:
    // This block will loop several times.
    // The first time the variable i will equal 0. i++ means that i
    // will increase by 1 after each run through the loop. The loop
    // will continue to run as long as i < numSpokes is true. So it
    // will run as many times as the value stored in numSpokes.
    // For example, if numSpokes is set to 5, the loop will run
    // 5 times: first time i=0, next time i=1, then i=2, i=3, i=4,
    // and then the loop will quit because time next i would be 5,
    // and i < numSpokes would no longer be true.
    for( i = 0 ; i < numSpokes ; i++ ){
      
      // Each loop starts by rotating the canvas. The amount is
      // 360/numSpokes so that after all the loops are done the
      // total rotation will be 360 degrees.
      rotate( 360 / numSpokes );
      
      // Then the loop draws a dot. It's coordinates are always
      // at the position of the mouse, but since the canvas is
      // rotating, the dots appear to rotate around the center of
      // the screen.
      ellipse( x , y , marker , marker);
      
    }
    // the rotating/drawing loops are done now

  }
  // if statement done. If the mouse or touchscreen weren't
  // activated, the program will skip to here from the beginning
  // of the if() statement.
}
// ... and that's the end of draw(). Now it will repeat indefinitely.

// that's all folks!


function keyTyped() {
  if( key === 's' ) {
    saveCanvas( 'canvas' , 'jpg' );
    console.log("saved");
  }
}
