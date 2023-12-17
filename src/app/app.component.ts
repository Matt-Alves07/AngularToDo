// #region Angular imports
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// #endregion

// #region Project's imports
import { HeaderComponent } from './components/header/header.component';
// #endregion

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-list';
}
