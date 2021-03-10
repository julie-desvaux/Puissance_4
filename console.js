// PUISSANCE 4 DANS LA CONSOLE

var readline = require("readline-sync");

var puissance4 = [];
var nbColonne = 7;
var nbLigne = 6;
var joueur1car = choixCaractere(1);
var joueur2car = choixCaractere(2);

intro();
puissance4 = initialiserTableauVide(nbLigne, nbColonne, 0);
afficherPuissance4(puissance4, joueur1car, joueur2car);

while (true) {
	if (jouerCase(1)) {
		console.log("Joueur 1 a gagné");
		break;
	}
	if (jouerCase(2)) {
		console.log("Joueur 2 a gagné");
		break;
	}
}

function intro() {
	var txt = "*****************************************************************************\n";
	txt += "************************* Bienvenue sur Puissance 4 *************************\n";
	txt += "*****************************************************************************";
	console.log(txt);
}

function choixCaractere(joueur) {
	var txt = "Veuillez choisir le caractere que vous voulez pour jouer " + joueur + " : ";
	return saisieString(txt);
}

function saisieString(txt) {
	return readline.question(txt);
}

/**
 * Fonction permettant à un joueur de jouer une case
 * Retourne true si le joueur a gagné
 * @param {Number} joueur
 */
function jouerCase(joueur) {
	var ligneVide = -1;
	var colonne = -1;
	while (ligneVide === -1 || colonne <= 0 || colonne > 7) {
		console.log("choisir une colonne à un emplacement vide");
		var colonne = saisirColonne();
		var ligneVide = retournerLigneCaseVideColonne(colonne);
	}
	puissance4[ligneVide][colonne - 1] = joueur;
	afficherPuissance4(puissance4, joueur1car, joueur2car);
	return verificationFinJeu(joueur);
}

/**
 * Fonction permettant de saisir une colonne
 */
function saisirColonne() {
	return parseInt(saisieString("Quelle colonne ?"));
}

/**
 * Fonction permettant de retourner la première ligne vide d'une colonne
 * @param {Number} colonne retourne -1 si la colonne est pleine
 */
function retournerLigneCaseVideColonne(colonne) {
	for (var i = nbLigne - 1; i >= 0; i--) {
		if (verifCaseVide(i, colonne)) return i;
	}
	return -1;
}

/**
 * Fonction permettant de retourner si une cellule est vide (retourne true / false)
 * @param {Number} ligne
 * @param {Number} colonne
 */
function verifCaseVide(ligne, colonne) {
	return puissance4[ligne][colonne - 1] === 0;
}

/**
 * Fonction permettant de vérifier si un joueur a gagné
 * @param {Number} joueur
 */
function verificationFinJeu(joueur) {
	if (verificationLigneFinJeu(joueur) || verificationColonneFinJeu(joueur) || verificationDiagonalFinJeu(joueur)) {
		return true;
	}
	return false;
}

/**
 * Fonction permettant de vérifier si un joueur a gagné sur une ligne
 * @param {Number} joueur
 */
function verificationLigneFinJeu(joueur) {
	for (var i = nbLigne - 1; i > 0; i--) {
		for (var j = 0; j < nbColonne - 3; j++) {
			if (
				puissance4[i][j] === joueur &&
				puissance4[i][j + 1] === joueur &&
				puissance4[i][j + 2] === joueur &&
				puissance4[i][j + 3] === joueur
			)
				return true;
		}
	}
	return false;
}

/**
 * Fonction permettant de vérifier si un joueur a gagné en colonne
 * @param {Number} joueur
 */
function verificationColonneFinJeu(joueur) {
	for (var i = 0; i < nbColonne; i++) {
		for (var j = nbLigne - 4; j > 0; j--) {
			if (
				puissance4[j][i] === joueur &&
				puissance4[j + 1][i] === joueur &&
				puissance4[j + 2][i] === joueur &&
				puissance4[j + 3][i] === joueur
			)
				return true;
		}
	}
}

/**
 * Fonction permettant de vérifier si un joueur a gagné en diagonale
 * @param {Number} joueur
 */
function verificationDiagonalFinJeu(joueur) {
	for (var i = nbLigne - 1; i >= 3; i--) {
		for (var j = 0; j < nbColonne; j++) {
			if (
				puissance4[i][j] === joueur &&
				puissance4[i - 1][j + 1] === joueur &&
				puissance4[i - 2][j + 2] === joueur &&
				puissance4[i - 3][j + 3] === joueur
			)
				return true;
			if (
				puissance4[i][j] === joueur &&
				puissance4[i - 1][j - 1] === joueur &&
				puissance4[i - 2][j - 2] === joueur &&
				puissance4[i - 3][j - 3] === joueur
			)
				return true;
		}
	}
	return false;
}

/**
 * Permet d'initialiser un tableau de tableau en fonction d'un nombre de ligne et de colonne passé en paramètre
 * @param {Number} nbLigne
 * @param {Number} nbColonne
 * @param {*} car
 */
function initialiserTableauVide(nbLigne, nbColonne, car = "") {
	var tab = [];
	for (var i = 0; i < nbLigne; i++) {
		var ligne = [];
		for (var j = 0; j < nbColonne; j++) {
			ligne.push(car);
		}
		tab.push(ligne);
	}
	return tab;
}

/**
 * Permet d'afficher un tableau de puissance 4
 * @param {Array <String>} tab tableau de car
 * @param {String} j1car le car de j1
 * @param {String} j2car le car de j2
 */
function afficherPuissance4(tab, j1car, j2car) {
	for (var i = 0; i < tab.length; i++) {
		var ligne = "";
		for (var j = 0; j < tab[i].length; j++) {
			ligne += "| ";
			if (tab[i][j] === 0) {
				ligne += "_";
			} else if (tab[i][j] === 1) {
				ligne += j1car;
			} else if (tab[i][j] === 2) {
				ligne += j2car;
			}
			ligne += " |";
		}
		console.log(ligne);
	}
}
