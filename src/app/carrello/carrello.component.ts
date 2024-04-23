import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PiattoNelCarrello } from '../models/piattoNelCarrello.model';
import { Ordine } from '../models/ordine.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {

  constructor(public http: HttpClient, private authService: AuthService) {
    for(let i = 0; i< this.piatto.length; i++){
      this.num[i] = 0;
    }
   }

  ngOnInit(): void {
    this.mostraCarrello()
    this.calcolaPrezzo()
  }

  piatto: PiattoNelCarrello[]= new Array();
  num: number[] = new Array();
  storicoAcquisti : boolean = false;

  

  diminuisci(indice: number): void{
    this.http.delete("http://localhost:9091/carrello/elimina?nomePiatto="+this.piatto[indice].piatto.nomePiatto+"&mail="+this.authService.getMail()).subscribe(ris =>{
      this.ngOnInit()
    })
  }

  elimina(indice: number): void{
    this.http.delete("http://localhost:9091/carrello/elimina_tutto?mail="+this.authService.getMail()+"&nomePiatto="+this.piatto[indice].piatto.nomePiatto).subscribe(ris =>{
      this.ngOnInit()
    })
  }
  mostraCarrello(): void{
    this.http.get<PiattoNelCarrello[]>("http://localhost:9091/carrello/getcarrello?mail="+this.authService.getMail()).subscribe(ris =>{
      this.piatto = ris;
      console.log(this.piatto[0])
    })
  }

  calcolaPrezzo(): number{
    let costo: number = 0;
    for(let i = 0; i<this.piatto.length; i++){
      costo = costo + (this.piatto[i].piatto.prezzo * this.piatto[i].quantita)
    }
    return costo;
    
  }

  acquista():void{
    if(this.piatto.length == 0){
      alert("Il carrello è vuoto")
    }
    else{
    this.http.put<Ordine>("http://localhost:9091/ordine/addOrdine?mail="+this.authService.getMail(), null).subscribe(ris=>{  
    alert("Acquisto effettuato con successo")
      this.piatto = new Array();
    })
  }
  }

  storico(): void{
    this.storicoAcquisti = !this.storicoAcquisti
  }
 


}
