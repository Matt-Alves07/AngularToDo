// #region Angular's imports
import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
// #endregion

// #region Project's imports
import { ToDo } from 'src/app/models/model/todo.model';
import { ToDoKeyLocalStorage } from 'src/app/models/enum/todo-key-local-storage';
// #endregion

// #region Material's imports
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TodoSignalsService } from 'src/app/services/todo-signals.service';
// #endregion

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    CommonModule,

    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './todo-card.component.html',
  styleUrls: []
})
export class TodoCardComponent implements OnInit {
  // #region Private properties
  private todoSignalService = inject(TodoSignalsService);
  private todoSignal = this.todoSignalService.todoState;
  // #endregion

  // #region Public properties
  public todoList = computed(() => this.todoSignal());
  // #endregion

  public ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  private getTodosInLocalStorage():void {
    const todosData = localStorage.getItem(ToDoKeyLocalStorage.TODO_LIST) as string;

    todosData && (this.todoSignal.set(JSON.parse(todosData)));
  }

  private saveTodosInLocalStorage(): void {
    this.todoSignalService.setToDosInLocalStorage();
  }

  public handleDoneClick(id: number): void {
    if (id) {
      this.todoSignal.mutate((todos) => {
        const selectedTask = todos.find((todo) => todo?.id === id) as ToDo;
        selectedTask && (selectedTask.isDone = !selectedTask.isDone);
        this.saveTodosInLocalStorage();
      });
    }
  }

  public handleDeleteClick(todo: ToDo): void {
    if (todo) {
      const index = this.todoList().indexOf(todo);
      if (index !== -1) {
        this.todoSignal.mutate((todos) => {
          todos.splice(index, 1);
          this.saveTodosInLocalStorage();
        });
      }
    }
  }
}
