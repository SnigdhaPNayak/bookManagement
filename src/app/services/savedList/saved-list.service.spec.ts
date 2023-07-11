import { TestBed } from '@angular/core/testing';
import { SavedListService } from './saved-list.service';

describe('SavedListService', () => {
  let service: SavedListService;

  //Runs before each test case
  beforeEach(() => {
    TestBed.configureTestingModule({  
    });

    //Creating a instance of the service
    service = TestBed.inject(SavedListService);
  });

  //Checking if the instance of the service has been created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Test case for the getter method
  it('should fetch the saved list', () => {
    const mockSavedList = ['Book1', 'Book2'];

    spyOn(service, 'getSavedList').and.returnValue(mockSavedList);

    const result = service.getSavedList();

    //.toHaveBeenCalled()[expects a spy] is checked when spyOn is used
    expect(service.getSavedList).toHaveBeenCalled();
    expect(result).toEqual(mockSavedList);
  });

  //Test case for the setter method
  //save the received data inside the call back function of .callFake(), while using spyOn for the setter method [Otherwise the data does not get updated]
  it('should set the data to savedList', () => {
    const mockSavedList = ['Book1', 'Book2'];

    let savedList: any;

    //.callFake() allows to provide a custom function, when spy is called
    spyOn(service, 'setSavedList').and.callFake((value: any) => {
      savedList = value;
    });

    service.setSavedList(mockSavedList);

    //.toHaveBeenCalled()[expects a spy] is checked when spyOn is used
    expect(service.setSavedList).toHaveBeenCalled();
    expect(savedList).toEqual(mockSavedList);
  });

});
