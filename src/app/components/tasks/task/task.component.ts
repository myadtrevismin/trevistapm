import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/tasks/task';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  tasks: Task[] = [];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): any{
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Task)
        } ;
      });
    });
  }

}
