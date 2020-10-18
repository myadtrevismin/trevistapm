import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/models/tasks/task';
import { TaskModelComponent } from '../task-model/task-model.component';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {

  constructor(public dialog: MatDialog, private taskService: TaskService) { }

  tasks: Task[] = [];
  result;

  ngOnInit(): void {
    this.loadTasks();
  }

  // tslint:disable-next-line: typedef
  addTask(){
      const dialogRef = this.dialog.open(TaskModelComponent);
      dialogRef.afterClosed().subscribe(result => {
        this.result = result;
      });
  }

  // tslint:disable-next-line: typedef
  loadTasks(){
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Task)
        } ;
      });
    });
  }

  editClick(task): void{
    const dialogRef = this.dialog.open(TaskModelComponent, {
      data: task
    });
    dialogRef.afterClosed().subscribe(result => {
      this.result = result;
    });
  }

  // tslint:disable-next-line: typedef
  downloadFile(task: Task){
    // const blob = new Blob([data], { type: 'text/csv' });
    // const url= window.URL.createObjectURL(blob);
    if (task.filedata[0] !== undefined){
      window.open(task.filedata[0].downloadURL);
    }

  }

}
