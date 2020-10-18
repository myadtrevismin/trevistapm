import { Injectable, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserModel } from 'src/app/models/discussions/discussion';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public  fireAuth: AngularFireAuth,
              public  router: Router, private firestore: AngularFirestore) {
    this.getAuthState();
  }
  user: User;

  // tslint:disable-next-line: typedef
  getAuthState(){
    this.fireAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  // tslint:disable-next-line: typedef
  async login(email: string, password: string) {
    const result = await this.fireAuth.signInWithEmailAndPassword(email, password).then(x => console.log(x));
    this.router.navigate(['user/dashboard']);
  }

  // tslint:disable-next-line: typedef
  async register(model) {
    const result = await (await this.fireAuth.createUserWithEmailAndPassword(model.email, model.password));
    result.user.updateProfile({
      displayName: model.lastName + ' ' + model.firstName,
    });
    const userModel: UserModel = {
      userid: result.user.uid,
      username: result.user.email,
      fullname:  model.lastName + ' ' + model.firstName,
      profilePic: result.user.photoURL,
      phoneNumber: result.user.phoneNumber
    };
    this.firestore.collection('users').doc(userModel.userid).set(userModel);
    this.sendEmailVerification();
  }

  // tslint:disable-next-line: typedef
  async sendEmailVerification(){
    await (await this.fireAuth.currentUser).sendEmailVerification();
    this.router.navigate(['login/verify-email']);
  }

  // tslint:disable-next-line: typedef
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.fireAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  // tslint:disable-next-line: typedef
  async logout(){
    await this.fireAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  // tslint:disable-next-line: typedef
  async  loginWithGoogle(){
    await  this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigate(['admin/list']);
  }

  async allUsers(){

  }

}
