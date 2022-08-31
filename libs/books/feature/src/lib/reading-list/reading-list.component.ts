import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList,markAsRead } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
  onMarkedAsRead(item) {
    const readStatus = item.finished ? 'unread' : 'read';
    const message = `${item.title} marked as ${readStatus}`;
    this.store.dispatch(markAsRead({ item }));

    
  }
}
