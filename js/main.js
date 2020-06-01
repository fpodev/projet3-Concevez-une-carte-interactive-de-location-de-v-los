//création des images du diaporama
var slide1 = new Slide ('img/capt1v.png', '1- Sélectionner une station sur la carte!');
var slide2 = new Slide ('img/capt2v.png', '2- Renseigner vos nom et prénom, puis cliquer sur réserver!');
var slide3 = new Slide ('img/capt3v.png', '3- Signer, puis cliquer sur valider!');
var slide4 = new Slide ('img/capt4v.png', '4- Vous avez 20 min pour prendre votre vélo!');

//lancement du diaporama
var monSlider = new Slider("slider",[slide1, slide2, slide3, slide4]);

//lancement de l'affichage de la carte, la récupération des infos station et l'affichage des markers
var mapping = new Carte('https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=ee37a8372db70aac50f49569afac43f78d8bee9f', 43.6044622, 1.4442469, 16);

//lancement de la réservation
var reservation = new Reservation(1200);

//lancement du dessin
var dessin = new Canvas();











 
   