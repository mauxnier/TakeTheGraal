var largeur = window.innerWidth; // 'innerWidth' attribut de l'objet 'window'
var hauteur = window.innerHeight;
var deroulementLignes = []; // array --> tableau
var imageFond = [255];
var NON_DEFINI;
var numLigneActuelle = 0;
var personnage = {}; // dictionnaire
var mode = "deroulement";
var niveau = "village_root";
var proprieteA, proprieteB, executionNormale, executionFinale;
var scenarioChoisi = -1;
var niveauFondu = 0;
var vitesseFondu;


function setup(){
	var canvas = createCanvas(largeur, hauteur);
	canvas.parent('cvs-holder'); // le parent du canvas devient 'cvs-holder'
	decouperDeroulement();
}


function coordCurseur(){ // * affiche les coordonnées du curseur sur le canvas * //
	textSize(20);
	text("X et Y : ", width/2-100, 45);
	text(Math.round(mouseX / largeur * 100), width/2-20, 45); //pourcentage
	text(Math.round(mouseY / hauteur * 100), width/2+20, 45); //pourcentage
}


function executerLigne(ligne){ // * interpréteur du code du fichier deroulement (var deroulement) * //
	var arguments = ligne.split(' ');
	var commande = arguments.shift();

	if (commande == 'fond'){ // *** fait apparaître un fond *** //
		var fichier = arguments[0];
		mode = "chargement";
		loadImage("https://killianmonnier.github.io/TakeTheGraal/img/fond/" + fichier, function(img){ imageFond = img; mode = "deroulement"; }); // https://p5js.org/reference/#/p5/loadImage : appelée quand l'image est chargée
	}
	else if (commande == 'summon'){ // *** fait apparaître un personnage *** //
		var nom = arguments[0];
		var positionX = parseInt(arguments[1]) * 0.01 * largeur; // pourcentage
		var positionY = parseInt(arguments[2]) * 0.01 * hauteur; // pourcentage
		var fichier = arguments[3];
		var tailleX = parseInt(arguments[4]) | 100;
		var tailleY = parseInt(arguments[5]) | 100;

		mode = "chargement";
		loadImage("https://killianmonnier.github.io/TakeTheGraal/img/perso/" + fichier, function(img){ // https://p5js.org/reference/#/p5/loadImage : appelée quand l'image est chargée
			img.resize(tailleX, tailleY);
			personnage[nom] = createSprite(positionX, positionY, 100, 100);
			personnage[nom].setCollider('circle', 0, 0, 20);
			personnage[nom].addImage(img);
			mode = "deroulement";
		});
	}
	else if (commande == 'scenario'){ // *** organise les actions par scénarios *** //
		var liste = [];
		niveau = arguments[1]
		console.log(niveau);
		
		for(var i = numLigneActuelle + 1; true; i++){ // boucle jusqu'au break
			var ligneActuelle = deroulementLignes[i];
			if (ligneActuelle == NON_DEFINI || ligneActuelle[0] != '\t') break;
			ligneActuelle = ligneActuelle.replace('\t',''); // remplace le tab par rien donc le supprime
			liste.push(ligneActuelle); // met ligneActuelle(chaîne de caractères) dans la liste
		}
		
		if (parseInt(arguments[0]) == scenarioChoisi){
			deroulementLignes = liste;
			numLigneActuelle = 0;
		} else numLigneActuelle = i;
		
		return;
		
	}
	else if (commande == 'move'){ // *** bouge le personnage jusqu'à un endroit donné à une vitesse et un angle précis *** //
		var nom = arguments[0];
		var vitesse = arguments[1];
		var angle = arguments[2];
		var propriete = arguments[3];
		var siPlusPetitQue = (arguments[4] == '<'); // booléen
		var valeur = parseInt(arguments[5]);
		
		if (propriete == 'x') valeur *= 0.01 * largeur;
		else if (propriete == 'y') valeur *= 0.01 * hauteur;
		
		personnage[nom].setSpeed(vitesse, angle);
	
		persoPosition = function(){ return personnage[nom].position[propriete]; };
		persoValeur = function(){ return valeur; };
		
		proprieteA = siPlusPetitQue ? persoPosition : persoValeur;
		proprieteB = siPlusPetitQue ? persoValeur : persoPosition;
		executionNormale = function(){}; // fonction vide
		executionFinale = function(){ personnage[nom].setSpeed(0, 0); mode = "deroulement"; };
		
		mode = "condition";
	}
	else if (commande == 'teleport'){
		var nom = arguments[0];
		var coordX = arguments[1];
		var coordY = arguments[2];
		personnage[nom].position.x = parseInt(coordX) * 0.01 * largeur; // pourcentage
		personnage[nom].position.y = parseInt(coordY) * 0.01 * hauteur; // pourcentage
	}
	else if (commande == 'wait_scenario'){ // *** bouge le personnage *** //
		scenarioChoisi = -1;
		
		proprieteA = function(){ return -1; };
		proprieteB = function(){ return scenarioChoisi; };
		executionNormale = function(){}; // fonction vide
		executionFinale = function(){ mode = "deroulement"; };
		
		mode = "condition";
	}
	else if (commande == 'sleep'){
		var sleepTime = parseInt(arguments[0]);
		var objectif = sleepTime + second();
		
		proprieteA = function(){ return objectif; };
		proprieteB = second;
		
		executionNormale = function(){}; // fonction vide
		executionFinale = function(){ mode = "deroulement"; };
		
		mode = "condition";
	}
	else if (commande == 'add_scenario'){ // *** bouge le personnage *** //
		var nouveauTexte = arguments.join(' '); // arguments est une liste et join la transforme en chaîne de caractères
		var nouveauBouton = document.createElement('button');
		nouveauBouton.innerText = nouveauTexte;
		nouveauBouton.button_number = choix_bouton.childElementCount; // cette ligne sert à quoi ? $
		nouveauBouton.onclick = cliquerBouton;
		// <button onclick="code javascript">nouveauTexte</button>
		choix_bouton.appendChild(nouveauBouton);
	}
	else if (commande == 'clear_scenarios'){
		choix_bouton.innerHTML = "";
	}
	else if (commande == 'fade_in'){
		vitesseFondu = parseFloat(arguments[0]);
		
		proprieteA = function(){ return 0.9999999; };
		proprieteB = function(){ return niveauFondu };
		
		executionNormale = function(){ niveauFondu += vitesseFondu; fondu.style.backgroundColor = 'rgba(0, 0, 0,' + niveauFondu.toString(); + ')'; };
		executionFinale = function(){ mode = "deroulement"; };
		
		mode = "condition";
	}
	else if (commande == 'fade_out'){
		vitesseFondu = parseFloat(arguments[0]);
		
		proprieteA = function(){ return niveauFondu; };
		proprieteB = function(){ return 0.0000001 };
		
		executionNormale = function(){ niveauFondu -= vitesseFondu; fondu.style.backgroundColor = 'rgba(0, 0, 0,' + niveauFondu.toString(); + ')'; };
		executionFinale = function(){ mode = "deroulement"; };
		
		mode = "condition";
	}
	else if (commande == 'msg'){
		mode = 'message';
		var nouveauTexte = arguments.join(' '); // arguments est une liste et join la transforme en chaîne de caractères
		if (confirm(nouveauTexte)) mode = 'deroulement'; else mode = 'deroulement';
	}
	else if (commande == 'kill'){
		nom = arguments[0];
		personnage[nom].remove();
	}
	else if (commande == 'fight'){
		document.location = 'https://paraceltus.github.io/TakeTheGraal/' + arguments[0] + '.html';
	}
		
	numLigneActuelle++;
}


function cliquerBouton(event){
	scenarioChoisi = event.target.button_number; // l'event c'est 'click' et event.target c'est nouveauBouton
	//console.log(event);
}


function decouperDeroulement(){ // * découpe le deroulement * //
	deroulementLignes = deroulement.split('\n'); // contient tout les arguments du deroulement
}


function verifierCondition(){ // * test, renvoie un booléen * //
	return proprieteA() < proprieteB();
}


function draw(){
	background(imageFond);
	drawSprites();
	//coordCurseur();
	if (mode == "deroulement"){
		if (deroulementLignes[numLigneActuelle] != NON_DEFINI) executerLigne(deroulementLignes[numLigneActuelle]);
	} else if (mode == "condition"){
		if (verifierCondition()) executionFinale(); // si verifierCondition() = True alors executionFinale() sinon executionNormale()
		else executionNormale();
	}
}
