import { TestBed } from '@angular/core/testing';

import { BookListService } from './book-list.service';

describe('BookListService', () => {
  let service: BookListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookListService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 /* it('test bookList to have been defined', () => {
    expect(service.bookList).toBeDefined
  });

  it('test getter method',()=>{ 
    const spy = spyOnProperty(service,'getBookList','get').and.returnValue(["Things Fall Apart", "The Divine Comedy", "The Epic Of Gilgamesh", "The Book Of Job", "One Thousand and One Nights", "Pride and Prejudice", "The Decameron", "Ficciones", "Wuthering Heights", "The Stranger"])
    expect(service.getBookList).toEqual(["Things Fall Apart", "The Divine Comedy", "The Epic Of Gilgamesh", "The Book Of Job", "One Thousand and One Nights", "Pride and Prejudice", "The Decameron", "Ficciones", "Wuthering Heights", "The Stranger"]);
    expect(spy).toHaveBeenCalled();
  });*/
});
