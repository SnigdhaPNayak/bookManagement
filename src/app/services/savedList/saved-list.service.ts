import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SavedListService {

  savedList: any[] = []

  //Fetching the saved list
  getSavedList() {

    console.log("Fetching the saved list...\n"+this.savedList)
    return this.savedList

  }

  //Setting the data to saved list
  setSavedList(list: any) {

    console.log("Setting the data to saved list...\n"+this.savedList)
    this.savedList = list

  }

}
