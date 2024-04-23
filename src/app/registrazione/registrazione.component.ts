import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Utente } from '../models/utente.model';
import { UtenteService } from '../services/utente.service';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit {
  user: Utente = new Utente();
  confirmPassword: string = '';

  ngOnInit(): void {
  }

  constructor(private userService: UtenteService,private homeComponent: HomeComponent) {}

  onSubmit() {
    this.userService.register(this.user)
    .subscribe(
      response => {
        console.log('Registrazione avvenuta con successo:', response);
        console.log(this.user.ruolo)
        alert('Registrazione avvenuta con successo');
        // Gestisci il reindirizzamento o la visualizzazione di un messaggio di successo
        this.homeComponent.change_content("login");
      },
      error => {
        console.error('Errore durante la registrazione:', error);
        alert('Errore durante la registrazione');
        // Gestisci l'errore, ad esempio visualizzando un messaggio di errore
      }
    );
  }
}
