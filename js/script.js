var imgfond;
var imgfondinv;
var fond;
var fond2;
var titre;
var imgtitre;


function preload(){
	imgfond = loadImage ("img/home/cheminForet.png");
	imgfondinv = loadImage ("img/home/cheminForetInverse.png");
	imgtitre = loadImage ("img/home/titre.png");
}

function setup() {
	createCanvas ((window.innerWidth),(window.innerHeight));
	background (255,0,0);
	fond = createSprite((window.innerWidth/2),100);
	fond.addImage (imgfond);
	fond2 =createSprite ((window.innerWidth/2),(100-imgfond.height));
	fond2.addImage (imgfondinv);
	titre = createSprite((window.innerWidth/1.8),300);
	titre.addImage (imgtitre);
}

function draw() {
	drawSprites();
	bouger();
	replacement();
}


function bouger() {
	fond.position.y += 2;
	fond2.position.y += 2;
}

function replacement () {
	if (fond.position.y > (window.innerHeight/1.8) && (fond2.position.y >= (window.innerHeight/2))){
		fond.position.y -= (2*imgfond.height);
	}
	if ((fond2.position.y > (window.innerHeight/1.8)) && (fond.position.y >= (window.innerHeight/2))){
		fond2.position.y -= (2*imgfond.height);
	}
}
