import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Discussion } from 'src/app/models/discussions/discussion';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  constructor(private firestore: AngularFirestore) { }

  // tslint:disable-next-line: typedef
  getDiscussions() {
    return this.firestore.collection('discussions').snapshotChanges();
 }

 // tslint:disable-next-line: typedef
 saveDiscussion(discussion: Discussion) {
   return this.firestore.collection('discussions').add(discussion);
 }

  // tslint:disable-next-line: typedef
  async saveDiscussionResponse(discussion) {
    const docId = this.firestore.collection('discussions').doc(discussion.discussionItem.id);
    return await docId.update({
      responses: discussion.discussionItem.responses
    });
  }

 // tslint:disable-next-line: typedef
 updateDiscussion(discussion: Discussion) {
   const projectId = discussion.id;
   delete discussion.id;
   return this.firestore.doc('discussions/' + projectId).update(discussion);
 }

 // tslint:disable-next-line: typedef
 deleteDiscussion(projectId: string){
 }

}
