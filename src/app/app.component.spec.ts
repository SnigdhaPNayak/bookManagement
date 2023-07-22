import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';

describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, MatIconModule
      ],
      declarations: [
        AppComponent, NavbarComponent
      ]
    }).compileComponents();

    //Test fixtures are predefined data sets that you load into a temporary database before running your tests
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'BookManagement'`, () => {
    expect(app.title).toEqual('BookManagement');
  });

  //Checking if, app-navbar and router-outlet are present
  it('should render the navbar and router outlet', () => {

    //nativeElement holds the reference to the underlying DOM object
    const compiled = fixture.nativeElement;

    //querySelector looks for a element that matches the given ID
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

});
