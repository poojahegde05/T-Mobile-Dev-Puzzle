import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { catchError, concatMap, exhaustMap, map ,switchMap} from 'rxjs/operators';
import { ReadingListItem ,Book} from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import {MatSnackBar} from '@angular/material/snack-bar';
import { take,tap } from 'rxjs/operators';


@Injectable()
export class ReadingListEffects implements OnInitEffects {
 
  
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      switchMap(({ book }) =>
        this.http.post('/api/reading-list', book)
        .pipe(
          map(() => 

          ReadingListActions.confirmedAddToReadingList({ data:book ,isAdd:true}),
          ),
          catchError(() => 
            /* Call snackbar here, or return an error action */
            //this._snackBar.open(`${book.title} not added to your reading list!`,"Try again", { duration: 3000 })
            of(ReadingListActions.failedAddToReadingList({ book })
          ))
        )
      )
    )
  );
  
  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      switchMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingList({ data:item ,isAdd:false}),
            ),
          catchError(() =>
          //this._snackBar.open(`${item.title} not removed from your reading list!`,"Try again", { duration: 3000 })
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  showSnackbar$ = createEffect(() =>{
    return this.actions$.pipe(
      ofType(ReadingListActions.confirmedAddToReadingList,
        ReadingListActions.confirmedRemoveFromReadingList),
       
        map(({data,isAdd}) =>{
          const book = data as Book;
          isAdd?this._snackBar.open(`${data.title} added to your reading list!`,"Undo", { duration: 3000 })
          .onAction()
          .pipe(take(1))
          .subscribe(() => this.store.dispatch(ReadingListActions.undoAddToReadingList({ book }))
          ):this._snackBar.open(`${data.title} removed from your reading list!`,"Undo", { duration: 3000 })
            .onAction()
            .pipe(take(1))
            .subscribe(() => this.store.dispatch(ReadingListActions.undoRemoveFromReadingList({ item:{ bookId: book.id, ...book } }))
            ),
          {}
        })
      )
    },
   {dispatch:false},
  );

  undoAddBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.undoAddToReadingList),
      switchMap(({ book }) =>{
         const item: ReadingListItem = { bookId: book.id, ...book };
        return this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.confirmedUndoRemoveFromReadingList({ item }),
            ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      })
    )
  );

  undoRemoveBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.undoRemoveFromReadingList),
      switchMap(({ item }) =>{
        const book: Book = { id: item.bookId, ...item };
        return this.http.post('/api/reading-list', book).pipe(
          map(() => ReadingListActions.confirmedUndoAddToReadingList({ book })
          ),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      })
    )
  );
  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(private actions$: Actions, private http: HttpClient,private _snackBar: MatSnackBar, private readonly store: Store) {}
}
