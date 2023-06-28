import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionComponent } from './selection.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';

describe('SelectionComponent', () => {
  let component: SelectionComponent;
  let fixture: ComponentFixture<SelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionComponent, NavbarComponent ],
      imports:[MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test ngOnInit', () => {
    component.ngOnInit()
  
  });
});
