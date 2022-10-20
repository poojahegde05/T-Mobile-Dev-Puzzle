# Code smells

- `book-search.component.ts` =>Using Async pipe in ./book-search.component.ts `resolved`
  Angular's async pipe is a pipe that subscribes to an Observable for you and returns the last value that was emitted.
  If you subscribe() to an Observable you'll need to unsubscribe() at the end of your component's life cycle to avoid memory leaks.
  Change detection works splendidly with the async pipe.
  We don't have to unsubscribe manually because the AsyncPipe handles this for us.
  Not to mention that it makes our code more readable and clean.
- `book-search.component.html` => Responsive design is not handled for list of books.
- `reading-list.reducer.spec.ts` => Test cases are failing `resolved`
- `reading-list.reducer.ts` => failedAddToReadingList & failedRemoveFromReadingList actions are not caught in the reducer. We need to handle failure of add/remove book API calls so we can revert the state for added/removed book else it will result in inaccurate data being displayed to the user.`resolved`

# Code improvements

- `book-search.component.html, reading-list.component.html` => There is no spinner while fetching books, in case loading takes time.
- Provide informational message to the user, if books are not found for the specific search term.
- `books.effects.ts, reading-list.effects.ts` => Constant can be  used for API endpoints.
- `book-search.component.html` => Instead of interpolating coverUrl `<img src="{{ b.coverUrl }}" />`, we can use property binding on src attribute `<img [src]="b.coverUrl" />`.

-

# Lighthouse accessibility check

## Names and labels

- Buttons do not have an accessible name(implemented)
  - Failing elements :
    button.mat-focus-indicator.mat-icon-button.mat-button-base.ng-tns-c71-1
    - Added `aria-label` to to the failing items in ./book-search.component.html
    - Added `aria-label` to to the failing item in ./app.component.html

## Contrast

- Background and foreground colors do not have a sufficient contrast ratio(implemented)
  Failing elements :  
   1.p tag(too light ) - changed `$gray50` variable for `#ff4081` in ./book-search.component.html
  2.p tag in empty div element(too light for white background) in ./book-search.component.html
  3.p tag in empty div element(too light for white background) in ./reading-list.component.html
  -Changed from color: $gray60; to color: $gray80;

## Chrome Lighthouse manual checks

    - Logical tab order?
    1.All interactive elements are accessible with tabbing?
    checked
    2.The tab order coordinates with the structure of the page (left to right, top to bottom – header first, then main navigation, then page navigation (if present), and finally the footer)?
    checked(url,header,page navigation):works in this order

    - Interactive controls are keyboard focusable
      checked(using the tab return and arrow keys)
      I checked this feature with adding and removing the books
  
- `book-search.component.html` => We need to set aria-label attribute for "Want to Read" button with book's name in it's value, this can help screenreader to inform user which book's Want to Read button is focused.`resolved`
- `app.component.html` => Close reading list button is only icon button, so we should add aria-label attribute to the button so it will help screenreaders to inform user. Also close button keyboard focus propert needs attention.`resolved`
- `book-search.component.html` => Example "JavaScript" link should preferably be a button instead of anchor tag.anchor tag used for redirection.
- `book-search.component.html` => Search button is icon only button, so we should add aria-label attribute to the button so it will help screenreaders to inform user.focus property needs attention.`resolved`