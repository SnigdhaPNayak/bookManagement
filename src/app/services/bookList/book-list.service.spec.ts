import { TestBed } from '@angular/core/testing';
import { BookListService } from './book-list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';
import { Book } from 'src/app/Book';
import { SessionStorageMock } from '../SessionStorageMock';


describe('BookListService', () => {
  let service: BookListService;
  let httpTestingController: HttpTestingController;

  //Runs before each test case
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    //Creating a instance for the service and httpTestingController
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookListService);

    //Calling the SessionStorageMock, when ever the session storage is called
    const sessionStorageMock = new SessionStorageMock();
    spyOnProperty(window, 'sessionStorage').and.returnValue(sessionStorageMock);

  });

  //Runs after the complication of each test case
  afterEach(() => {

    //Verifies that there is no unexpected or pending http request. [It will throw an error, if any unexpected requests are found]
    httpTestingController.verify();
  });

  //Checking if the instance of the service has been created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Test case for getter method
  it('should fetch the data from the backend', () => {

    const id = 1;
    const res = { "value": [{ "bookID": 1, "bookName": "Book1", "selected": true }] };

    const expectedResponse = [{ "bookID": 1, "bookName": "Book1", "selected": true }];

    //Calling the getter method(http request)
    service.getData(id).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    //Creating a http mock
    //.expectOne expects a single HTTP request to the specified URL
    //request object is stored in req
    const req = httpTestingController.expectOne(`http://localhost:8080/books/${id}`);

    //Checking if it is a get request
    expect(req.request.method).toEqual('GET');

    //To generate a response
    req.flush(res);

  });

  //Try for multiple books
  //Getting error [Expected one matching request for criteria "Match URL: http://localhost:8080/updateList/1", found 2 requests]

  //Test case for update method
  it('should update data in the backend and session storage', () => {
    const list = ['{"bookID": 1, "bookName": "Book1","selected": true }'];
    const id = 1;

    //Adding initial value to the session storage
    sessionStorage.setItem('id', '1')

    const expectedResponse = { message: 'UPDATED' };

    //Calling the update method [http request]
    service.updateData(list, id);


    const expectedUrl = `http://localhost:8080/updateList/${id}`;
    const expectedHeaders = new HttpHeaders().set('content-type', 'application/json');

    for (let i = 0; i < list.length; i++) {

      const element = list[i];
      const obj = JSON.parse('{"bookID":' + new Book(JSON.parse(element)).getBookId() + '}');

      //Creating a http mock
      //.expectOne expects a single HTTP request to the specified URL
      //request object is stored in req
      const req = httpTestingController.expectOne(expectedUrl);

      expect(req.request.method).toEqual('PUT');
      expect(req.request.headers).toEqual(expectedHeaders);
      expect(req.request.body).toEqual(obj);

      //To generate a response
      req.flush(expectedResponse);

      expect(service.result).toEqual({ message: 'UPDATED' })
      expect(sessionStorage.getItem('1')).toEqual('{"bookID": 1, "bookName": "Book1","selected": true }')

    }
    expect(sessionStorage.length).toBe(2);

  });

});
