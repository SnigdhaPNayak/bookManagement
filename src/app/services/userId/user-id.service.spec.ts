import { TestBed } from '@angular/core/testing';

//HttpTestingController is a utility provided by HttpClientTestingModule that allows you to mock and control HTTP requests
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserIdService } from './user-id.service';
import { HttpHeaders } from '@angular/common/http';

describe('UserIdService', () => {
  let service: UserIdService;
  let httpTestingController: HttpTestingController;

  //Runs before each test case
  beforeEach(() => {

    TestBed.configureTestingModule({
      //import for creating mock API
      imports: [HttpClientTestingModule]
    });

    //Creating a instance for the service and httpTestingController
    service = TestBed.inject(UserIdService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  //Runs after the complication of each test case
  afterEach(() => {

    //Verifies that there is no unexpected or pending http request. [It will throw an error, if any unexpected requests are found]
    httpTestingController.verify();
  });

  //Checking if the service instance has been created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Test case for getter method
  it('should fetch the user ID', () => {

    const mockCredentials = { userName: 'User1', password: 'Password1' };
    const expectedHeaders = new HttpHeaders().set('content-type', 'application/json');
    const obj = JSON.parse('{"userName":"' + mockCredentials.userName + '","password":"' + mockCredentials.password + '"}');

    //Setting the mock credentials
    service.setUserId(mockCredentials);

    const expectedResponse = { userID: '1' };

    //Calling the getter method [http request]
    service.getUserId().subscribe(response => {

      expect(response).toEqual(expectedResponse);

    });

    //Creating a http mock
    //.expectOne expects a single HTTP request to the specified URL
    //request object is stored in req
    const req = httpTestingController.expectOne('http://localhost:8080/login');

    //Checking if it is a post request
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers).toEqual(expectedHeaders);
    expect(req.request.body).toEqual(obj);

    //To generate a response
    req.flush(expectedResponse);
  });

  //Test case for setter method
  it('should set the data to credentials', () => {
    const mockCredentials = [{ userName: 'User1', password: 'Password1' }];

    let credentials: any;
    //.callFake() allows to provide a custom function, when spy is called
    spyOn(service, 'setUserId').and.callFake((value: any) => {
      credentials = value;
    });

    service.setUserId(mockCredentials);

    expect(credentials).toEqual(mockCredentials);
  });
});
