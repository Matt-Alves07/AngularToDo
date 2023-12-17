// #region Angular imports
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// #endregion

// #region Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
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
  public handleOpenModal(): void {
    console.log("It's me, abestado.");
  }
}
