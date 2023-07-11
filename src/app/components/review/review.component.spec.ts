import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SavedListService } from 'src/app/services/savedList/saved-list.service';
import { LocalStorageMock } from 'src/app/services/LocalStorageMock';
import { BookListService } from 'src/app/services/bookList/book-list.service';
import { Router } from '@angular/router';
import { SessionStorageMock } from 'src/app/services/SessionStorageMock';
import { By } from '@angular/platform-browser';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let savedListService: SavedListService;

  let bookListService: BookListService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewComponent, NavbarComponent],
      imports: [MatIconModule, HttpClientTestingModule],
      providers: [SavedListService],

    })
      .compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    savedListService = TestBed.inject(SavedListService);
    bookListService = TestBed.inject(BookListService);
    router = TestBed.inject(Router);

    const localStorageMock = new LocalStorageMock();
    spyOnProperty(window, 'localStorage').and.returnValue(localStorageMock);

    const sessionStorageMock = new SessionStorageMock();
    spyOnProperty(window, 'sessionStorage').and.returnValue(sessionStorageMock);
  });

  //Checking if the instance of the component has been created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Checking ngOnInit method
  it('should fetch data from savedListService and localStorage', async () => {

    const mockResponse = ['Book 1', 'Book 2'];

    spyOn(savedListService, 'getSavedList').and.returnValue(mockResponse);

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

    spyOn(bookListService, 'updateData');
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


});
