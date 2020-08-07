import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'playwright-angular-test';
  angularBlog = false;

  constructor() {
    setTimeout(() => (this.angularBlog = true), 2000);
  }
}
