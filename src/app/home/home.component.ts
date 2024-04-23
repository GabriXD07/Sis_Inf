import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router'
import { Utente } from '../models/utente.model';
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isHome: boolean =false
  constructor(private router: Router, public authSerivce: AuthService) {
    router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.isHome=(event.url==='/');
      }
    });
   }

  ngOnInit(): void {
  }

  isLogged(): boolean{
    return this.authSerivce.isLog();
  }

  public works() {
    alert("il tasto funziona!");
  }

  container_flag: string = "home";

  change_content(value: string){
    this.container_flag = value;
  }

  logout(){
    this.change_content("home")
    this.authSerivce.logout();
  }
}


