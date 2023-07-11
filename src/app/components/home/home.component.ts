import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Book';
import { BookListService } from 'src/app/services/bookList/book-list.service';
import { UserIdService } from 'src/app/services/userId/user-id.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private bookListService: BookListService, private userIdService: UserIdService) { 
   //To overwrite the localStorage object with LocalStorageMock in test file
    const localStorage = window.localStorage;
  }

  userList: any[] = []
  tempUserList: any[] = []
  data: any[] = []
  id: any

  ngOnInit() {

    let lengthL = localStorage.length

    //Cheching if the data is present locally - if not fetching the data from the backend.
    if (lengthL == 0) {

      this.id = sessionStorage.getItem("id")
      this.bookListService.getData(this.id).subscribe(value => {
        this.data = value as Array<any>
        console.log("Fetching the data from the backend...")
        console.log(this.data)

        let indexL = 1
        let indexS = 1

        for (const element of this.data) {

          //Storing the list of avaliable books to local storage
          localStorage.setItem(indexL.toString(), JSON.stringify(element))
          indexL++
          console.log("Storing the list of avaliable books to local storage...")

          if (element['selected'] == true) {

            //Storing the list of selected books to user list
            this.userList.push(element['bookName'])

            //Storing the list of selected books to session storage
            sessionStorage.setItem(indexS.toString(), JSON.stringify(element));
            indexS++;
            console.log("Storing the list of selected books to ssession storage...")

          }

        }

      })

    } else {

      //Check the logic
      //Fetching the data from the session storage
      for (let n = 1; n < sessionStorage.length; n++) {
        this.tempUserList.push(sessionStorage.getItem(n.toString()));
      }
      console.log("Fetching the list of books selected by the user, from session storage...\n" + this.tempUserList)

      //Saving the name of books in user list
      for (const temp of this.tempUserList) {
        this.userList.push(new Book(JSON.parse(temp)).getBookName())
      }

    }

  }

  selection() {

    this.router.navigate(['/selection'])

  }

}
