import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material/material.module';
import { StoreComponent } from './store/store.component';
import { SupportComponent } from './support/support.component';
import { CarrelloComponent } from './carrello/carrello.component';
import { BarraDiRicercaComponent } from './barra-di-ricerca/barra-di-ricerca.component'
import { AggiungiPiattoComponent } from './aggiungi-piatto/aggiungi-piatto.component';
import { AcquistiComponent } from './acquisti/acquisti.component';
import { TavoliComponent } from './tavoli/tavoli.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input'
import { CommonModule } from '@angular/common'
import { AuthService } from './auth/auth.service';
import { UtenteService } from './services/utente.service';
@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    SupportComponent,
    CarrelloComponent,
    BarraDiRicercaComponent,
    AggiungiPiattoComponent,
    AcquistiComponent,
    TavoliComponent,
    HomeComponent,
    LoginComponent,
    RegistrazioneComponent,
  ],
  providers:[
    UtenteService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDatepickerModule ,
    MatNativeDateModule,
    MatInputModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
