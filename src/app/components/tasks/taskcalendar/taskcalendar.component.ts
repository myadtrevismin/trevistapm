import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Task } from 'src/app/models/tasks/task';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-taskcalendar',
  templateUrl: './taskcalendar.component.html',
  styleUrls: ['./taskcalendar.component.scss']
})
export class TaskcalendarComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  @Input()
  events: Task[] = [];
  loadEvents = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    // dateClick: this.handleDateClick, // bind is important!
  };

  ngOnInit(): void {
    this.calendarOptions.eventClick = this.handleDateClick;
    this.events.forEach(x => {
      this.loadEvents.push({
        title: x.name,
        start: x.startDate.toDate(),
        end: x.endDate.toDate(),
        backgroundColor: x.status === 'Open' ? 'rbg(0,0,255)' : x.status === 'InProgress' ? 'yellow' : 'green',
        textColor: '#333'
      });
    });
    this.calendarOptions.events = this.loadEvents;
  }

  // tslint:disable-next-line: typedef
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

}
