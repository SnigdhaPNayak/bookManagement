import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationComponent } from './confirmation.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationComponent,NavbarComponent ],
      imports:[MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //HTML

  //Checking if the contents of the page are present
  it('should display "Saved Successfully!" message, a home icon and a link to the home page', () => {
  
    //Looks for the element, based on provided html tag name 
    const iconElement = fixture.debugElement.query(By.css('mat-icon'));
    const messageElement = fixture.debugElement.query(By.css('h1'));
    const linkElement = fixture.debugElement.query(By.css('a'));
  
    //Checks if a instance is created [returns true or false]
    expect(iconElement).toBeTruthy();
    expect(messageElement).toBeTruthy();
    expect(linkElement).toBeTruthy();
  
    //To check the text contain of a element
    expect(iconElement.nativeElement.textContent).toContain('check_circle_outline');
    expect(messageElement.nativeElement.textContent).toContain('Saved Successfully!');
    expect(linkElement.nativeElement.textContent).toContain('Home Page');

  });
  
});
