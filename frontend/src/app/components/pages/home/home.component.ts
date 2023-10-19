import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/shared/models/Book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books:Book[] = [];
  constructor(private bookService:BookService, activatedRoute:ActivatedRoute) {
    let booksObservable:Observable<Book[]>;
    activatedRoute.params.subscribe((params) => {
    if(params.searchTerm)
      booksObservable = this.bookService.getAllBooksBySearchTerm(params.searchTerm);
    else if(params.tag)
      booksObservable = this.bookService.getAllFoodsByTag(params.tag);
    else
      booksObservable = bookService.getAll();

      booksObservable.subscribe((serverBooks) =>  {
        this.books = serverBooks;
      })
     })
    
  }

  ngOnInit(): void {
  }

}