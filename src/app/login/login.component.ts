import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utente } from '../models/utente.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  errorMessage!: string;
  loginForm!: FormGroup;
  constructor(private authService: AuthService, private homeComponent: HomeComponent, private fb: FormBuilder,private http: HttpClient) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
        console.log("chiamata succeduta " + res)
        alert("Benvenuto/a: "+this.authService.utente.nome)
        this.homeComponent.change_content("home");
      })
    }
    else{
      console.log("Username o password non validi!")
      alert("Username o password non validi!")
    }
  }

  goToRegisterPage() {
    this.homeComponent.change_content('registrazione');
  }

  
}