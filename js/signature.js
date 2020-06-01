//constructeur de la signature.
class Canvas {
    constructor() {
        this.canvas = document.getElementById('sign');
        this.ctx = this.canvas.getContext('2d');                    
        this.url = this.canvas.toDataURL();     
        this.stockUrl = document.createElement("img");                 
        this.stockUrl.src = this.url;                        
        this.restart = document.getElementById('clean');
        this.validation = document.getElementById("validation");
        this.annulation = document.getElementById("raze");     
        this.dessin = false;                                               
        this.init();
        this.recommencer();
        this.annuler(); 
        this.calibrate(this.canvas);                                                     
    } 
    //intialise les différentes fonctions de la souris et du tactile.             
    init(){                        
        this.canvas.addEventListener('mousedown', function(){this.start("mouse")}.bind(this));  
        this.canvas.addEventListener("mousemove", function(event){this.draw("mouse", event)}.bind(this));
        this.canvas.addEventListener("mouseup",function(){this.stop()}.bind(this));        
        this.canvas.addEventListener('touchstart', function(){this.start("pad")}.bind(this));  
        this.canvas.addEventListener("touchmove", function(event){this.draw("pad", event)}.bind(this));
        this.canvas.addEventListener("touchend",function(){this.stop()}.bind(this));                         
        window.addEventListener('resize', function(e){this.calibrate(this.canvas)}.bind(this));                   
    };
    //execute le dessin         
    draw(type, event){                    
           if(this.dessin){                                
            this.ctx.lineWidth = 4;
            this.ctx.strokeStyle= "black";
            this.ctx.lineCap = "round";                    
            var rect = this.canvas.getBoundingClientRect();           
            if(type == "pad"){
                this.ctx.lineTo(event.targetTouches[0].clientX - rect.left, event.targetTouches[0].clientY - rect.top);
                this.ctx.stroke();
                this.ctx.beginPath();                
                this.ctx.moveTo(event.targetTouches[0].clientX- rect.left, event.targetTouches[0].clientY - rect.top); 
                this.ctx.closePath();        
            }
            else if(type == "mouse"){              
               this.ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top); 
               this.ctx.stroke();
               this.ctx.beginPath(); 
               this.ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);                             
               this.ctx.closePath();                                                                   
            }                                           
        }
    };
    //arrete le dessin.  
    stop(){        
        if(this.dessin === true){
            this.dessin = false;
            this.ctx.beginPath();
        }
    };
    //demarre le dessin.
    start(){        
        this.dessin = true;        
        document.body.appendChild(this.stockUrl); 
        this.stockUrl.setAttribute("id", "stockUrl")
        this.stockUrl.style.display = "none";                                 
    }; 
    //permet de recommencer le dessin.  
    recommencer(){                
        this.restart.addEventListener("click", function(){            
            if(this.validation.style.display == 'block'){
                alert("Erreur: Veuillez annuler la réservation en cours avant de continuer!");
            }
            else{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = this.canvas.width; 
        this.init();
        this.calibrate(sign);      
        document.body.removeChild(this.stockUrl);                      
        }}.bind(this)); 
    };
    //annule efface le dessin lors de l'annulation de la réservation.
    annuler(){ 
        this.annulation.addEventListener("click", function(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.removeChild(this.stockUrl);                      
        }.bind(this));                          
    };
    //permet de calibrer le canvas sur la fenetre.   
    calibrate(sign){            
        sign.width = sign.clientWidth;
        sign.height = sign.clientHeight;
        this.ctx.font = "30px serif";
        this.ctx.textBaseline = "top";
        this.ctx.fillText('Signature', 10, 10); 
    };          
}