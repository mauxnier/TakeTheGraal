// Maybe a little bit overcommented sry XD | https://www.reddit.com/r/ProgrammerHumor/comments/adnp6b/people_who_overcomment_their_code_like_idiots_who/

var joueur_1;				//variable donnée au sprite du joueur 1
var imgjoueur_1;			//variable dans laquelle on met l'image du sprite du joueur 1
var ennemi_1;				//variable donnée au sprite de l'ennemi
var imgennemi_1;			//variable dans laquelle on met l'image du sprite de l'ennemi 1
var sort_a;					//variable donnée au sprite du sort du personnage
var imgsort_a;				//variable dans laquelle on met l'image du sprite du sort du personnage
var combat = true;			//variable qui permet de détecter si le combat est toujours en cours
var lancer_sort_a = false;	//variable détectant si le sort du personnage est lancer
var posXennemi;				//variable indiquant la position en X de l'ennemi 1
var posYennemi;				//variable indiquant la position en Y de l'ennemi 1
var sort_lancer = false;	//variable indiquant si l'on peut lancer un sort		
var start;					//variable permettant de stocker le temps à différents moments
var ep = true;				//variable indiquant si l'on peut relancer un sort selon l'endroit où il est
var dir_ennemi_1;			//variables donnant la direction dans laquelle l'ennemi 1 se déplace
var Z_code = 90;			//variable contenant le code ASCII de la touche z
var Q_code = 81;			//variable contenant le code ASCII de la touche q
var S_code = 83;			//variable contenant le code ASCII de la touche s
var D_code = 68;			//variable contenant le code ASCII de la touche d
var pv_j1 =5;				//variable contenant les pv du joueur 1
var pv_e1 =5;				//variable contenant les pv de l'ennemi 1
var prendre_degat =true;	//variable détectant si les entités peuvent se prendre des dégats
var prendre_degat_time;		//variable permettant d'enregistrer un temps avant de pouvoir prendre des dégats
var sourisX;				//variable détectant la position en X de la souris
var sourisy;				//variable détectant la position en Y de la souris
var direction_sort_a;		//variable dans laquelle sera la direction que le sort doit prendre
var time_sort = true;		//variable qui permet de detecter si l'on peut relancer un sort selon le temps depuis le dernier
var timer_sort;				//variable qui compte le temps passé depuis le lancer du sort
var imgfond;				//variable qui contiendra l'image de fond
var test = true;



function preload () {									//fonction qui permet de pré-charger les sons et images qui seront utiliser 
	imgjoueur_1 = loadImage ("../img/fight/mage.png");		//on rentre l'image qui sera dans le sprite du joueur 1 dans la variable imgjoueur_1
	imgennemi_1 = loadImage ("../img/fight/ours.png");		//on rentre l'image qui sera dans le sprite de l'ennemi_1 dans la variable imgennemi_1
	imgsort_a = loadImage ("../img/fight/feu.png");			//on rentre l'image qui sera dans le sprite du sort du joueur_1
	imgfond = loadImage ("../img/fight/salleAvecGraal.png");	//on rentre l'image de fond
}

function setup () {		
	createCanvas (window.innerWidth,window.innerHeight);						//on défini un canvas aux dimensions de l'écran
	background (imgfond);														//on donne une image au fond du canvas
	joueur_1 = createSprite ((window.innerWidth/2)+200,(window.innerHeight/2));	//on place le sprite du joueur 1	
	joueur_1.addImage (imgjoueur_1);											//on donne une image au sprite du joueur 1
	joueur_1.setCollider ("rectangle",0,0,70,45);								//on défini la zone de collision du joueur 1 à un cercle de 50/50 px
	imgjoueur_1.resize(150,100);												//on redéfini la taille de l'image du sprite du joueur 1
	ennemi_1 = createSprite ((window.innerWidth/2)-200,(window.innerHeight/2));	//on place le sprite de l'ennemi 1
	ennemi_1.addImage (imgennemi_1);											//on donne une image au sprite de l'ennemi 1
	ennemi_1.setCollider ("rectangle",0,0,70,70);								//on défini la zone de collision de l'ennemi 1 à un cercle de 50/50 px
	imgennemi_1.resize (150,150);												//on redéfini la taille de l'image du sprite de l'ennemi 1
	imgsort_a.resize (75,75);													//on redimenssione l'image du sort du joueur 1
	start= millis();															//on donne à la variable start la valeur du temps qui s'est ecoulé depuis le lancement du programme
}


