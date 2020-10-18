import { User } from 'firebase';

export class Discussion {
  id?: string;
  htmlcontent: string;
  posteduser: UserModel;
  date: Date;
  responses: Discussion[];
}

export class UserModel{
  userid: string;
  username: string;
  fullname: string;
  profilePic?: string;
  phoneNumber?: string;
}
