import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Piatto } from '../models/piatto.model';
import { PiattoNelCarrello } from '../models/piattoNelCarrello.model';

@Component({
  selector: 'app-barra-di-ricerca',
  templateUrl: './barra-di-ricerca.component.html',
  styleUrls: ['./barra-di-ricerca.component.css']
})
export class BarraDiRicercaComponent implements OnInit {

  num: number[] = new Array();
  piatto : Piatto = new Piatto()
  risultato: Piatto[] = new Array()
  categoria = "Tutte"

  constructor(public http: HttpClient) {
    this.piatto.ingredienti = "";
  }

  

 

  ngOnInit(): void {
  
  }

cerca(nome: string, ingredienti: string){
    let link = "?"
    if(nome!=null && nome.length!=0){link+="nome="+nome}
    if(ingredienti!=null && ingredienti.length!=0){link+="&ingredienti="+ingredienti}
    this.http.get<Piatto[]>("http://localhost:8081/piatti/ricerca_avanzata"+link).subscribe(ris =>{
      this.risultato = ris;
      for(let i = 0; i<ris.length; i++){
        this.num[i] = 0;
      }
      if(this.risultato.length == 0){
        alert("La ricerca non ha portato ad alcun risultato")
      }
    })
  }

  aumenta(piatto: Piatto): void{
    for(let i = 0; i< this.risultato.length; i++){
      if(piatto.nomePiatto == this.risultato[i].nomePiatto){
          this.num[i] ++;
      }
    }
  }

  diminuisci(piatto: Piatto): void{
    for(let i = 0; i< this.risultato.length; i++){
      if(piatto.nomePiatto == this.risultato[i].nomePiatto){
        if(this.num[i]!=0)
          this.num[i] --;
      }
    }
  }

  //metodo di aggiunta al carrello
  aggiungiAlCarrello(nomePiatto: string, quantitaSelezionata: number): void{
    if(quantitaSelezionata == 0){
      alert("Quantità selezionata non valida!")
    }
    else{
      this.http.put<PiattoNelCarrello>("http://localhost:8081/carrello/addPiatto?nome="+nomePiatto+"&quantita="+quantitaSelezionata, null).subscribe(ris =>{
        for(let i = 0; i<this.risultato.length; i++){
          if(this.risultato[i].nomePiatto == nomePiatto){
            ris.piatto.ingredienti = this.risultato[i].ingredienti;
          }
        }
        alert("Piatto "+ ris.piatto.nomePiatto +" aggiunto al carrello !")
      });
    }
  }



  }

  

  


