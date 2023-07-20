import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs';
import { Book } from 'src/app/Book';
import { UserIdService } from '../userId/user-id.service';

@Injectable({
  providedIn: 'root'
})
export class BookListService {

  constructor(private http: HttpClient, private id: UserIdService) { }

  bookList: any[] = []
  selectedList: any[] = []
  result: any[]=[]

  //Fetching the data from the backend
  getData(id: any) {
    console.log("Fetching the data from the backend...")
    return this.http.get(`http://localhost:8080/books/${id}`).pipe(pluck('value'))

  }

  //Adding books to user's book list
  updateData(list: any, id: any) {

    console.log("Id: " + id)
    console.log("list: ")
    console.log(list)
 
    let indexS = sessionStorage.length

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')

    for (const element of list) {

      const obj = JSON.parse('{"bookID":' + new Book(JSON.parse(element)).getBookId() + '}');

      //Adding the new books to the database
      this.http.put<any>(`http://localhost:8080/updateList/${id}`, obj, { 'headers': headers }).pipe(pluck('message')).subscribe(value => {
        this.result.push(value)
      })

      //Adding the new books to the session storage
      sessionStorage.setItem(indexS.toString(), element);
      indexS++;

    }

    console.log(this.result)

  }

}
