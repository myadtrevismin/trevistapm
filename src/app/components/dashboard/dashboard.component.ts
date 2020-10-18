import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Discussion } from 'src/app/models/discussions/discussion';
import { FileModel } from 'src/app/models/files/file-model';
import { Payment } from 'src/app/models/payments/payment';
import { Project } from 'src/app/models/project.model';
import { Task } from 'src/app/models/tasks/task';
import { Team } from 'src/app/models/teams/team';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private firStore: AngularFirestore, private router: Router) { }

  projects: Project[] = [];
  discussions: Discussion[] = [];
  tasks: Task[] = [];
  teams: Team[] = [];
  files: FileModel[] = [];
  payments: Payment[] = [];


  ngOnInit(): void {
    this.loadAllCollections();
  }

  loadAllCollections(): void{
    this.firStore.collection('projects').snapshotChanges().subscribe(data => {
      this.projects = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Project)
        } ;
      });
    });

    this.firStore.collection('discussions').snapshotChanges().subscribe(data => {
      this.discussions = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Discussion)
        } ;
      });
    });

    this.firStore.collection('files').snapshotChanges().subscribe(data => {
      this.files = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as FileModel)
        } ;
      });
    });

    this.firStore.collection('teams').snapshotChanges().subscribe(data => {
      this.teams = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Team)
        } ;
      });
    });

    this.firStore.collection('tasks').snapshotChanges().subscribe(data => {
      this.tasks = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Task)
        } ;
      });
    });

    this.firStore.collection('payments').snapshotChanges().subscribe(data => {
      this.payments = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Payment)
        } ;
      });
    });

  }

  navigatetoroute(path){
    this.router.navigate([path]);
  }

}
