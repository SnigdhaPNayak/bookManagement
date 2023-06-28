import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs';
import { Book } from 'src/app/Book';

@Injectable({
  providedIn: 'root'
})
export class BookListService {

  constructor(private http: HttpClient) { }

  bookList: any[] = []
  selectedList: any[] = []

  //Fetching the data from the backend
  getData(){

    console.log("Fetching the data from the backend...")
    return this.http.get("http://localhost:8080/books").pipe(pluck('data'))

  }

  //Adding books to user's book list
  updateData(list: any) {

    console.log("Adding books to user's book list...\n" + list)

    let lenS = sessionStorage.length
    let indexS = lenS + 1

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')

    for (const element of list) {

      const obj = JSON.parse('{"bookID":' + new Book(JSON.parse(element)).getBookId() + '}');

      //Adding the new books to the database
      this.http.put<any>("http://localhost:8080/updateList/1", obj, { 'headers': headers }).subscribe(value => {
        console.log(value)
      })

      //Adding the new books to the session storage
      sessionStorage.setItem(indexS.toString(), element);
      indexS++;

    }

  }

}
