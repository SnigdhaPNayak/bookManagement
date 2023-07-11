import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Book';
import { BookListService } from 'src/app/services/bookList/book-list.service';
import { SavedListService } from 'src/app/services/savedList/saved-list.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent {

  constructor(private router: Router, private bookListService: BookListService, private savedListService:SavedListService) { }

  bookList: any[] = []
  userList: any[] = []
  selectedList: any[] = []
  savedList: any[] = []

  tempBookList: any[] = []
  tempUserList: any[] = []

  ngOnInit() {

    //Fetching the list of avaliable books from local storage
    for (let n = 1; n <= localStorage.length; n++) {
      this.tempBookList.push(localStorage.getItem(n.toString()));
    }
    console.log("Fetching the list of avaliable books from local storage...\n" + this.tempBookList)

    //Saving the name of books in book list
    for (const temp of this.tempBookList) {
      this.bookList.push(new Book(JSON.parse(temp)).getBookName())
      console.log(new Book(JSON.parse(temp)).getBookName())
    }


    
    //Fetching the data from the session storage
    //Have removed the =
    for (let n = 1; n < sessionStorage.length; n++) {
      this.tempUserList.push(sessionStorage.getItem(n.toString()));
    }
    console.log("Fetching the list of books selected by the user, from session storage...\n" + this.tempUserList)

    //Saving the name of books in user list
    for (const temp of this.tempUserList) {
      this.userList.push(new Book(JSON.parse(temp)).getBookName())
    }

    
    //Setting the previously selected data to savedList
    this.savedList = this.savedListService.getSavedList()

    //Adding the initial value to the selection list
    this.selectedList = this.savedList
  }

  //Updating the selected list, depending upon whether a checkbox is checked or unchecked
  updateSelectedList(e: any) {

    if (e.target.checked) {
      this.selectedList.push(e.target.value)
    } else {
      let index = this.selectedList.indexOf(e.target.value)
      this.selectedList.splice(index, 1)
    }

  }

  review() {

    //Setting the selected books to the saved list
    this.savedListService.setSavedList(this.selectedList)

    console.log("Setting the selected books to the saved list...\n"+this.selectedList)
    
    this.router.navigate(['/review'])

  }

}
