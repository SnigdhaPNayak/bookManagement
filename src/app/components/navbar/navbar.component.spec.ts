import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Component } from '@angular/core';

describe('NavbarComponent', () => {

  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MatIconModule, RouterTestingModule.withRoutes([{ path: '', component: LoginMockComponent }, { path: 'home', component: HomeMockComponent }])]

    })
      .compileComponents();

    //Creating a instance of component
    //Adding fixture to detect changes
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);

  });

  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  });

  //Checking if the instance of the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Adding value to the local storage and session storage, and checing if the .clear() method is called on logout
  it('should clear local storage and session storage', () => {

    localStorage.setItem('key1', 'value1');
    localStorage.setItem('key2', 'value2');
    sessionStorage.setItem('key3', 'value3');

    //Calling the logOut method
    component.logOut();

    //Checing of the local storage and session storage is empty
    expect(localStorage.length).toEqual(0);
    expect(sessionStorage.length).toEqual(0);

  });

  //Some of your tests did a full page reload!

  //HTML

  //Test case for home link
  it('should have a navbar-brand with the correct href attribute for home', () => {
    const homeIcon = fixture.nativeElement.querySelector('a[href="/home"]');
    expect(homeIcon).toBeTruthy();
  });

  //Test case for logout link
  it('should have a navbar-brand with the correct href attribute for logout',() => {

    const logout = fixture.nativeElement.querySelector('a[href=""]');
    expect(logout).toBeTruthy();

  });

  //Test case for logOut() method call
  it('should call logOut() when logout link is clicked', () => {
    spyOn(component, 'logOut');

    const logout = fixture.nativeElement.querySelector('a[href=""]');

    //Using logout.click(), results in a full page reload in an infinit loop
    logout.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(component.logOut).toHaveBeenCalled();

  });

  @Component({ template: '' })
  class LoginMockComponent { }

  @Component({ template: '' })
  class HomeMockComponent { }

});
