import {
  Injectable
} from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private firestore: AngularFirestore) {}

  // tslint:disable-next-line: typedef
  getFiles() {
    return this.firestore.collection('files').snapshotChanges();
  }

  // tslint:disable-next-line: typedef
  saveFile(file) {
    return this.firestore.collection('files').add(file);
  }

  // tslint:disable-next-line: typedef
  updateFile(project) {
    const projectId = project.id;
    delete project.id;
    return this.firestore.doc('files/' + projectId).update(project);
  }

  // tslint:disable-next-line: typedef
  deleteFile(projectId: string) {}
}
