import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/discussions/discussion';
import { Project } from 'src/app/models/project.model';
import {AdminService} from 'src/app/services/admin/admin.service';
import { ProjectService } from 'src/app/services/projects/project.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/tasks/task';
import { FiredatePipe } from 'src/app/pipes/firedate.pipe';
import Timestamp = firestore.Timestamp;
import { TaskService } from 'src/app/services/tasks/task.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Team } from 'src/app/models/teams/team';

@Component({
  templateUrl: './task-model.component.html',
  styleUrls: ['./task-model.component.scss'],
})
export class TaskModelComponent implements OnInit {

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<TaskModelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Task,
              public adminService: AdminService,
              private projectService: ProjectService,
              private afStorage: AngularFireStorage,
              private firestore: AngularFirestore,
              private taskService: TaskService,
              private authService: AuthService,
              private firedate: FiredatePipe) { }

  taskForm: FormGroup;
  taskStatus = [
    {id: 0, status: 'Open'},
    {id: 1, status: 'InProgress'},
    {id: 2, status: 'Closed'}
  ];
  users;
  groups;
  projects;
  files: File[];
  percentage;
  snapshot: Observable<any>;
  fileurls = [];

  ngOnInit(): void {
    console.log(this.authService.user);
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      assignedTo: ['', Validators.required],
      assignmentGroup: [''],
      createdBy: [this.authService.user.uid, Validators.required],
      createdDt: [new Date(), Validators.required],
      projectId: ['', Validators.required],
      files: [''],
      notes: [''],
    });

    this.assignTaskForm();
    this.loadUsers();
    this.loadProjects();
    this.loadGroups();
  }

  assignTaskForm(): void{
    if (this.data !== undefined && this.data !== null){
      this.taskForm.patchValue({
        name: this.data.name,
        startDate: this.data?.startDate.toDate(),
        endDate: this.data?.endDate.toDate(),
        status: this.data.status,
        assignedTo: this.data.assignedTo,
        assignmentGroup: this.data.assignmentGroup,
        createdBy: this.data.createdBy,
        createdDt: this.data.createdDt,
        projectId: this.data.projectId,
        files: this.data.files,
        notes: this.data.notes
      });
    }
  }

  loadUsers(): any{
    this.adminService.listUsers().subscribe(
      data => {
        this.users = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as UserModel)
          } ;
        });
      }
    );
  }

  // tslint:disable-next-line: typedef
  loadProjects(){
    this.projectService.getProjects().subscribe(data => {
      this.projects = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Project)
        } ;
      });
    });
  }

  loadGroups(): any{
    this.adminService.getTeams().subscribe(data => {
      this.groups = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Team)
        } ;
      });
    });
  }

  // tslint:disable-next-line: typedef
  handleFileInput(files){
    this.files = files;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void{
    if (this.files === undefined){
      const objectvalue = {
        id: this.data === null ? null : this.data.id,
        ...this.taskForm.value
      };
      if (this.data !== null && this.data.filedata !== undefined){
        objectvalue.filedata = this.data.filedata;
      }
      if (this.data !== null && this.data !== undefined){
        this.taskService.updateTask(objectvalue);
      }
      else{
        this.firestore.collection('tasks').add(this.taskForm.value);
      }
    }
    else{
      Array.from(this.files).forEach((element: File) => {
        const path = `taskfiles/${Date.now()}_${element.name}`;
        const ref = this.afStorage.ref(path);
        const task: AngularFireUploadTask = this.afStorage.upload(path, element);
        this.percentage = task.percentageChanges();

        this.snapshot = task.snapshotChanges().pipe(
          tap(console.log),
          finalize( async () =>  {
            const download: Promise<any> = await ref.getDownloadURL().toPromise();
            this.fileurls.push({ downloadURL: download, path });
            const objectvalue = {
              id: this.data === null ? null : this.data.id,
              filedata: this.fileurls,
              ...this.taskForm.value
            };
            if (this.data !== null && this.data !== undefined){
              this.taskService.updateTask(objectvalue);
            }
            else{
              this.taskService.saveTask(objectvalue);
            }
          }),
        );
      });
      this.snapshot.subscribe(x => console.log(x));
    }

    this.dialogRef.close();
  }
}