function draw () {																//fonction qui affiche les éléments à l'écran
	bouger ();																	//on appelle la fonction bouger
	direction_ennemi_1();														//on appelle la fonction direction_ennemi_1
	keyPressCallback ();														//on appelle la fonction keyPressCallback
	ennemi_1.collide(joueur_1,degat_joueur);									//on appelle la fonction degat_joueur si l'ennemi 1 touche le joueur_1
	if (lancer_sort_a == true) sort_a.collide(ennemi_1,degat_ennemi);			//on vérifie si le sort du joueur 1 est activé et touche l'ennemi 1 auquel cas on appelle la fonction degat_ennemi
	background (imgfond);														//on donne une image au fond du canvas
	bord ();																	//on appelle la fonction bord
	timer();																	//on appelle la fonction timer
	mort();																		//on appelle la fonction mort
	drawSprites ();																//on appelle la fonction drawSprites
	if (pv_j1 > 0 && pv_e1 >0) {												//on vérifie si le combat est toujours en cours
		fill (0,0,255);															//on donne une couleur au texte qui va être affiché
		textSize (45);															//on donne une taille au texte qui va être affiché
		message=text ("pv J1 : "+ pv_j1,10,45);									//on écrit les points de vie du joueur_1
	}
	if (pv_e1 > 0 && pv_j1 >0) {												//on vérifie si le combat est toujours en cours
		fill (0,0,255);															//on donne une couleur au texte qui va être affiché
		textSize (45);															//on donne une taille au texte qui va être affiché
		text ("pv E1 : "+ pv_e1,(window.innerWidth-180),45);					//on écrit les points de vie de l'ennemi 1
	}
	if (pv_j1 <= 0) {																	//on vérifie si il reste des points de vie au joueur 1
		textSize (100);																	//on donne une taille au texte qui va être affiché
		fill (255,165,0);																//on donne une couleur au texte qui va être affiché
		text ("Tu as perdu !",((window.innerWidth/3)-50),(window.innerHeight/2));		//on indique au joueur qu'il a perdu
		retry.style.display = "block";													//on affiche le lien pour continuer
	}
	if (pv_e1 <= 0) {																	//on vérifie si il reste des points de vie à l'ennemi 1
		textSize (100);																	//on donne une taille au texte qui va être affiché
		fill (255,165,0);																//on donne une couleur au texte qui va être affiché
		text ("Tu as gagné !",((window.innerWidth/3)-50),(window.innerHeight/2));		//on indique au joueur qu'il a gagné
		continuer.style.display = "block";	
	}
}


