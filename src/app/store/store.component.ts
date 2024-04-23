import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Piatto } from '../models/piatto.model';
import { AppComponent } from '../app.component';
import { PiattoNelCarrello } from '../models/piattoNelCarrello.model';
import { Utente } from '../models/utente.model';
import { HomeComponent } from '../home/home.component';
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../login/login.component';
import { DatePipe } from '@angular/common'
import { UtenteService } from '../services/utente.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  
  mostra: boolean = false;
  categorie: boolean = true;
  piatto: Piatto[]= new Array();
  num: number[] = new Array();
  utenti: Utente[] = new Array();
  utente!: Utente;
  data: string;
  mail!: string;


  constructor(public http: HttpClient, public homeComponent: HomeComponent,private authService: AuthService) {
    this.data = new Date().toDateString();
   }

  ngOnInit(): void {
    this.mostra_piatti()
    this.utente = this.authService.utente
    console.log(this.utente)
  }

  mostra_piatti(): void{
   this.http.get<Piatto[]>("http://localhost:9091/piatti/tutti_i_piatti").subscribe(ris => {
      this.piatto = ris
      for(let i = 0; i< this.piatto.length; i++){
        this.num[i] = 0;
      }
    });
  }

  getRuolo(): string{
    return this.utente.ruolo
  }

  aumenta(piatto: Piatto): void{
    for(let i = 0; i< this.piatto.length; i++){
      if(piatto.nomePiatto == this.piatto[i].nomePiatto){
        if(this.num[i]>=0){
          this.num[i] ++;
        }
        else{
          alert("Non sono più disponibili altri piatti!")
        }
      }
    }
  }

  diminuisci(piatti: Piatto): void{
    for(let i = 0; i< this.piatto.length; i++){
      if(piatti.nomePiatto == this.piatto[i].nomePiatto){
        if(this.num[i]!=0)
          this.num[i] --;
      }
    }
  }


  //metodo di aggiunta al carrello
  aggiungiAlCarrello(data: string,mail: string,idPiatto: Number, quantita: number): void{
    data = this.data;
    mail = this.authService.getMail();
    this.mail=mail;
    console.log(data);
    console.log(mail);
    console.log(idPiatto);
    console.log(quantita);
    if(quantita == 0){
      alert("Quantità selezionata non valida!")
    }
    else{
      this.http.put<PiattoNelCarrello>("http://localhost:9091/carrello/addPiatto?data="+data+"&mail="+mail+"&idPiatto="+idPiatto+"&quantita="+quantita, null).subscribe(ris =>{
        for(let i = 0; i<this.piatto.length; i++){
          if(this.piatto[i].idPiatto == idPiatto){
            ris.piatto.ingredienti = this.piatto[i].ingredienti;
            
          }
        }
        alert("Piatto "+ ris.piatto.nomePiatto +" aggiunta al carrello !")
      },
      (error) => {
        alert("Prodotto esaurito");
      }
      );
    }
  }

  aggiungiPiatto(){
    this.homeComponent.change_content("aggiungi-piatto");
  }
}
