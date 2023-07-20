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

  //Test case for setter method
  it('should set the data to savedList', () => {
    const mockList = ['Book1', 'Book2'];

    service.setSavedList(mockList);

    expect(service.savedList).toEqual(mockList);
  });

  //Test case for the getter method
  it('should fetch the saved list', () => {

    service.savedList = ['Book1', 'Book2'];
    const result = service.getSavedList();

    expect(result).toEqual(['Book1', 'Book2']);
  });

});
