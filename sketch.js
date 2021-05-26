

var bubbles = [];
var targetx;
var targety;
var rotx = 0.0;
var roty = 0.0;

let cam
let delta 



//camera
let zoom;
let zvel = 0;
let xpos = 0;
let xvel = 0;
let lpos, mpos;


///coral1 
var coraluno
let coralhere = true
let coralfade = false


///coral2
var coralduo
let coralishere = false


///fish
var fishtrio

const masterSize = 40;
let coralsystem = []


///postions
beginning = true
freedom = false


///camera tings
let m 

let camman

let zoomnumber
let zoommoving = true
let zoomnotmoving = false

let leftmoving = false
let leftflip = false

let xnumber

let ynumber

let startColor
let newColor
let amt

let LstartColor
let LnewColor
let Lamt

let song 




function setup () {
	pixelDensity (displayDensity ());
	angleMode(DEGREES)
	createCanvas (windowWidth -1, windowHeight -1, WEBGL);
	colorMode (RGB, 200);
	background (0)


	noCursor();
	song.play()

	
	for (let y = -height / 2 + masterSize; y < height / 2; y += 4 * masterSize) {
		for (let x = -width / 2 + .75 * masterSize; x < width / 2; x += 3 * masterSize) {
			coralsystem.push(new Coral(x, y, masterSize));
		}
	}
	
	zoom = 1.2 * height;
	lpos = createVector(0, 0);
	//mpos = createVector(mouseX, mouseY);

   

	camman = createCamera()

	if(beginning = true){
	camman.setPosition(0, 0, 8000)
	}


	startColor = color(0);
    newColor = color(105, 191, 142);
    newColor = color(109, 164, 166)
	amt = 0;
    background(startColor);

	LstartColor = color(242, 124, 203);
    LnewColor = color(242, 228, 148);
    LnewColor = color(170, 242, 160)
	Lamt = 0;
	ambientLight (LstartColor);
	pointLight (LstartColor, 200000.0, 200000.0, 800.0);


}

function preload(){
	coraluno = loadModel('assets/clam.obj')
	
	fishtrio = loadModel('assets/fish3.obj')

	coralduo = loadModel('assets/itlldo.obj')
	
	song = loadSound('assets/coral one.mp3')

	
}


function draw () {
	m = millis()

	//background(7, 217, 217, 255)

	   background(lerpColor(startColor, newColor, smoothstep(0.3,0.9,amt)));
 		amt += 0.001;
  		if(amt >= 1){
   		amt = 0.0
    	startColor = newColor;
		newColor = color(7, 217, 217, 255)
		
	}
		
	//ambientLight (242, 124, 203);

	ambientLight(lerpColor(LstartColor, LnewColor, smoothstep(0.2,0.9,Lamt)));
	Lamt += 0.0001;
	 if(Lamt >= 2){
	  Lamt = 0.0
   LstartColor = LnewColor;
   LnewColor = color(170, 242, 160)
   
}

  
	lighting()

	
	bubbles.push (new BubblesBase (random (width), height + 40.0, random (-1000.0, 1000.0), random (20,0), random (0.1, 20.0)));
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].update ();
		bubbles[i].render ();
		if (bubbles[i].lifetime < -100) {
			bubbles.splice (i, 1);
		}
	}

	
	for (let c of coralsystem) {
		c.show();
		c.move()
	}
	
	cameraz(beginning)

	print(millis())
	
	zoommoves(zoommoving)

	nozoommoves(zoomnotmoving)

	
    zoomCamera(freedom)
    
	print(beginning)
	print(freedom)
	
	
	CoralOneLeaving()
	
    //print(zoomnumber)
	
}



function smoothstep(edge0, edge1, x){
	x = constrain((x - edge0) / (edge1 - edge0), 0.0, 1.0);
	return x * x * (3 -2 * x);
}


function cameraz(beginning){
	if(beginning)
	if(m > 80020){
	zoomtimeandplace()

	thetruth()
	}
	
	//if(m > 80000){
	//llefttimeandplace()
	//}
	//if(m > 90000){
	//zzoomtimeandplace()	
	//}
	//if(m > 91000){
	//lefttimeandplace()
	//}
	//if(m > 92000){
	//llefttimeandplace()
	//}
	//if(m > 95000){
	//zoomtimeandplace()
	//}
	//if(m > 98000){
	//coralunodeparture()

	//}
	
}

function thetruth(){

	beginning = false
	freedom = true
}

function zoomCamera(freedom) {
	if(freedom){
zoom += zvel;
	zvel *= .99;
	xpos += xvel;
	xvel *= .99;
	if (zoom < -200000000) {
		zvel *= -1;
	}
	if (xpos > 1200000000 || xpos < -120000000) {
		xvel *= -1
	};
	if (keyIsDown(UP_ARROW)) {
		zvel -= 0.2;
	}
	if (keyIsDown(DOWN_ARROW)) {
		zvel += 0.2;
	}
	if (keyIsDown(LEFT_ARROW)) {
		xvel -= 0.2;
	}
	if (keyIsDown(RIGHT_ARROW)) {
		xvel += 0.2;
	}
	
	
	camera(xpos, 0, zoom, 0, 0, 0, 0, 1, 0);
	
}
}

function BubblesBase (x, y, z, r, up) {
	this.bx = x;
	this.by = y;
	this.bz = z;
	this.br = r;
	this.lifetime = 50;
	this.update = function () {
		this.by -= up;
		this.lifetime--;
	}
	this.render = function () {
		noStroke ();
		push ();
		fill(255, map(this.lifetime, 100, -100, 0, 100))
		translate (this.bx - width / 2.0, this.by - height / 2.0, this.bz);
		sphere (this.br * 1.0);
		pop ();
	}
}

