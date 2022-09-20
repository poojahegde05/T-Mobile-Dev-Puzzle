import { Component, OnInit,OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Observable, Subscription } from 'rxjs';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit,OnDestroy{
  books$: Observable<ReadingListBook[]>;
  searchbook:Subscription;
  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.searchbook=this.searchForm.get("term").valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(selectedValue=>{
    this.store.dispatch(searchBooks({ term: selectedValue}));
      
    })
      
    this.books$ = this.store.select(getAllBooks);
    
  }
  

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    
    if (this.searchForm.value.term) {
      console.log(this.searchForm.get("term").value);
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
      }
  }
  ngOnDestroy(){
    this.searchbook.unsubscribe();
  }
  
}
