import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../models/Todo';


@Component({
  selector: 'todo',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent {
  public todoItems: Todo[] = [
    new Todo(1, 'Todo1', false),
    new Todo(2, 'Todo2', false),
    new Todo(3, 'Todo3', false),
  ];
  public task: string = "";

  public submit(form: NgForm) {
    this.todoItems = [
      ...this.todoItems,
      new Todo(this.todoItems.length, form.value.task, false),
    ];
    form.resetForm();
  }
}
