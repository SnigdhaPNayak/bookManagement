import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookListService } from 'src/app/services/bookList/book-list.service';
import { LocalStorageMock } from 'src/app/services/LocalStorageMock';
import { SessionStorageMock } from 'src/app/services/SessionStorageMock';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let bookListService: BookListService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, NavbarComponent],
      imports: [MatIconModule, HttpClientTestingModule, RouterTestingModule],
      providers: [BookListService]

    })
      .compileComponents();

    //Creating a instance of component
    //Adding fixture to detect changes
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //Creating instance of a service
    bookListService = TestBed.inject(BookListService);

    //Calling the LocalStorageMock, when ever the local storage is called
    const localStorageMock = new LocalStorageMock();
    spyOnProperty(window, 'localStorage').and.returnValue(localStorageMock);

    //Calling the SessionStorageMock, when ever the session storage is called
    const sessionStorageMock = new SessionStorageMock();
    spyOnProperty(window, 'sessionStorage').and.returnValue(sessionStorageMock);

    //Creating a instnce for router
    router = TestBed.inject(Router);

  });

  //Checking if the instance of the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Test case for ngOnInit method when the local storage is empty
  it('should fetch data from the backend and store it in local storage when local storage is empty', () => {

    //Setting the ID to session storage
    sessionStorage.setItem('id','1')

    const mockResponse = [{ bookID: 1, bookName: 'Book 1', selected: true }, { bookID: 2, bookName: 'Book 2', selected: false }];

    spyOn(bookListService, 'getData').and.returnValue(of(mockResponse));

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

});
