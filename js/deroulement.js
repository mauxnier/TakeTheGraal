// This is my own 'programming language'

var deroulement = `

fond placeVillageSansFoule.png
summon joueur 50 50 mage.png 260 250
summon roi 50 15 roi.png 250 250
clear_scenarios
add_scenario Aller à gauche
add_scenario Aller à droite
wait_scenario
clear_scenarios
scenario 1 grotte-1
	move joueur 5 0 x > 93
	move joueur 5 270 y < -20
	fade_in 0.01
	kill roi
	teleport joueur 52 130
	fond cheminForet.png
	fade_out 0.01
	move joueur 5 270 y < -30
	fade_in 0.05
	teleport joueur 40 130
	fond cheminGrotte.png
	fade_out 0.05
	move joueur 5 270 y < 65
	add_scenario Explorer la grotte
	add_scenario Prendre le chemin de droite
	wait_scenario
	clear_scenarios
	scenario 1 contourne-1.1
		move joueur 5 350 x > 120
		fade_in 0.01
		teleport joueur 36 130
		fond maisonFerme.png
		fade_out 0.01
		move joueur 3 270 y < 85
		add_scenario Dormir dans la maison
		add_scenario Continuer tout de même
		wait_scenario
		clear_scenarios
		scenario 1 continue-1.1.1
			move joueur 5 0 x > 65
			move joueur 5 270 y < 40
			move joueur 5 0 x > 130
			fade_in 0.01
			summon paladin 45 45 paladin.png 270 250
			teleport joueur 53 130
			fond cheminForet.png
			fade_out 0.01
			move joueur 5 270 y < 50
			msg Mais qui est cet homme ? Un aventurier ?
			add_scenario Continuer l'aventure avec cet étranger
			add_scenario Continuer tout seul
			wait_scenario
			clear_scenarios
			scenario 0 sympa-1.1.1.1
				move joueur 5 270 y < -30
				move paladin 2 0 x > 53
				move paladin 7 270 y < -30
				fade_in 0.01
				teleport joueur 52 130
				teleport paladin 52 130
				fond grotteCedre.png
				fade_out 0.01
				move joueur 5 270 y < 80
				msg Wow ! Quelle est cette grotte ?
				move joueur 5 270 y < 50
				kill joueur
				move paladin 7 270 y < 50
				kill paladin
				msg Ahhh ! Qu'est ce qu'il te prend !!
				msg Oh non ! L'étranger vous attaque !
				msg Déplacez-vous avec les touches ZQSD, visez avec le curseur de la souris et cliquez pour lancer un sort !  
				fight combatPaladin
			scenario 1 laisse-1.1.1.2
				move joueur 5 270 y < -30
				fade_in 0.01
				kill paladin
				teleport joueur 52 130
				fond grotteCedre.png
				fade_out 0.01
				move joueur 5 270 y < 80
				msg Wow ! Quelle est cette grotte ?
				move joueur 5 270 y < 50
				kill joueur
				msg Ahhh ! C'est qui !?
				msg Oh non ! Un brigant vous attaque !
				msg Déplacez-vous avec les touches ZQSD, visez avec le curseur de la souris et cliquez pour lancer un sort ! 
				fight combatBrigant
		scenario 0 repos-1.1.2
			move joueur 5 270 y < 75
			fade_in 0.05
			teleport joueur 40 110
			fond interieurMaisonFerme.png
			fade_out 0.05
			move joueur 3 270 y < 65
			move joueur 2 0 x > 60
			move joueur 1 270 y < 48
			msg Après une dure journée vous tombez de fatigue
			fade_in 0.003
			summon ours 78 60 ours.png 300 250
			fade_out 0.1
			add_scenario Combattre l'ours
			add_scenario Dresser l'ours
			add_scenario Fuir de la maison
			msg Oh ! Un ours qui semble agressif vous a réveillé en sursaut ! 
			wait_scenario
			clear_scenarios
			scenario 0 gagne-1.1.2.1
				summon feu 78 60 feu.png 300 250
				sleep 0.5
				kill ours
				kill feu
				msg Après un combat dantesque vous avez enfin pu vaincre cette horrible bête !
				move joueur 5 90 y > 65
				move joueur 5 180 x < 40
				move joueur 5 90 y > 130
				fade_in 0.05
				teleport joueur 40 75
				fond maisonFerme.png
				fade_out 0.05
				move joueur 5 90 y > 80
				move joueur 5 0 x > 65
				move joueur 5 270 y < 40
				move joueur 5 0 x > 130
				fade_in 0.01
				teleport joueur 53 130
				fond cheminForet.png
				fade_out 0.01
				move joueur 5 270 y < 60
				msg Encore ce chemin !?
				move joueur 5 270 y < -30
				fade_in 0.01
				teleport joueur 52 130
				fond grotteCedre.png
				fade_out 0.01
				move joueur 5 270 y < 80
				msg Wow ! Quelle est cette grotte ?
				move joueur 5 270 y < 50
				kill joueur
				msg Ahhh ! C'est qui ?!
				msg Oh non ! Un brigant vous attaque !
				msg Déplacez-vous avec les touches ZQSD, visez avec le curseur de la souris et cliquez pour lancer un sort ! 
				fight combatBrigant
			scenario 2 fuir-1.1.2.2
				move joueur 10 90 y > 65
				move joueur 10 180 x < 40
				move joueur 10 90 y > 130
				fade_in 0.05
				teleport joueur 40 75
				fond maisonFerme.png
				fade_out 0.05
				move joueur 5 90 y > 80
				move joueur 5 0 x > 65
				move joueur 5 270 y < 40
				move joueur 5 0 x > 130
				fade_in 0.01
				summon paladin 40 50 paladin.png 270 250
				teleport joueur 53 130
				fond cheminForet.png
				fade_out
				move joueur 5 270 y < 50
				msg Mais qui est cet homme ? Un aventurier ?
				add_scenario Continuer l'aventure avec cet étranger
				add_scenario Continuer tout seul
				wait_scenario
				clear_scenarios
				scenario 0 sympa-1.1.2.2.1
					move joueur 5 270 y < -30
					move paladin 2 0 x > 55
					move paladin 7 270 y < -30
					fade_in 0.01
					teleport joueur 52 130
					teleport paladin 52 130
					fond grotteCedre.png
					fade_out 0.01
					move joueur 5 270 y < 80
					msg Wow ! Quelle est cette grotte ?
					move joueur 5 270 y < 50
					kill joueur
					move paladin 7 270 y < 50
					kill paladin
					msg Ahhh ! Qu'est ce qu'il te prend !!
					msg Oh non ! L'étranger vous attaque !
					msg Déplacez-vous avec les touches ZQSD, visez avec le curseur de la souris et cliquez pour lancer un sort ! 
					fight combatPaladin
				scenario 1 laisse-1.1.2.2.2
					move joueur 5 270 y < -30
					fade_in 0.01
					kill paladin
					teleport joueur 52 130
					fond grotteCedre.png
					fade_out 0.01
					move joueur 5 270 y < 80
					msg Wow ! Quelle est cette grotte ?
					move joueur 5 270 y < 50
					kill joueur
					msg Ahhh ! C'est qui ?!
					msg Oh non ! Un brigant vous attaque !!
					msg Déplacez-vous avec les touches ZQSD, visez avec le curseur de la souris et cliquez pour lancer un sort ! 
					fight combatBrigant
			scenario 1 ours-1.1.2.3
				msg Après un tour de passe-passe vous avez réussi à amadouer l'ours
				add_scenario Continuer l'aventure avec ce gentil nounours
				add_scenario Continuer tout seul
				wait_scenario
				clear_scenarios
				scenario 0 sympa-1.1.2.3.1
					msg Ours : Agrouhh Agrouhhh !
					msg Tiens ! Je vais t'appeler 'Grougrou' !
					move joueur 5 90 y > 65
					move joueur 5 180 x < 40
					move joueur 5 90 y > 130
					move ours 5 90 y > 65
					move ours 5 180 x < 40
					move ours 5 90 y > 130
					fade_in 0.05
					teleport joueur 40 75
					fond maisonFerme.png
					fade_out 0.05
					move joueur 5 90 y > 80
					move joueur 5 0 x > 65
					move joueur 5 270 y < 40
					move joueur 5 0 x > 130
					teleport ours 40 75
					msg Ours : Agrouh ?
					move ours 5 90 y > 80
					move ours 5 0 x > 65
					move ours 5 270 y < 40
					move ours 5 0 x > 130
					fade_in 0.01
					teleport joueur 53 130
					teleport ours 53 130
					fond cheminForet.png
					fade_out 0.01
					move joueur 5 270 y < 40
					move ours 5 270 y < 70
					msg Encore ce chemin ?!
					msg Ours : Agrouhhhh ?!
					move joueur 5 270 y < -30
					move ours 5 270 y < -30
					fade_in 0.01
					teleport joueur 52 130
					teleport ours 52 130
					fond grotteCedre.png
					fade_out 0.01
					move joueur 5 270 y < 80
					msg Wow ! Quelle est cette grotte ?
					msg Tu viens Grougrou ?
					move joueur 5 270 y < 50
					kill joueur
					msg AAAAAGGGGROUHHHHH !!!!!
					move ours 10 270 y < 75
					kill ours
					msg AAAHHH ! Mais c'est quoi ?!
					msg Quoi ?! Grougrou vous attaque !!
					msg Déplacez-vous avec les touches ZQSD, visez avec le curseur de la souris et cliquez pour lancer un sort ! 
					fight combatOurs
				scenario 1 laisse-1.1.2.3.2
					move joueur 5 90 y > 65
					move joueur 5 180 x < 40
					move joueur 5 90 y > 130
					fade_in 0.05
					teleport joueur 40 75
					fond maisonFerme.png
					fade_out 0.05
					move joueur 5 90 y > 80
					move joueur 5 0 x > 65
					move joueur 5 270 y < 40
					move joueur 5 0 x > 130
					fade_in 0.01
					teleport joueur 53 130
					fond cheminForet.png
					fade_out 0.01
					move joueur 5 270 y < 60
					msg Encore ce chemin !?
					move joueur 5 270 y < -30
					fade_in 0.01
					teleport joueur 52 130
					fond grotteCedre.png
					fade_out 0.01
					move joueur 5 270 y < 80
					msg Wow ! Quelle est cette grotte ?
					move joueur 5 270 y < 50
					kill joueur
					msg Oh non ! Un brigant vous attaque !!
					msg Déplacez-vous avec les touches ZQSD, visez avec le curseur de la souris et cliquez pour lancer un sort ! 
					fight combatBrigant
	scenario 0 explore-1.2
		move joueur 5 270 y < 35
		fade_in 0.05
		teleport joueur 33 130
		fond interieur_grotte.png
		fade_out 0.05
		move joueur 5 270 y < 45
		move joueur 5 315 y < -30
		kill joueur
		msg Ahhh ! C'est qui ?!
		msg Oh non ! Un brigant vous attaque !
		msg Déplacez-vous avec les touches ZQSD, visez avec le curseur de la souris et cliquez pour lancer un sort ! 
		fight combatBrigant
scenario 0 combat-2
	move joueur 5 180 x < 10
	move joueur 5 270 y < -30
	kill joueur
	msg Ahhh ! C'est qui ?!
	msg Oh non ! Un brigant vous attaque !
	msg Déplacez-vous avec les touches ZQSD, visez avec le curseur de la souris et cliquez pour lancer un sort ! 
	fight combatBrigant
`; // chaîne de caractères multi-lignes

/*
fond --> nom de l'image

summon --> nom du joueur / coordonnée x / coordonnée y / nom de l'image

teleport --> joueur / coordonnée x / coordonnée y

scenario --> numéro du scénario

move --> nom du joueur / vitesse du joueur / angle de déplacement / composante à tester / operateur de comparaison / valeur

wait_scenario --> 'rien'

sleep --> le nombre de seconde à attendre avant de recommencer

add_scenario --> texte du bouton

clear_scenarios --> 'rien'

msg --> le msg à afficher

fight --> nom de la page html
*/