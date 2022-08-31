import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList,undoRemoveFromReadingList} from '@tmo/books/data-access';
import {MatSnackBar} from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store,private _snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const snackBarRef = this._snackBar.open("Book removed","Undo", { duration: 2000 }); 
     
       snackBarRef
       .onAction()
       .pipe(take(1))
       .subscribe(() => this.store.dispatch(undoRemoveFromReadingList({ item })));
   }
   
}
