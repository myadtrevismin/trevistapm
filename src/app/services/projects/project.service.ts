import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Project } from 'src/app/models/project.model';
import { ProjectRepo } from 'src/app/repositories/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public projectRepo: ProjectRepo;

  constructor(private firestore: AngularFirestore) {
   }

  // tslint:disable-next-line: typedef
  getProjects() {
     return this.firestore.collection('projects').snapshotChanges();
  }

  // tslint:disable-next-line: typedef
  saveProject(project: Project) {
    return this.firestore.collection('projects').add(project);
  }

  // tslint:disable-next-line: typedef
  updateProject(project: Project) {
    const projectId = project.id;
    delete project.id;
    return this.firestore.doc('projects/' + projectId).update(project);
  }

  // tslint:disable-next-line: typedef
  deleteProject(projectId: string){
    this.projectRepo = new ProjectRepo('projects', this.firestore);
    return this.projectRepo.delete(projectId);
  }
}
