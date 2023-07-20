import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserIdService } from 'src/app/services/userId/user-id.service';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvalidCredentialsComponent } from '../invalid-credentials/invalid-credentials.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let userIdService: UserIdService;

  let router: Router;

  let snackBar: MatSnackBar;

  let userIdServiceMock: jasmine.SpyObj<UserIdService>;

  //jasmine.Spy is a utility provided by jasmine framework to create function spy [It allow to track calls to a particular function and optionally modify its behavior.]
  // Declaring a varible as spy
  let openFromComponentSpy: jasmine.Spy;

  userIdServiceMock = jasmine.createSpyObj('UserIdService', ['getUserId', 'setUserId']);

  //Runs before each test case
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, ReactiveFormsModule, RouterTestingModule.withRoutes([{ path: 'userList', component: HomeMockComponent }])],
      declarations: [LoginComponent, InvalidCredentialsComponent],
      providers: [UserIdService, Router, MatSnackBar,
        { provide: UserIdService, useValue: userIdServiceMock }]

    })
      .compileComponents();

    //Creating Instances
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    //It is used to trigger change detection and update the component and its child components
    fixture.detectChanges();

    //TestBed.inject allows to retrieve an instance of a service or dependency

    userIdService = TestBed.inject(UserIdService);

    router = TestBed.inject(Router);

    snackBar = TestBed.inject(MatSnackBar);

    //spyOn function allows to create a spy on an object and track its calls, return values, and other behaviors
    //using stub(), which means that when the openFromComponent method is called, it will not execute the actual implementation but instead do nothing 
    //Spying the openFormComponent method of snackBar
    //assiging a spy to a already declared varible
    openFromComponentSpy = spyOn(snackBar, 'openFromComponent').and.stub();

  });

  afterEach(() => {
    sessionStorage.clear()
  });

  //Checking if the component has been created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Checking if the localStorage is cleared out, if the session storage is empty
  it('should clear localStorage if sessionStorage is empty', () => {
    spyOn(localStorage, 'clear');
    component.ngOnInit();

    expect(localStorage.clear).toHaveBeenCalled();
  });

  //Checking if the userName value is being fetched properly
  it('should return the userName control', () => {
    expect(component.userName).toBe(component.loginForm.get('userName'));
  });

  //Checking if the password value is being fetched properly
  it('should return the password control', () => {
    expect(component.password).toBe(component.loginForm.get('password'));
  });

  //Proving credentials to the from. And fetching the userID to store it in the session storage
  it('should set the user ID and navigate to home', () => {

    //Assigning the mock values
    component.loginForm.setValue({ userName: 'User1', password: 'Password1' });
    const mockUserId = { userID: '1' };

    userIdServiceMock.getUserId.and.returnValue(of({ val: mockUserId }));

    spyOn(router, 'navigate');

    component.login();

    expect(userIdService.setUserId).toHaveBeenCalledWith({ userName: 'User1', password: 'Password1' });
    expect(sessionStorage.getItem('id')).toBe('1');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  //Checking if the openSnackBar method is when, the credentials are invalid 
  it('should show a snackbar for invalid credentials', () => {

    //Throwing 400 error
    userIdServiceMock.getUserId.and.returnValue(throwError({ status: 400 }));

    //Spying the openSnackBar method
    //Directly declaring a varible and assigning a spy
    const openSnackBarSpy = spyOn(component, 'openSnackBar').and.stub();
    component.login();

    expect(component.err).toBe(400);
    expect(openSnackBarSpy).toHaveBeenCalled();
  });

  //Checking openSnackBar method
  it('should open the snackbar with the InvalidCredentialsComponent', () => {

    component.openSnackBar();

    //A spy with stub() method has been created...
    expect(openFromComponentSpy).toHaveBeenCalledWith(InvalidCredentialsComponent, {
      duration: 1000,
      verticalPosition: 'top'
    });

  });

  //HTML

  //Checking h2 tag
  it('should display "Login Form" message', () => {

    const messageElement = fixture.debugElement.query(By.css('h2'));

    expect(messageElement).toBeTruthy();
    expect(messageElement.nativeElement.textContent).toContain('Login Form');

  });

  //Checking userName and password
  it('should create the login form with required fields', () => {
    const loginForm = component.loginForm;
    expect(loginForm.get('userName')).toBeTruthy();
    expect(loginForm.get('password')).toBeTruthy();
  });

  //Checking error message for userName
  it('should display error message for required userName field if it is touched and empty', () => {

    let userNameControl = component.loginForm.controls['userName'];

    userNameControl.setValue(null);
    userNameControl.markAsTouched();
    fixture.detectChanges();

    const errorMessageElement = fixture.nativeElement.querySelector('.form-group .userNameError');
    expect(errorMessageElement.textContent).toContain('UserName is a Required field');

  });

  //Checking error message for Password
  it('should display error message for required password field if it is touched and empty', () => {

    let passwordControl = component.loginForm.controls['password'];

    passwordControl.setValue(null);
    passwordControl.markAsTouched();
    fixture.detectChanges();

    const errorMessageElement = fixture.nativeElement.querySelector('.form-group .passwordError');
    expect(errorMessageElement.textContent).toContain('Password is a Required field');

  });


  //Checking if the method is being called on button click
  it('should call login() function when the button is clicked', () => {

    spyOn(component, 'login')

    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();

    expect(component.login).toHaveBeenCalled();
  });

  //const errorMessageElement = fixture.nativeElement.querySelector('.form-group span');
  //Even when no class name is mentioned and both of the span element are called from the above syntax, still the correct element is fetched.

});

@Component({ template: '' })
class HomeMockComponent { }

