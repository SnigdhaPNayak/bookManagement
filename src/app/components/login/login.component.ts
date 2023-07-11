import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { pluck } from 'rxjs';
import { UserIdService } from 'src/app/services/userId/user-id.service';
import { InvalidCredentialsComponent } from '../invalid-credentials/invalid-credentials.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  data: any;
  err: any = null;
  id: any;

  constructor(private router: Router, private userIdService: UserIdService, private snackBar: MatSnackBar) {

  }

  //Clearing out the local storage, if the session has ended
  ngOnInit() {
    if (sessionStorage.length == 0) {
      localStorage.clear()
    }
  }

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  get userName() {
    return this.loginForm.get('userName')
  }

  get password() {
    return this.loginForm.get('password')
  }

  login() {

    //Setting the userId for the given credentials
    this.userIdService.setUserId(this.loginForm.value)
    console.log("Setting the userId for the given credentials..." + this.loginForm.value)

    this.userIdService.getUserId().pipe(pluck('val')).subscribe(value => {

      //Setting the user ID
      this.id = value['userID']
      sessionStorage.setItem("id", this.id)
      console.log("Storing the user ID...")

      this.router.navigate(['/home']);
    },
      error => {

        //Check for Invalid Credentials
        this.err = error.status
        console.log(this.err)
        if (this.err === 400) {
          this.openSnackBar();
        }
      })

  }

  openSnackBar() {

    //openFormComponent is a method provided by snackBar
    this.snackBar.openFromComponent(InvalidCredentialsComponent, {
      duration: 1000,
      verticalPosition: 'top'
    });
  }

}