function bord () {																														//on défini la fonction bord
	while ((joueur_1.position.x < (0+(imgjoueur_1.height/2))) && (joueur_1.position.y < (window.innerHeight/2))) {						//on vérifie si le joueur 1 touche le bord gauche de l'écran et si il est au dessus de la moitié de l'écran
		joueur_1.position.x = (0+(imgjoueur_1.height/2));																				//on empêche le joueur 1 d'aller plus à gauche 
		joueur_1.position.y = (joueur_1.position.y-2);																					//on fait lentement coulissé le joueur 1 vers le haut
	}
	
	while ((joueur_1.position.x < (0+(imgjoueur_1.height/2))) && (joueur_1.position.y >= (window.innerHeight/2))) {						//on vérifie si le joueur 1 touche le bord gauche de l'écran et si il est en dessous de la moitié de l'écran
		joueur_1.position.x = (0+(imgjoueur_1.height/2));																				//on empêche le joueur 1 d'aller plus à gauche 
		joueur_1.position.y = (joueur_1.position.y+2);																					//on fait lentement coulissé le joueur 1 vers le bas
	}
	
	while (joueur_1.position.y < (0+(imgjoueur_1.height/2))) {																			//on vérifie si le joueur 1 touche le haut de l'écran
		joueur_1.position.y = (0+(imgjoueur_1.height/2));																				//on empêche le joueur 1 d'aller plus haut
	}
	
	while ((joueur_1.position.x > (window.innerWidth-(imgjoueur_1.height/2))) && (joueur_1.position.y >= (window.innerHeight/2))) {		//on vérifie si le joueur 1 touche le bord droit de l'écran et si il est en dessous de la moitié de l'écran
		joueur_1.position.x = (window.innerWidth-(imgjoueur_1.height/2));																//on empêche le joueur 1 d'aller plus à droite
		joueur_1.position.y = (joueur_1.position.y+2);																					//on fait lentement coulissé le joueur 1 vers le bas
	}
	
	while ((joueur_1.position.x > (window.innerWidth-(imgjoueur_1.height/2))) && (joueur_1.position.y < (window.innerHeight/2))) {		//on vérifie si le joueur 1 touche le bord droit de l'écran et si il est au dessus de la moitié de l'écran
		joueur_1.position.x = (window.innerWidth-(imgjoueur_1.height/2));																//on empêche le joueur 1 d'aller plus à droite
		joueur_1.position.y = (joueur_1.position.y-2);																					//on fait lentement coulissé le joueur 1 vers le haut
	}
	
	while (joueur_1.position.y > (window.innerHeight-(imgjoueur_1.height/2))) {															//on vérifie si le joueur 1 touche le bas de l'écran
		joueur_1.position.y = (window.innerHeight-(imgjoueur_1.height/2));																//on empêche le joueur 1 d'aller plus bas
	}
	
	while ((ennemi_1.position.x < (0+(imgennemi_1.height/2))) && (ennemi_1.position.y < (window.innerHeight/2))) {						//on vérifie si l'ennemi 1 touche le bord gauche de l'écran et si il est au dessus de la moitié de l'écran
		ennemi_1.position.x = (0+(imgennemi_1.height/2));																				//on empêche le l'ennemi 1 d'aller plus à gauche
		ennemi_1.position.y = (ennemi_1.position.y-2);																					//on fait lentement coulissé l'ennemi 1 vers le haut
	}
	
	while ((ennemi_1.position.x < (0+(imgennemi_1.height/2))) && (ennemi_1.position.y >= (window.innerHeight/2))) {						//on vérifie si l'ennemi 1 touche le bord gauche de l'écran et si il est en dessous de la moitié de l'écran
		ennemi_1.position.x = (0+(imgennemi_1.height/2));																				//on empêche l'enemi 1 d'aller plus à gauche
		ennemi_1.position.y = (ennemi_1.position.y+2);																					//on fait lentement coulissé l'ennemi 1 vers le bas
	}
	
	while (ennemi_1.position.y < (0+(imgennemi_1.height/2))) {																			//on vérifie si l'ennemi 1 touche le haut de l'écran
		ennemi_1.position.y = (0+(imgennemi_1.height/2));																				//on empêche l'ennemi 1 d'aller plus haut
	}
	
	while ((ennemi_1.position.x > (window.innerWidth-(imgennemi_1.height/2))) && (ennemi_1.position.y >= (window.innerHeight/2))) {		//on vérifie si l'ennemi 1 touche le bord droit de l'écran et si il est en dessous de la moitié de l'écran
		ennemi_1.position.x = (window.innerWidth-(imgennemi_1.height/2));																//on empêche l'ennemi 1 d'aller plus à droite
		ennemi_1.position.y = (ennemi_1.position.y+2);																					//on fait lentement coulissé l'ennemi 1 vers le bas
	}
	
	while ((ennemi_1.position.x > (window.innerWidth-(imgennemi_1.height/2))) && (ennemi_1.position.y < (window.innerHeight/2))) {		//on vérifie si l'ennemi 1 touche le bord droit de l'écran et si il est au dessus de la moitié de l'écran
		ennemi_1.position.x = (window.innerWidth-(imgennemi_1.height/2));																//on empêche l'ennemi 1 d'aller plus à droite
		ennemi_1.position.y = (ennemi_1.position.y-2);																					//on fait lentement coulissé l'ennemi 1 vers le haut
	}
	
	while (ennemi_1.position.y > (window.innerHeight-(imgennemi_1.height/2))) {															//on vérifie si l'ennemi 1 touche le bas de l'écran
		ennemi_1.position.y = (window.innerHeight-(imgennemi_1.height/2));																//on empêche l'ennemi 1 d'aller plus bas
	}
}

