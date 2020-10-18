import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../models/discussions/discussion';
import { Team } from '../models/teams/team';

@Pipe({
  name: 'teamuser'
})
export class TeamuserPipe implements PipeTransform {

  transform(userList: any, team: any): any {
    if (userList) {
     return userList.filter(x => team.members.map(y => y.userid).includes(x.userid) === false);
    }
  }

}
