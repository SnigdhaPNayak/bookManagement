import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Book';
import { BookListService } from 'src/app/services/bookList/book-list.service';
import { SavedListService } from 'src/app/services/savedList/saved-list.service';
import { UserIdService } from 'src/app/services/userId/user-id.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  constructor(private router: Router, private bookListService: BookListService, private savedListService: SavedListService, private userIdService: UserIdService) { }

  selectedList: any[] = []
  bookList: any[] = []
  list: any[] = []
  id:any;

  ngOnInit() {

    //Fetching the list of selected books for review
    this.selectedList = this.savedListService.getSavedList()
    console.log("Fetching the list of selected books for review...\n" + this.selectedList)

    //Fetching the list of avaliable books from local storage
    for (let n = 1; n <= localStorage.length; n++) {
      this.bookList.push(localStorage.getItem(n.toString()));
    }
    console.log("Fetching the list of avaliable books from local storage...\n" + this.bookList)

  }

  submit() {

    //Fetching the book object of, each book name selected by the user
    for (const element of this.selectedList) {
      for (const value of this.bookList) {
        if (new Book(JSON.parse(value)).getBookName() === element) {
          this.list.push(value)
        }
      }

      console.log("List of book objects selected by the user...\n" + this.list)
    }

      this.id = sessionStorage.getItem("id")
      this.bookListService.updateData(this.list, this.id)
    
    //Routing to next page
    this.router.navigate(['/confirmation'])
  }

  selection() {
    //Routing to previous page
    this.router.navigate(['/selection'])
  }

}
