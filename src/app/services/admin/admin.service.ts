import {
  Injectable
} from '@angular/core';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import {
  Team
} from 'src/app/models/teams/team';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public fireAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  // tslint:disable-next-line: typedef
  listUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  addTeam(team): any {
    return this.firestore.collection('teams').add(team);
  }

  // tslint:disable-next-line: typedef
  getTeams() {
    return this.firestore.collection('teams').snapshotChanges();
  }

  // tslint:disable-next-line: typedef
  async updateTeamMembers(model) {
    model.members.forEach(element => {
      model.teams.members.push(element);
    });
    const docId = this.firestore.collection('teams').doc(model.teams.id);
    console.log(model.teams.members);
    await docId.update({
      members: model.teams.members
    });
  }

}
