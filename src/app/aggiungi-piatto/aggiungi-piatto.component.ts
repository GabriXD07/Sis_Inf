import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Piatto } from '../models/piatto.model';

@Component({
  selector: 'app-aggiungi-piatto',
  templateUrl: './aggiungi-piatto.component.html',
  styleUrls: ['./aggiungi-piatto.component.css']
})
export class AggiungiPiattoComponent implements OnInit {

  constructor(private http: HttpClient) { }

  piatti : Piatto[] = new Array();

  ngOnInit(): void {
    this.mostra_piatti()
  }

  crea(nomePiatto: string, ingredienti: string, prezzo: number, quantita: number){
    //effettuo i controlli
    if (nomePiatto == null || prezzo == null  || quantita == null || ingredienti == null){
      alert("Non hai inserito tutti i campi correttamente !")
    }
    else{
    let piatto: Piatto = new Piatto();
    piatto.nomePiatto = nomePiatto;
    piatto.ingredienti = ingredienti;
    piatto.prezzo = prezzo;
    piatto.quantita = quantita;

    for(let i = 0; i<this.piatti.length; i++){
      if(piatto.nomePiatto == this.piatti[i].nomePiatto && piatto.ingredienti == this.piatti[i].ingredienti){
        alert("Piatto già registrato !")
        return;
      }
    }
    this.http.post<Piatto>("http://localhost:9091/piatti/aggiungi_piatto", piatto ).subscribe(ris =>{
      alert("Piatto: "+ris.nomePiatto+ " aggiunta correttamente allo store con codice: ");
    })

    }
  }

  mostra_piatti(): void{
    this.http.get<Piatto[]>("http://localhost:9091/piatti/tutti_i_piatti").subscribe(ris => {
       this.piatti = ris
     });
   }
}
