 //constructeur des images du diaporama
  class Slide {
    constructor(img, txt) {
        this.img = img;
        this.txt = txt;
    }
  }   
//constructeur de l'affichage du diaporama, de son automatisation et de son contrôle
  class Slider {
    constructor(sliderContainer, list){  
        this.sliderContainer = sliderContainer;    
        this.list = list;               
        this.index = 0;            
        this.playing = true;
        this.previousBtn = document.getElementById("previousBtn");
        this.pauseBtn = document.getElementById("stopBtn");
        this.nextBtn = document.getElementById("nextBtn");        
        this.iconBtn = document.getElementById("iconeChange");
        this.x = document.getElementsByClassName("diapo");
        this.init();                           
      }  
      //fonction pour l'affichage du diaporama dans le DOM
      init() { 
        let slider = document.getElementById(this.sliderContainer);
        this.list.forEach((slide) => { 
        let div = document.createElement("div");
        div.classList.add("diapo");         
        let im = document.createElement("img");                
        im.classList.add("show");                
        im.src = slide.img ;
        div.appendChild(im);
        let txte = document.createElement("p");  
        txte.textContent = slide.txt ;            
        div.appendChild(txte);  
        slider.appendChild(div);                                                                       
      });   
        if (window.addEventListener) { window.addEventListener("load",this.diapo());
     }  else { window.attacheEvent('onload', this.diapo());}  
        //fonction qui lance le diaporama avec sa temporisation entre les images.    
        this.chrono(); 

        //Permet d'utiliser les boutons de navigation
        //Avec la souris
        this.pauseBtn.addEventListener("click", function(){
          if(this.playing){this.pause();
          }
          else{this.lecture();
          }}.bind(this));           
        this.previousBtn.addEventListener("click", function(){
        this.pause();this.prevBtn();}.bind(this));
        this.nextBtn.addEventListener("click", function(){
        this.pause();this.diapo();}.bind(this));
        //Avec le clavier
        document.addEventListener("keydown", function(e){
          if(e.keyCode == 37){this.pause();this.prevBtn();
          } 
          else if(e.keyCode == 39){this.pause();this.diapo();
          }
          else if(this.playing === false && e.keyCode == 32 || e.keyCode == 13){this.lecture();
          }}.bind(this));
      }
      //fonction de la boucle du diaporama
      diapo(){ 
        var i;        
        for (i = 0 ; i < this.x.length; i++) {
            this.x[i].style.display = "none";
                
        }
        this.index++;       
        if (this.index > this.x.length){this.index = 1}
          this.x[this.index -1].style.display = "block";
                       
      }
      //fonction pour le bouton précédent 
      prevBtn(){  
        var i;        
        for (i= 0; i < this.x.length; i++) {
          this.x[i].style.display = "none";   
        }
        this.index--;
        if(this.index <= 0){this.index = this.x.length;}       
        this.x[this.index -1].style.display = "block";   
        }       
      //fonction de l'arrêt du diaporama sur click bouton             
      pause(){     
        this.pauseBtn.className = "fas fa-play-circle"
        this.playing = false;
        clearInterval(this.interval);
      } 
      //fonction du demarrage du diaporama sur click bouton 
      lecture(){         
        this.pauseBtn.className = "fas fa-pause-circle"
        this.chrono();      
      } 
      //fonction du lancement du diaporama automatiquement
      chrono(){
        this.playing = true;
        this.interval = setInterval(function(){this.diapo()}.bind(this), 5000);
      }
    }    
              
      
        