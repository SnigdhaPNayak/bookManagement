import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageMock } from 'src/app/services/LocalStorageMock';
import { SessionStorageMock } from 'src/app/services/SessionStorageMock';

describe('NavbarComponent', () => {

  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MatIconModule,RouterTestingModule]
    })
      .compileComponents();

    //Creating a instance of component
    //Adding fixture to detect changes
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);

    //Calling the LocalStorageMock, when ever the local storage is called
    const localStorageMock = new LocalStorageMock();
    spyOnProperty(window, 'localStorage').and.returnValue(localStorageMock);

    //Calling the SessionStorageMock, when ever the session storage is called
    const sessionStorageMock = new SessionStorageMock();
    spyOnProperty(window, 'sessionStorage').and.returnValue(sessionStorageMock);

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

});
