 //construction de la carte, des markers et de l'affichage des données de station de vélo
 class Carte {
     constructor(contrat, lat, long, zoom){     
        this.contrat = contrat; 
        this.map = L.map("myMap");
        this.lat = lat;
        this.long = long;
        this.zoom = zoom;
        this.attribution = 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>';
        this.openMapCard = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';                 
        this.openStreetMap = L.tileLayer(this.openMapCard, {attribution: this.attribution});         
        this.etat =  document.getElementById("etat");
        this.stop =  document.getElementById("erreur"); 
        this.reserver = document.getElementById("formulaire"); 
        this.draw =  document.getElementById("draw");                        
        this.voirCarte();
        this.voirMarker();                           
    }  
    //Affiche de la carte                    
    voirCarte(){
        this.map.setView([this.lat, this.long],this.zoom);   
        this.openStreetMap.addTo(this.map);      
    } 
    //Charge les donnés de l'API JC DECAUX et affiche les markers sur la carte.
    voirMarker(){          
        ajaxGet(this.contrat, function(response) {
        let data = JSON.parse(response)                       
        data.forEach((station  => {                                                 
        L.marker([station.position.lat,station.position.lng])                        
        .addTo(this.map)
        .bindPopup(station.name)
        //affiche les donnés de la station dans le DOM au click sur marker et conditionne la possibibilité de réserver.
        .on('click', function(){ 
          //document.location.href = "#reserver";                                                                                                                        
            if(station.available_bikes < 1){              
                this.stop.innerHTML = "Aucun vélo disponible. Réservation impossible."; 
                this.stop.style.color = "red";
                this.stop.style.display = "block"; 
                this.reserver.style.display = "none";
                this.draw.style.display = "none";             
            } 
            else if(station.status === "OPEN" && station.available_bikes > 0){              
                this.etat.innerHTML = "ouverte";
                this.reserver.style.display = "block"; 
                this.stop.style.display = "none";                                                                                
                } 
            else{
                this.etat.innerHTML = "fermée"; 
                this.stop.innerHTML = "Station fermée. réservation impossible.";
                this.stop.style.color = "red";
                this.stop.style.display = "block"; 
                this.reserver.style.display = "none";
                this.draw.style.display = "none";                             
                };
                document.location.href = "#reserver";                               
                document.getElementById("nomStation").innerHTML = station.name;          
                document.getElementById("adress").innerHTML = station.address;
                document.getElementById("pDispo").innerHTML = station.bike_stands;
                document.getElementById("vDispo").innerHTML = station.available_bikes;                                                    
                }.bind(this)); 
            }))         
        }.bind(this));         
    }    
        
     }
    
        
      

