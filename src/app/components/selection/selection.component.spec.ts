import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectionComponent } from './selection.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SavedListService } from 'src/app/services/savedList/saved-list.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

describe('SelectionComponent', () => {
  let component: SelectionComponent;
  let fixture: ComponentFixture<SelectionComponent>;
  let savedListService: SavedListService;
  let router: Router;
  let savedListServiceMock: jasmine.SpyObj<SavedListService>;

  savedListServiceMock = jasmine.createSpyObj('SavedListService', ['getSavedList', 'setSavedList']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectionComponent, NavbarComponent],
      imports: [MatIconModule, HttpClientTestingModule, RouterTestingModule.withRoutes([{ path: 'review', component: ReviewMockComponent }])],
      providers: [SavedListService,

        { provide: SavedListService, useValue: savedListServiceMock }

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    savedListService = TestBed.inject(SavedListService);
    router = TestBed.inject(Router);

  });

  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
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

    savedListServiceMock.getSavedList.and.returnValue(['Book 4', 'Book 5']);

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

  //Checking for the checked and diabled status for the checkbox
  it('should render unchecked or diabled checkbox depending on if book is present in user list or saved list', () => {

    component.bookList = ['Book 1', 'Book 2', 'Book 3', 'Book 4'];
    component.userList = ['Book 2', 'Book 3'];
    component.savedList = ['Book 4'];
    fixture.detectChanges();

    const checkboxElement = fixture.nativeElement.querySelectorAll('.form-check-input');
    expect(checkboxElement).toBeTruthy()

    //Book not present in either the user list or saved list
    expect(checkboxElement[0].checked).toBe(false);
    expect(checkboxElement[0].disabled).toBe(false);

    //Book present in the user list
    expect(checkboxElement[1].disabled).toBe(true);
    expect(checkboxElement[1].checked).toBe(true);
    expect(checkboxElement[2].disabled).toBe(true);
    expect(checkboxElement[2].checked).toBe(true);

    //Book Book present in the saved list
    expect(checkboxElement[3].disabled).toBe(false);
    expect(checkboxElement[3].checked).toBe(true);

  });

  //Checking if the review method is being called on button click
  it('should call review() function when the button is clicked', () => {
    spyOn(component, 'review');

    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();

    expect(component.review).toHaveBeenCalled();
  });

});

@Component({ template: '' })
class ReviewMockComponent { }
