import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Book';
import { BookListService } from 'src/app/services/bookList/book-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private bookListService: BookListService) { }

  userList: any[] = []
  tempUserList: any[] = []
  data: any[] = []

  ngOnInit() {

    //Fetching the data from the backend
    this.bookListService.getData().subscribe(value => {
      this.data = value as Array<any>
      console.log("Fetching the data from the backend...\n" + this.data)

      let lengthL = localStorage.length
      let lengthS = sessionStorage.length

      //Cheching if the data is present locally - if not fetching the data from the backend.
      if (lengthL == 0 || lengthS == 0) {

        localStorage.clear()
        sessionStorage.clear()

        //Index for local storage
        let lengthL = localStorage.length
        let indexL = lengthL + 1

        //Index for session storage
        let lengthS = sessionStorage.length
        let indexS = lengthS + 1


        for (const element of this.data) {

          //Storing the list of avaliable books to local storage
          localStorage.setItem(indexL.toString(), JSON.stringify(element))
          indexL++

          console.log("Selected books...")
          if (element['selected'] == true) {

            console.log(element)

            //Storing the list of selected books to user list
            const obj = new Book(element)
            this.userList.push(obj.getBookName())

            //Storing the list of selected books to session storage
            sessionStorage.setItem(indexS.toString(), JSON.stringify(element));
            indexS++;

          }

        }


      } else {

        //Fetching the data from the session storage
        for (let n = 1; n <= sessionStorage.length; n++) {
          this.tempUserList.push(sessionStorage.getItem(n.toString()));
        }
        console.log("Fetching the list of books selected by the user, from session storage...\n" + this.tempUserList)

        //Saving the name of books in user list
        for (const temp of this.tempUserList) {
          this.userList.push(new Book(JSON.parse(temp)).getBookName())
        }

      }

    })

  }

  selection() {

    this.router.navigate(['/selection'])

  }

}
