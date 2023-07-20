import { TestBed } from '@angular/core/testing';
import { BookListService } from './book-list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';
import { Book } from 'src/app/Book';

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

  });

  //Runs after the complication of each test case
  afterEach(() => {

    localStorage.clear()
    sessionStorage.clear()

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

  //Test case for update method
  it('should update data in the backend and session storage', () => {
    const list = ['{"bookID": 1, "bookName": "Book1","selected": true }', '{"bookID": 2, "bookName": "Book2","selected": false }'];
    const id = 1;

    //Adding initial value to the session storage
    sessionStorage.setItem('id', '1')

    const expectedResponse = { message: 'UPDATED' };

    const expectedUrl = `http://localhost:8080/updateList/${id}`;
    const expectedHeaders = new HttpHeaders().set('content-type', 'application/json');

    //Calling the update method [http request]
    service.updateData(list, id)

    const requests = httpTestingController.match(expectedUrl);

    expect(requests.length).toEqual(2);

    expect(requests[0].request.method).toEqual('PUT');
    expect(requests[1].request.method).toEqual('PUT');

    expect(requests[0].request.headers).toEqual(expectedHeaders);
    expect(requests[1].request.headers).toEqual(expectedHeaders);

    for (let i = 0; i < list.length; i++) {

      const element = list[i];
      const obj = JSON.parse('{"bookID":' + new Book(JSON.parse(element)).getBookId() + '}');
      expect(requests[i].request.body).toEqual(obj);

      requests[i].flush(expectedResponse);

    }

    expect(service.result).toEqual(['UPDATED', 'UPDATED'])
    //It's 3 because, user id id also stored in the session storage
    expect(sessionStorage.length).toBe(3);

  });

});
