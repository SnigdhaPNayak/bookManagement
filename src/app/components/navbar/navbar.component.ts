import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  //Clearing the local storage and session storage on logout
  logOut() {

    console.log("Clearing the local storage and session storage on logout...")
    sessionStorage.clear()
    localStorage.clear()
    
  }

}
