import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectionComponent } from './selection.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SavedListService } from 'src/app/services/savedList/saved-list.service';
import { LocalStorageMock } from 'src/app/services/LocalStorageMock';
import { SessionStorageMock } from 'src/app/services/SessionStorageMock';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('SelectionComponent', () => {
  let component: SelectionComponent;
  let fixture: ComponentFixture<SelectionComponent>;
  let savedListService: SavedListService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectionComponent, NavbarComponent],
      imports: [MatIconModule, HttpClientTestingModule],
      providers: [SavedListService],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    savedListService = TestBed.inject(SavedListService);
    router = TestBed.inject(Router);

    const localStorageMock = new LocalStorageMock();
    spyOnProperty(window, 'localStorage').and.returnValue(localStorageMock);

    const sessionStorageMock = new SessionStorageMock();
    spyOnProperty(window, 'sessionStorage').and.returnValue(sessionStorageMock);
  });

  //Testing if a instance of the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Testing ngOnInit method
  it('should fetch data from localStorage, sessionStorage, and savedListService', () => {

    localStorage.setItem('1', JSON.stringify({ bookID: 1, bookName: 'Book 1', selected: true }));
    localStorage.setItem('2', JSON.stringify({ bookID: 2, bookName: 'Book 2', selected: false }));

    sessionStorage.setItem('id', '1')
    sessionStorage.setItem('1', JSON.stringify({ bookID: 1, bookName: 'Book 1', selected: true }));

    spyOn(savedListService, 'getSavedList').and.returnValue(['Book 4', 'Book 5']);

    component.ngOnInit();

    expect(component.bookList).toEqual(['Book 1', 'Book 2']);
    expect(component.userList).toEqual(['Book 1']);
    expect(component.savedList).toEqual(['Book 4', 'Book 5']);
    expect(component.selectedList).toEqual(['Book 4', 'Book 5']);

  });

  //Checking the updateSelectedList function
  it('should update the selectedList based on checkbox event', () => {
    
    //Initially adding some data to the selectedList
    component.selectedList = ['Book 1', 'Book 2'];

    component.updateSelectedList({ target: { checked: true, value: 'Book 3' } });
    expect(component.selectedList).toEqual(['Book 1', 'Book 2', 'Book 3']);

    
    component.updateSelectedList({ target: { checked: false, value: 'Book 2' } });
    expect(component.selectedList).toEqual(['Book 1', 'Book 3']);
  });

  //Checking the review method
  it('should set selectedList as saved list and navigate to /review', () => {
   
    //Adding some mock data to the selected list
    component.selectedList = ['Book 1', 'Book 2'];

    spyOn(savedListService, 'setSavedList');
    spyOn(router, 'navigate');

    component.review();

    expect(savedListService.setSavedList).toHaveBeenCalledWith(['Book 1', 'Book 2']);
    expect(router.navigate).toHaveBeenCalledWith(['/review']);
  });

  //HTML

  //Checking h2 tag
  it('should display "Select the Books of your choise..." message', () => {
    
    const messageElement = fixture.debugElement.query(By.css('h2'));
  
    expect(messageElement).toBeTruthy();
    expect(messageElement.nativeElement.textContent).toContain('Select the Books of your choise...');
    
  });

});
