class Reservation {
    constructor(time){
        this.time = time; //temps exprimé en seconde pour le compte à rebourt                       
        this.validation = document.getElementById("validation");
        this.nom = document.getElementById("name");
        this.numStation = document.getElementById("vDispo");
        this.prenom = document.getElementById("prenom");
        this.dessin = document.getElementById("draw");
        this.nomStation = document.getElementById("nomStation");
        this.enter =  document.getElementById("reserver");
        this.valider = document.getElementById("ok");  
        this.null = document.getElementById("erreur"); 
        this.annulation = document.getElementById("raze");                                                               
        this.openCanvas();             
        this.btnValidation(); 
        this.verifResa();
        this.timer = sessionStorage.getItem("timing");        
        this.annuler();                       
    };
    //fonction qui permet de faire la signature si toutes les conditions sont remplis.
    openCanvas(){ 
        this.enter.addEventListener("click", function(){
            if(this.validation.style.display == 'block'){
                alert("Erreur: Veuillez annuler la réservation en cours avant de continuer!");
            }                   
           else if(this.nom.value, this.prenom.value === ''){             
            this.null.innerHTML = "Erreur: Veuillez remplir tous les champs obligatoires!!";
            this.null.style.display = "block";
            this.null.style.color = "red";            
        } 
            else if(this.nom.value.match(/[0-9]/g) || this.prenom.value.match(/[0-9]/g)){
            this.null.innerHTML = "Erreur: Pour les noms et prénoms, les chiffres ne sont pas autorisés!";
            this.null.style.display = "block";
            this.null.style.color = "red";            
         }      
            else {this.dessin.style.visibility = "visible"; 
            this.null.style.display = "none";                                  
         }      
        }.bind(this))
    };   
    //Fonction pour valider la signature et lancer le compte à rebourt.
    btnValidation(){                   
        this.valider.addEventListener('click', function(){
            if(this.validation.style.display == "block"){
                alert("Erreur: Veuillez annuler la réservation en cours avant de continuer!");
            }                
            else if(document.getElementById("stockUrl")){
                this.validation.style.display = "block";
                document.location.href= "#raze";                                              
                let veloDown = this.numStation.textContent - 1;
                this.numStation.innerHTML = veloDown; 
                    //utilisation api web storage 
            //en local pour que l'identité de la personne se remette aprés avoir fermé sont navigateur.      
                localStorage.setItem("nom", this.nom.value);            
                localStorage.setItem("prenom", this.prenom.value);
            //sur la session pour que les infos reste même aprés un refresh du navigateur.
                sessionStorage.setItem("nom", this.nom.value);            
                sessionStorage.setItem("prenom", this.prenom.value);                    
                sessionStorage.setItem("station", this.nomStation.textContent);                              
                sessionStorage.setItem("reservation", Date.now());                                             
                this.topAction();                                                          
            } 
            else {
                alert("Pour réserver, vous devez signer");                                 
        }}.bind(this));            
    }; 
    //verification d'une réservation en cours.  
    verifResa(){ 
        let reservation = sessionStorage.getItem("reservation");
            if(reservation){ // si réservation en cours reprend le chrono. 
                this.tempsRestant = this.time - ((Date.now() - reservation) /1000); 
                this.timing = Math.round(this.tempsRestant);                               
                this.validation.style.display = "block";                             
                this.topAction();
            }
            else{ //si pas de réservation met le chrono à 20min.
                this.timing = this.time;           
            }
            //stock la durée du compte à rebours.  
            sessionStorage.setItem("timing", this.timing);
            //remplie les champs nom et prénom stockés pour une nouvelle réservation.
            this.nom.value = localStorage.getItem("nom");
            this.prenom.value = localStorage.getItem("prenom");                  
        }                        
    //fonction du compte à rebourt.     
    chrono(){                                       
            if(this.timer > 0)this.timer--;            
            this.minutes = Math.floor(this.timer/60);
            this.secondes = this.timer - (Math.floor(this.timer/60)*60);  
            document.getElementById("station").innerHTML = ("Vélo réservé à la station " +  this.nomStation.textContent + " par ");                
            document.getElementById("nomPrenom").innerHTML = (this.nom.value + " " + this.prenom.value);                   
            document.getElementById("topChrono").innerHTML = ("Votre réservation expire dans " + this.minutes + "min" + " " + this.secondes + "s." + " " + "Ne fermer pas votre navigateur ou la réservation seras perdue.");        
            if(this.timer == 0){
            document.getElementById("topChrono").innerHTML = ("Votre réservation est expirée!");
            clearInterval(this.go);                           
        }        
    }
    //fonction qui permet de lancer le compte à rebourt    
    topAction(){    
            this.decompte = true;        
            this.go = setInterval(function(){this.chrono()}.bind(this), 1000);
        }; 
    //fonction pour annulé la réservation.     
    annuler(){
          this.annulation.addEventListener("click", function(){
            if(this.decompte = true){
                this.decompte = false;
                clearInterval(this.go); 
                alert("Vous avez annulé votre réservation!");                
                this.validation.style.display = "none";                 
                sessionStorage.clear(); 
                document.location.reload(true)                                                                                  
            }
          }.bind(this));  
           
        };
    
} 