function keyPressCallback () {																														//on défini la fonction keyPressCallback (fonction P5)
	if (lancer_sort_a == true){																														//on vérifie si le sort du joueur_1 à été lancer
		if (sort_a.position.x < 0 || sort_a.position.x > window.innerWidth || sort_a.position.y < 0 || sort_a.position.y >window.innerHeight) {		//on vérifie si sa position dépasse un bord de l'écran
			sort_a.remove();																														//on enlève le sprite du sort
			sort_lancer = false;																													//on indique que plus aucun sort n'est en cours
			ep = true;																																//on indique que l'on peut choisir une nouvelle direction pour le sort du joueur 1
		}
	}
}

/*function detection_ennemis () {																	//première tentative de diriger le sort (quasi fonctionelle)
	if (lancer_sort_a == true){
		posXennemi = ennemi_1.position.x;
		posYennemi = ennemi_1.position.y;
		if (posXennemi <= sort_a.position.x && posYennemi <= sort_a.position.y){
			sort_a.setSpeed (15, direction_sort);
		}
		if (posXennemi > sort_a.position.x && posYennemi > sort_a.position.y){
			sort_a.setSpeed (15, direction_sort);
		}
		if (posXennemi <= sort_a.position.x && posYennemi > sort_a.position.y){
			sort_a.setSpeed (15, direction_sort);
		}
		if (posXennemi > sort_a.position.x && posYennemi <= sort_a.position.y){
			sort_a.setSpeed (15, direction_sort);
		}
		if (posXennemi == sort_a.position.x && posYennemi == sort_a.position.y) {
			sort_a.setSpeed (0,0);
			sort_lancer = false;
		}
	}
}*/

function bouger() {								//on défini la fonction bouger
	if (combat == true){						//on vérifie si le combat est enore en cours
		if (keyIsDown(Q_code)) {				//on vérifie si l'on appuie sur la touche Q
			joueur_1.position.x -= 7;			//on déplace le joueur 1 vers la gauche 
		}
		if (keyIsDown(Z_code)) {				//on vérifie si l'on appuie sur la touche Z
			joueur_1.position.y -= 7;			//on déplace le joueur 1 vers le haut
		}
		if (keyIsDown(S_code)) {				//on vérifie si l'on appuie sur la touche S
			joueur_1.position.y += 7;			//on déplace le joueur 1 vers le bas
		}
		if (keyIsDown(D_code)) {				//on vérifie si l'on appuie sur la touche D
			joueur_1.position.x += 7;			//on déplace le joueur 1 vers la droite
		}
	}
}

function ennemi_1_attaque () {					//on défini la fonction ennemi_1_attaque
	ennemi_1.setSpeed (9, dir_ennemi_1);		//on donne une vitesse et une direction à l'ennemi_1 
	if (pv_j1 <= 0) ennemi_1.setSpeed (0,0);	//on vérifie si le joueur 1 a encore des points de vie ,sinon l'ennemi s'arrête
}

function direction_ennemi_1 () {																										//on défini la fonction direction_ennemi_1
	if (millis() > (start+100)){																										//on execute les instructions d'après toute les 100 millisecondes
		if (ennemi_1.position.x <= joueur_1.position.x && ennemi_1.position.y <= joueur_1.position.y) dir_ennemi_1 = random(10,80);		//si l'ennemi 1 est à gauche et au dessus du joueur 1 , sa direction change vers le bas à droite
		if (ennemi_1.position.x > joueur_1.position.x && ennemi_1.position.y > joueur_1.position.y) dir_ennemi_1 = random(170,260);		//si l'ennemi 1 est à droite et en dessous du joueur 1 , sa direction change vers le haut à gauche
		if (ennemi_1.position.x  <= joueur_1.position.x && ennemi_1.position.y > joueur_1.position.y) dir_ennemi_1 = random(280,350);	//si l'ennemi 1 est à gauche et en dessous du joueur 1 , sa direction change vers le haut à droite
		if (ennemi_1.position.x > joueur_1.position.x && ennemi_1.position.y <= joueur_1.position.y) dir_ennemi_1 = random(80,170);		//si l'ennemi 1 est à droite et au dessus du joueur 1 , sa direction change vers le bas à gauche
		start= millis();																												//on réinitialise le chronometre après avoir choisi la direction de l'ennemi_1
	}
	
}

