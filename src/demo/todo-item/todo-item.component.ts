import { Component, Input } from '@angular/core';
import { Todo } from "../models/Todo";

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input()
  public todo: Todo;
}
