import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/tasks/task';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  constructor() { }

  @Input()
  events: Task[];

  ngOnInit(): void {
  }

}
