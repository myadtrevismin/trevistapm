import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from 'src/app/models/tasks/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: AngularFirestore) { }

    // tslint:disable-next-line: typedef
    getTasks() {
      return this.firestore.collection('tasks').snapshotChanges();
   }

   // tslint:disable-next-line: typedef
   saveTask(project: Task) {
    delete project.id;
    return this.firestore.collection('tasks').add(project);
    // return this.projectRepo.create(project);
   }

   // tslint:disable-next-line: typedef
   updateTask(project: Task) {
     const projectId = project.id;
     delete project.id;
     return this.firestore.doc('tasks/' + projectId).update(project);
   }

   // tslint:disable-next-line: typedef
   deleteProject(projectId: string){
    //  this.projectRepo = new ProjectRepo('projects', this.firestore);
    //  return this.projectRepo.delete(projectId);
   }
}
