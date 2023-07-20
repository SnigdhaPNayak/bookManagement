import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookListService } from 'src/app/services/bookList/book-list.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let bookListService: BookListService;
  let router: Router;

  let bookListServiceMock: jasmine.SpyObj<BookListService>;

  bookListServiceMock = jasmine.createSpyObj('BookListService', ['getData', 'updateData']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, NavbarComponent],
      imports: [MatIconModule, HttpClientTestingModule, RouterTestingModule.withRoutes([{ path: 'selection', component: SelectionMockComponent }])],
      providers: [BookListService,
        { provide: BookListService, useValue: bookListServiceMock },]

    })
      .compileComponents();

    //Creating a instance of component
    //Adding fixture to detect changes
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    bookListServiceMock.getData.and.returnValue(of([]));
    fixture.detectChanges();

    //Creating instance of a service
    bookListService = TestBed.inject(BookListService);

    //Creating a instnce for router
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

  //Test case for ngOnInit method when the local storage is empty
  it('should fetch data from the backend and store it in local storage when local storage is empty', () => {

    //Setting the ID to session storage
    sessionStorage.setItem('id', '1')

    const mockResponse = [{ bookID: 1, bookName: 'Book 1', selected: true }, { bookID: 2, bookName: 'Book 2', selected: false }];

    bookListServiceMock.getData.and.returnValue(of(mockResponse));

    //Calling the ngOnInit method
    component.ngOnInit();

    expect(bookListService.getData).toHaveBeenCalledWith('1');
    expect(localStorage.getItem('1')).toBe(JSON.stringify({ bookID: 1, bookName: 'Book 1', selected: true }));
    expect(localStorage.getItem('2')).toBe(JSON.stringify({ bookID: 2, bookName: 'Book 2', selected: false }));
    expect(component.userList).toEqual(['Book 1']);
  });

  //Test case for ngOnInit method when the local storage is not empty
  it('should fetch data from sessionStorage when localStorage is not empty', () => {

    //Adding data to the local storage, because the code checks if the local storage is empty
    localStorage.setItem('1', JSON.stringify({ bookID: 1, bookName: 'Book 1', selected: true }));
    localStorage.setItem('2', JSON.stringify({ bookID: 2, bookName: 'Book 2', selected: false }));

    sessionStorage.setItem('id', '1')
    sessionStorage.setItem('1', JSON.stringify({ bookID: 1, bookName: 'Book 1', selected: true }));

    //Calling the ngOnInit method
    component.ngOnInit();

    expect(component.userList.length).toBe(1);
    expect(component.userList[0]).toBe('Book 1');
  });

  //Test case for selection router link
  it('should navigate to /selection route', () => {
    spyOn(router, 'navigate');
    component.selection();

    expect(router.navigate).toHaveBeenCalledWith(['/selection']);
  });

  //HTML

  //Checking h1 tag
  it('should display ---Your Book List--- message', () => {

    const messageElement = fixture.debugElement.query(By.css('h1'));

    expect(messageElement).toBeTruthy();
    expect(messageElement.nativeElement.textContent).toContain('---Your Book List---');

  });

  //Checking if the text displays when the user list is empty
  //The test case passes, even without explicitly assigning value to the user list [Because, it takes a empty list by default]
  it('should display "The list is currently empty" when userList is empty', () => {
    // component.userList = [];
    // fixture.detectChanges();
    const emptyListElement = fixture.nativeElement.querySelector('p');
    expect(emptyListElement).toBeTruthy()
    expect(emptyListElement.textContent).toBe('The list is currently empty');

  });

  //Checking, if the text is not displayed when the user list is not empty
  it('should not display "The list is currently empty" when userList is not empty', () => {
    component.userList = ['Book 1', 'Book 2'];
    fixture.detectChanges();

    const emptyListElement = fixture.nativeElement.querySelector('p');
    expect(emptyListElement).toBeFalsy();
  });

  //Checking if the list is updated when there is some data in the user list
  it('should display the list items when userList is not empty', () => {
    component.userList = ['Book 1', 'Book 2'];
    fixture.detectChanges();

    const listItemElements = fixture.nativeElement.querySelectorAll('.list-group-item');
    expect(listItemElements.length).toEqual(2);
    expect(listItemElements).toBeTruthy();

  });

  //Checking for when the list is empty
  it('should not display any list items when userList is empty', () => {
    component.userList = [];
    fixture.detectChanges();

    const listItemElements = fixture.nativeElement.querySelectorAll('.list-group-item');
    expect(listItemElements.length).toEqual(0);

    //Expected [object NodeList] to be falsy
    //listItemElements is undefined
    //expect(listItemElements).toBeFalsy();
  });

  //Checking if the selection method is being called on button click
  it('should call selection() function when the button is clicked', () => {
    spyOn(component, 'selection');

    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();

    //.toHaveBeenCalled()[expects a spy]
    expect(component.selection).toHaveBeenCalled();
  });

});

@Component({ template: '' })
class SelectionMockComponent { }
