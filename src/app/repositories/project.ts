import { Project } from '../models/project.model';
import { BaseRepo } from '../repositories/base-repo';


export class ProjectRepo extends BaseRepo<Project>{

  // tslint:disable-next-line: typedef
  getProjects(){
    return this.collection.snapshotChanges;
  }
}
