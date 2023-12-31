import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvalidCredentialsComponent } from './invalid-credentials.component';
import { By } from '@angular/platform-browser';

describe('InvalidCredentialsComponent', () => {
  let component: InvalidCredentialsComponent;
  let fixture: ComponentFixture<InvalidCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvalidCredentialsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InvalidCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //HTML

  //Checking p tag
  it('should display "Invalid Credentials" message', () => {

    const messageElement = fixture.debugElement.query(By.css('p'));

    expect(messageElement).toBeTruthy();
    expect(messageElement.nativeElement.textContent).toContain('Invalid Credentials');

  });

});