function timer () {														//on défini la fonction timer
	setTimeout (ennemi_1_attaque, 900);								//on laisse un délai de 1,5 seconde avant que l'ennemi 1 attaque
	if (millis() > prendre_degat_time +500) prendre_degat = true;		//on vérifie si le joueur 1 ne sait pris aucun dégat depuis 0,5 secondes auquel cas on autorise le joueur_1 à reprendre des dégats
	if (millis() > timer_sort + 700) time_sort = true;					//on vérifie si aucun sort n'a été lancé depuis 0,7 secondes auquel cas on autorise le joueur 1 à relancer un sort
}

function degat_joueur() {					//on défini la fonction degat_joueur
	if (prendre_degat == true) {			//on vérifie si le joueur 1 peut se prendre des dégats
		pv_j1 -= 1;							//le joueur 1 se prend 1 point de dégat 
		prendre_degat = false;				//on bloque l'autorisation d'infliger des dégats au joueur 1
		prendre_degat_time = millis();		//on reinitialise le chronometre permettant de donner l'autorisation au joueur 1 de prendre des dégats
	}
}

function degat_ennemi() {		//on défini la fonction degat_ennemi
	pv_e1 -=1;					//l'ennemi 1 se prend 1 point de dégat
	sort_a.remove();			//on fait disparaître le sprite du sort du joueur 1 
	lancer_sort_a = false;		//on indique que le sort a n'est pas activé
	sort_lancer = false;		//on indique que auncun sort n'est en train de se dérouler
	ep = true;					//on indique que l'on peut choisir une nouvelle direction pour le sort du joueur 1
}

function mort () {				//on défini la fonction mort
	if (pv_e1 == 0){			//on vérifie si les points de vie du joueur 1 sont épuisé
	if (test == true) {
		alert ("Après un combat acharné vous avez réussi à tuer l'ennemi, vous prenez la calice et buvez son contenu ... ");
		test = false;
	}
	ennemi_1.remove();			//on enlève le sprite du joueur 1
	combat = false;				//on arrête le combat
	}
	if (pv_j1 == 0) {			//on vérifie si les points de vie de l'ennemi 1 sont épuisé
		joueur_1.remove();		//on enlève le sprite de l'ennemi 1
		combat = false;			//on arrête le combat
	}
}

function mouseClicked () {																//on défini la fonction mouseClicked   (détecte le clic gauche la souris)
	if (combat == true){																//on vérifie si le combat est en cours
		if (time_sort == true){															//on vérifie si le temps depuis le dernier est suffisant
			if (sort_lancer == false){													//on vérifie si aucun sort n'est en cours
				sort_a = createSprite ((joueur_1.position.x),(joueur_1.position.y));	//on créé le sprite du sort du joueur  sur la position du joueur 1
				sort_a.addImage(imgsort_a);												//on associe l'image au sprite du sort du joueur 1
				sort_lancer = true;														//on indique que un sort est activé
				lancer_sort_a = true;													//on indique que le sort du joueur 1 est activé
			}
			if (ep == true){															//on vérifie si l'on peut choisir un nouvelle direction pour le sort du joueur 1
				sourisX =(mouseX);														//on défini la variable sourisX comme étant la position de la souris en X
				sourisy =(mouseY);														//on défini la variable sourisY comme étant la position de la souris en Y
				distance_x = (sourisX-joueur_1.position.x);								//on calcule la distance en X entre le joueur 1 et la souris
				distance_y = (sourisy-joueur_1.position.y);								//on calcule la distance en Y entre le joueur 1 et la souris
				direction_sort_a = Math.atan2(distance_y,distance_x);					//(fonction donnée par NATHAN ROYER) fonction qui permet de calculer l'angle en radian dans lequelle doit partir le sort du joueur 1
				direction_sort_a = (direction_sort_a * (180/PI));						//conversion de la valeur de la direction de radians en degrés
				if (lancer_sort_a == true ){											//on détecte si le sort du joueur 1 est activé
				sort_a.setSpeed(10,direction_sort_a);									//on donne une vitesse et la direction que l'on vient de calculer au sort du joueur 1
				}
				ep = false;																//on indique que l'on ne peut pas choisir de direction pour le sort du joueur 1
				time_sort = false;														//on indique que le temps depuis le dernier sort lancer est insuffisant
			}
		}
	timer_sort = millis();																//on réinitialise le chronomètre qui donne l'autorisation de relancer un sort
	}
}