import { Injectable } from '@angular/core';
import { Utente } from '../models/utente.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  registrationForm!: FormGroup;
  private baseUrl = 'http://localhost:9091';

  constructor(private http: HttpClient) { }

  register(utente: Utente): Observable<any> {
    utente.password=Md5.hashStr(utente.password)
    console.log('mail =' + utente.mail)
    console.log('password =' + Md5.hashStr(utente.password))
    return this.http.post<any>(`http://localhost:9091/utente/crea_utente`, utente);
  }
}
