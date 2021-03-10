const tour = document.querySelector("#tour");
const alert = document.querySelector(".alert");
const messagej1 = document.querySelector("#j1");
const messagej2 = document.querySelector("#j2");
var joueurEnCours = 1;
var finJeu = false;

var pointJ1 = 0;
var pointJ2 = 0;

var isIAON = false;

initialisationTableau();
jeu.initialisation();
jeu.afficherPuissance4();
//Permet d'effectuer des tests grâces à la fonction placeForTest()
/* placeForTest(0);
placeForTest(1);
placeForTest(2);
placeForTest(2);
placeForTest(4);
placeForTest(3);
placeForTest(4);
placeForTest(3);
placeForTest(4);
placeForTest(4); */

function startIA() {
	isIAON = !isIAON;
}

function jouer(colonne) {
	jouerCase(colonne);
	if (isIAON) {
		colonneIA = IA.choixColonne();
		jouerCase(colonneIA);
	}
}

//Permet d'effectuer des tests avec des pré-placements de pions
/* function placeForTest(colonne){
    jouer(colonne);
} */

function jouerCase(colonne) {
	if (!finJeu) {
		var ligneVide = jeu.retournerLigneCaseVideColonne(colonne);
		if (ligneVide !== -1) {
			jeu.jouerCase(joueurEnCours, ligneVide, colonne);
			jeu.afficherPuissance4();
			if (jeu.verificationFinJeu(joueurEnCours)) {
				gererFinJeu();
			}

			if (joueurEnCours === 1) {
				joueurEnCours = 2;
				tour.innerHTML = "Tour du joueur 2";
			} else {
				joueurEnCours = 1;
				tour.innerHTML = "Tour du joueur 1";
			}
		}
	}
}

function initialisationTableau() {
	finJeu = false;
	alert.classList.add("d-none");
	var contentJ1 = "<img src='./images/J1.png' class='bg-danger rounded-circle' /> <br />";
	contentJ1 += pointJ1;
	messagej1.innerHTML = contentJ1;
	var contentJ2 = "<img src='./images/J2.png' class='bg-warning rounded-circle' /> <br />";
	contentJ2 += pointJ2;
	messagej2.innerHTML = contentJ2;
	console.log(isIAON);
	if (isIAON) {
		joueurEnCours = 1;
	}
	console.log(joueurEnCours);

	jeu.initialisation();
	jeu.afficherPuissance4();
}

function gererFinJeu() {
	finJeu = true;
	var contentAlert = "Partie terminée, le gagnant est : " + joueurEnCours + "<br />";
	contentAlert +=
		'<button type="button" class="btn btn-success" onClick = initialisationTableau()>Recommencer</button>';
	alert.innerHTML = contentAlert;
	alert.classList.remove("d-none");
	if (joueurEnCours === 1) {
		pointJ1++;
	} else {
		pointJ2++;
	}
}
