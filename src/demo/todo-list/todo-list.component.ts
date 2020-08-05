import { Component, Input, OnInit } from '@angular/core';
import { Todo } from './../models/Todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() todoItems: Todo[] = [];

  public ngOnInit() {
  }
}
