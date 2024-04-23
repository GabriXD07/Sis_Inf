import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ordine } from '../models/ordine.model';

@Component({
  selector: 'app-acquisti',
  templateUrl: './acquisti.component.html',
  styleUrls: ['./acquisti.component.css']
})
export class AcquistiComponent implements OnInit {

  constructor(public http : HttpClient) { }
  storicoAcquisti: Ordine[] = new Array();

  ngOnInit(): void {
  }



  calcolaPrezzo(indice: number): number{
    let costo: number = 0;
    let carrello = this.storicoAcquisti[indice].carrello;

    for(let i = 0; i < carrello.length; i++){
      costo += carrello[i].piatto.prezzo*carrello[i].quantita
    }

    return costo;
    
  }

  

}
