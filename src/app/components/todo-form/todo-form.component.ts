// #region Angular's imports
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// #endregion

// #region Project's imports
import { HeaderComponent } from '../header/header.component';
import { TodoSignalsService } from 'src/app/services/todo-signals.service';
// #endregion

// #region Material's imports
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// #endregion

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: [],
})
export class TodoFormComponent {
  // #region Private properties
  private todoSignalService = inject(TodoSignalsService);
  private dialogRefService = inject(MatDialogRef<HeaderComponent>);
  // #endregion

  // #region Public properties
  public allTodos = this.todoSignalService.todoState();

  public todosForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  // #endregion

  public handleCreateNewTodo(): void {
    if (this.todosForm.value && this.todosForm.valid) {
      const id = this.allTodos.length > 0 ? this.allTodos.length + 1 : 1;
      const title = String(this.todosForm.controls["title"].value);
      const description = String(this.todosForm.controls["description"].value);
      const isDone = false;

      this.todoSignalService.addToDo({ id, title, description, isDone });
      this.dialogRefService.close();
    }
  }

  public handleCloseModal(): void {
    this.dialogRefService.close();
  }
}
