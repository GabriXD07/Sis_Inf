import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Md5 } from 'ts-md5';
import { Utente } from '../models/utente.model';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { RegistrazioneComponent } from '../registrazione/registrazione.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  isLogged: boolean = false;
  utente!: Utente

  ngOnInit(){
  }
  constructor(private router: Router, private http: HttpClient) {
   }
  mail!: string;
  
  login(mail: string, password: string): Observable<any> {
    console.log('mail =' + mail)
    console.log('password =' + Md5.hashStr(password))
    this.mail=mail;
    this.isLogged=true;
    this.getUtente(this.mail);
    return this.http.post<Observable<any>>('http://localhost:9091/login/log', { mail,  password: Md5.hashStr(password)}).pipe(
      catchError(error => {
          console.error('User o Password Errata:', error);
          alert("Email o Password Errata")
          this.isLogged=false;
          return throwError(error);
        }),
    );
  }
  
  getMail(): string{
    return this.mail;
  }

  getUtente(mail: string): void{
    this.http.get<Utente>("http://localhost:9091/utente/ricerca_utente_mail?mail="+mail).subscribe(ris => {
      this.utente = ris;
    })
  }

  isLog(): boolean{
    return this.isLogged;
  }

  logout(){
    this.isLogged = false;
  }
  
}
