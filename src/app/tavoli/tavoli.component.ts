import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tavolo } from '../models/tavolo.model';
import { Utente } from '../models/utente.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-tavoli',
  templateUrl: './tavoli.component.html',
  styleUrls: ['./tavoli.component.css']
})
export class TavoliComponent implements OnInit {
  tavolo!: Tavolo;
  data: string;
  ngOnInit(){
    
  }

  constructor(private homeComponent: HomeComponent, private http: HttpClient){
    this.data = new Date().toDateString();
  }

  prenota(nome: string, fasciaOraria: string, numeroPersone: number){
        //effettuo i controlli
        if (nome == null || fasciaOraria == null  || numeroPersone == null){
          alert("Non hai inserito tutti i campi correttamente !")
        }
        else{
        let tavolo: Tavolo = new Tavolo();
        this.http.put<Tavolo>("http://localhost:9091/tavolo/creaPrenotazione?data="+this.data+"&nome="+nome+"&fasciaOraria="+fasciaOraria+"&numeroPersone="+numeroPersone, null).subscribe(ris =>{
          alert("Tavolo: "+ris.numeroTavolo+ " prenotato correttamente ");
        },
          (error)=> alert("Posti non sufficienti!!")
        )
    
        }
      }
  }


