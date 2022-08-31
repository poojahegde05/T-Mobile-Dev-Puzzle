# Code reviews

- Using Async pipe in ./book-search.component.ts
Angular's async pipe is a pipe that subscribes to an Observable or Promise for you and returns the last value that was emitted.
If you subscribe() to an Observable or Promise you'll need to unsubscribe() at the end of your component's life cycle to avoid memory leaks.
Change detection works splendidly with the async pipe.
We don't have to unsubscribe manually because the AsyncPipe handles this for us.
Not to mention that it makes our code more readable and clean.

-Book added successfully, Book deleted successfully alert messages could have been added in the app.

# Lighthouse accessibility check

## Names and labels
- Buttons do not have an accessible name
    - Failing elements :
       button.mat-focus-indicator.mat-icon-button.mat-button-base.ng-tns-c71-1
        - Added `aria-label` to to the failing items in ./book-search.component.html
         - Added `aria-label` to to the failing item in ./app.component.html
       

## Contrast
- Background and foreground colors do not have a sufficient contrast ratio
   Failing elements :  
    1.p tag(too light )
       - changed `$gray50` variable for `#ff4081` in ./book-search.component.html
    2.p tag in empty div element(too light for white background) in ./book-search.component.html
    -Changed from  color for field .mat-form-field-label  to $gray80;
    -Changed from  color for field .mat-form-field-label on focus   to $gray30;
    
    3.p tag in empty div element(too light for white background) in ./reading-list.component.html
    -Changed from  color: $gray60; to color: $gray80;


## Chrome Lighthouse manual checks

    - Logical tab order? 
    1.All interactive elements are accessible with tabbing?
    checked 
    2.The tab order coordinates with the structure of the page (left to right, top to bottom – header first, then main navigation, then page navigation (if present), and finally the footer)?
    checked(url,header,page navigation):works in this order

    - Interactive controls are keyboard focusable 
      checked(using the tab return and arrow keys)
      I checked this feature with adding and removing the books 

