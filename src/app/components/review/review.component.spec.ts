import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SavedListService } from 'src/app/services/savedList/saved-list.service';

import { BookListService } from 'src/app/services/bookList/book-list.service';
import { Router } from '@angular/router';

import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let savedListService: SavedListService;
  let bookListService: BookListService;
  let router: Router;
  let savedListServiceMock: jasmine.SpyObj<SavedListService>;
  let bookListServiceMock: jasmine.SpyObj<BookListService>;

  savedListServiceMock = jasmine.createSpyObj('SavedListService', ['getSavedList', 'setSavedList']);
  bookListServiceMock = jasmine.createSpyObj('BookListService', ['getData', 'updateData']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewComponent, NavbarComponent],
      imports: [MatIconModule, HttpClientTestingModule, RouterTestingModule.withRoutes([{ path: 'selection', component: SelectionMockComponent }, { path: 'confirmation', component: ConfirmationMockComponent }])],
      providers: [SavedListService,
        { provide: SavedListService, useValue: savedListServiceMock },
        { provide: BookListService, useValue: bookListServiceMock }],

    })
      .compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;

    savedListServiceMock.getSavedList.and.returnValue(['Book 1', 'Book 2']);
    fixture.detectChanges();

    savedListService = TestBed.inject(SavedListService);
    bookListService = TestBed.inject(BookListService);
    router = TestBed.inject(Router);

  });

  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  });

  //Checking if the instance of the component has been created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Checking ngOnInit method
  it('should fetch data from savedListService and localStorage', async () => {

    const mockResponse = ['Book 1', 'Book 2'];

    localStorage.setItem('1', JSON.stringify({ bookID: 1, bookName: 'Book 1', selected: true }));
    localStorage.setItem('2', JSON.stringify({ bookID: 2, bookName: 'Book 2', selected: true }));

    component.ngOnInit();

    expect(component.selectedList).toEqual(mockResponse);
    expect(component.bookList).toEqual([JSON.stringify({ bookID: 1, bookName: 'Book 1', selected: true }), JSON.stringify({ bookID: 2, bookName: 'Book 2', selected: true })]);
  });

  //Checking submit method
  it('should fetch book objects, update data, and navigate to /confirmation', () => {

    component.selectedList = ['Book 1'];
    component.bookList = [JSON.stringify({ bookID: 1, bookName: 'Book 1', selected: true }), JSON.stringify({ bookID: 2, bookName: 'Book 2', selected: true })];

    sessionStorage.setItem('id', '1')

    spyOn(router, 'navigate');

    component.submit();

    expect(component.list).toEqual([JSON.stringify({ bookID: 1, bookName: 'Book 1', selected: true })]);
    expect(bookListService.updateData).toHaveBeenCalledWith([JSON.stringify({ bookID: 1, bookName: 'Book 1', selected: true })], '1');
    expect(router.navigate).toHaveBeenCalledWith(['/confirmation']);
  });

  //Checking selection method
  it('should navigate to /selection route', () => {

    spyOn(router, 'navigate');
    component.selection();

    expect(router.navigate).toHaveBeenCalledWith(['/selection']);

    /*  Can also assign the spy to a varible and use that in the expect method
    
      const navigateSpy = spyOn(router, 'navigate');
      component.selection();
      expect(navigateSpy).toHaveBeenCalledWith(['/selection']);*/

  });

  //HTML

  //Checking h2 tag
  it('should display "Review the selected list of books..." message', () => {

    const messageElement = fixture.debugElement.query(By.css('h2'));

    expect(messageElement).toBeTruthy();
    expect(messageElement.nativeElement.textContent).toContain('Review the selected list of books...');

  });

  //Checking if the text displays when the selected list is empty
  it('should display "You haven\'t selected any book" when selectedList is empty', () => {

    component.selectedList = [];
    fixture.detectChanges();

    const emptyListElement = fixture.nativeElement.querySelector('p');

    expect(emptyListElement.textContent).toBe('You haven\'t selected any book');
    expect(emptyListElement).toBeTruthy()
  });

  //Checking, if the text is not displayed when the selected list is not empty
  it('should not display "You haven\'t selected any book" when selectedList is not empty', () => {

    component.selectedList = ['Book 1', 'Book 2', 'Book 3'];
    fixture.detectChanges();

    const emptyListElement = fixture.nativeElement.querySelector('p');

    expect(emptyListElement).toBeFalsy()

  });

  //Checking if the list is updated when there is some data in the selected list
  it('should display the selectedList items when selectedList is not empty', () => {
    component.selectedList = ['Book 1', 'Book 2', 'Book 3'];
    fixture.detectChanges();
    const listItemElements = fixture.nativeElement.querySelectorAll('.list-group-item');

    expect(listItemElements.length).toBe(3);
    expect(listItemElements).toBeTruthy()

  });

  //Checking if the selected list is empty
  it('should display the selectedList items when selectedList is not empty', () => {
    component.selectedList = [];
    fixture.detectChanges();
    const listItemElements = fixture.nativeElement.querySelectorAll('.list-group-item');

    expect(listItemElements.length).toEqual(0);
    //Expected [object NodeList] to be falsy
    //expect(listItemElements).toBeFalsy();

  });

  //Checking if the selection method is being called on button click
  it('should call selection() function when the button is clicked', () => {
    spyOn(component, 'selection');

    const buttonElement = fixture.nativeElement.querySelector('.selection');
    buttonElement.click();

    expect(component.selection).toHaveBeenCalled();
  });

  //Checking if the submit method is being called on button click
  it('should call submit() function when the button is clicked', () => {
    spyOn(component, 'submit');

    const buttonElement = fixture.nativeElement.querySelector('.submit');
    buttonElement.click();

    expect(component.submit).toHaveBeenCalled();
  });

  //const buttonElement = fixture.nativeElement.querySelector('button');
  //Even when no class name is mentioned and both of the button element are called from the above syntax, still the correct element is fetched.

});

@Component({ template: '' })
class SelectionMockComponent { }

@Component({ template: '' })
class ConfirmationMockComponent { }