function lighting(){
	//pointLight ( 7, 217, 217, 200.0, 0.0, 200.0);
	//pointLight (242, 124, 203, -100000.0, -10000.0, -200000.0);
	
	pointLight(lerpColor(LstartColor, LnewColor, smoothstep(0.2,0.9,Lamt)), 200000.0, 200000.0, 800.0);
	Lamt += 0.0001;
	 if(Lamt >= 2){
	  Lamt = 0.0
   LstartColor = LnewColor;
   LnewColor = color(170, 242, 160)

	 }
}

function zoommoves(zoomchecker){
	if(zoomchecker){
	zoomnumber = -1.5

	camman.move(0, 0, zoomnumber)
	}	
}

function nozoommoves(zoomnotmoving){
	if(zoomnotmoving)
		zoomnumber = 0

		camman.move(0, 0, zoomnumber)
	}

function zoomtimeandplace(){
	
		zoommoving = false
		zoomnotmoving = true

		leftmoving =false
		leftflip = false
}

function zzoomtimeandplace(){
	
	zoommoving = true
	zoomnotmoving = false

	leftmoving =false
	leftflip = false
}

function leftmove(leftmoving){
	if(leftmoving){
		camman.move(0.5, 0, 1)
	}
}

function leftbackward(leftflip){
	if(leftflip)
		camman.move(-0.5, 0, -0.5)
	
}

function lefttimeandplace(){

	leftmoving = true
	leftflip = false

	zoommoving = false
	zoomnotmoving =false
}

function llefttimeandplace(){

	leftmoving = false
	leftflip = true

	zoommoving = false
	zoomnotmoving =false
}




function BubblesBase (x, y, z, r, up) {
	this.bx = x;
	this.by = y;
	this.bz = z;
	this.br = r;
	this.lifetime = 50;
	this.update = function () {
		this.by -= up;
		this.lifetime--;
	}
	this.render = function () {
		noStroke ();
		push ();
		fill(255, map(this.lifetime, 100, -100, 0, 100))
		translate (this.bx - width / 2.0, this.by - height / 2.0, this.bz);
		sphere (this.br * 1.0);
		pop ();
	}
}

function CoralOne(){
  
  
  translate(-windowWidth/2, -windowHeight/2, 0)
  //specularMaterial(250)

  rotateY(millis() / 20)
  normalMaterial()
  shininess(10)
  scale(50)
  fill( 105, 191, 142)
  model(coraluno)
 
}

function coralbeherewithme(){
	
	translate(0, 0, 0)
	push()
	specularMaterial(250)
	rotateX(millis() / 20)
	rotateY(millis() / 20)	
	shininess(10)
    scale(50)
    fill( 30, 143, 30)
    model(coraluno)
	pop()
 
}

function CoralOneLeaving(){
 
  translate(-windowWidth/4 +300, -windowHeight/2, -400)
  push()
  //rotateY(90)
  rotateY(millis() / 50)
  specularMaterial(2)
  //normalMaterial()
  scale(50)
  //fill(242, 119, 119)
  fill(242, 124, 203)
  model(coralduo)
  pop()
  

}

function coralunodeparture(){

	coralhere = false
	coralfade = true

}

function newcoral(){
	
	coralishere = true
}

function CoralTwo(coralishere){
  if(coralishere){
  translate(-windowWidth/4, -windowHeight/2, -400)
  rotateY(90)
  specularMaterial(2)
  scale(30)
  fill(242, 119, 119)
  model(coralduo)
  }
}



class Coral{
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.a = 0;
		this.av = random(-1, 1);
		if (abs(this.av) < 0.1) this.av = random(0.1, 0.9);
		this.size = size;
	}
	show() {
		push();
		translate(this.x, this.y, 0);
		rotateX(this.a);
		rotateY(75 + this.a);
		noStroke();
		fill(105, 191, 142)
		translate(1.1 * this.size,  4/ this.size, 24)
		scale(2)
		model(fishtrio)
		
		specularMaterial(2);
		translate(10.09 * this.size, 3 / this.size)
		fill(242, 205, 136)
		scale(4)
		model(fishtrio);
		specularColor(242, 205, 136)
		fill(242, 205, 136, 100, 10)
		scale(0.2)
		model(fishtrio);
		
		translate(0, 1.62 / this.size2, 0);
		push();
		rotateX(190);

		translate(.9 / this.size*3, 8/ this.size)
		scale(1)
		model(fishtrio)

		translate(-.7 / this.size*6, 5/this.size)
		scale(3)
		model(fishtrio)

		specularMaterial(10);
		translate(1.08 * this.size*20, 0.04 * this.size)
		scale(1)
		fill(105, 191, 142)
		model(fishtrio);
		scale(0.3)
		specularColor(105, 191, 142)
		fill(105, 191, 142, 100)
		model(fishtrio);
		pop();

		translate(0, -3.24 * this.size, 0);
		push();
		rotateX(90);
		translate(.9 * this.size, 0.02 * this.size)
		scale(2)
		model(fishtrio);
		specularMaterial(4);
		translate(.9 * this.size, 0.02 * this.size)
		fill(105, 191, 142, 10)
		scale(0.2)
		model(fishtrio);

		translate(.7 * this.size, 0.02 * this.size)
		scale(4)
		fill(105, 191, 142)
		model(fishtrio);
		specularMaterial(3);
		specularColor(105, 191, 142)
		scale(0.2)
		fill(105, 191, 142, 10)
		model(fishtrio);
		specularMaterial(3);
		
		translate(1.08 * this.size, 0.04 * this.size)
		model(fishtrio);
		pop();
		pop();
	}
	move() {
		this.a += this.av;
	}
}
