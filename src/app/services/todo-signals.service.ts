// #region Angular imports
import { Injectable, signal } from '@angular/core';
// #endregion

// #region Project imports
import { ToDo } from '../models/model/todo.model';
import { ToDoKeyLocalStorage } from '../models/enum/todo-key-local-storage';
// #endregion

@Injectable({
  providedIn: 'root'
})
export class TodoSignalsService {
  // #region Signal state property
  public todoState = signal<Array<ToDo>>([]);
  // #endregion

  // #region CRUD methods
  public addToDo({id, title, description, isDone}: ToDo): void {
    if ((id && title && description !== null) || undefined) {
      this.todoState
        .mutate((todos) => {
          if (todos !== null)
            todos.push(new ToDo(id, title, description, isDone))
        });

      this.setToDosInLocalStorage();
    }
  }

  public setToDosInLocalStorage(): void {
    const todos = JSON.stringify(this.todoState());
    todos && localStorage.setItem(ToDoKeyLocalStorage.TODO_LIST, todos);
  }
  // #endregion
}
