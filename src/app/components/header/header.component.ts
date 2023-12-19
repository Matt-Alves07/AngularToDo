// #region Angular's imports
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// #endregion

// #region Project's imports
import { TodoFormComponent } from '../todo-form/todo-form.component';
// #endregion

// #region Material's imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// #endregion

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
  ],
})
export class HeaderComponent {
  private dialogService = inject(MatDialog);

  public handleOpenModal(): void {
    this.dialogService
      .open(TodoFormComponent, {
        width: '50vw',
        maxHeight: '80vh',
      });
  }
}
