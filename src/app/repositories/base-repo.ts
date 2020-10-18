import {IWriteRepo} from './iwrite-repo';
import {IReadRepo} from './iread-Repo';
import { AngularFirestore } from '@angular/fire/firestore';

export abstract class BaseRepo<T> implements IWriteRepo<T>, IReadRepo<T> {

  public collection: any;
  /**
   *
   */
  constructor(collectionName: string, private firestore: AngularFirestore) {

  }

  create(item: T): Promise<any> {
    this.collection = this.firestore.collection(this.collection);
    return this.collection.add(item);
  }
  update(id: string, item: any): Promise<any> {
    this.collection = this.firestore.collection(this.collection);
    delete item.id;
    return this.collection.doc(this.collection + item.id).update(item);
  }
  delete(id: string): Promise<any> {
    this.collection = this.firestore.collection(this.collection);
    return this.firestore.doc(this.collection + id).delete();
  }

  // findAll(): Promise<any> {
  //   return this.firestore.collection(this.collection).snapshotChanges();
  // }

  find(item: T): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }

}
