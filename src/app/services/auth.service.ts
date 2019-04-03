import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {map} from 'rxjs/operators'
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

  constructor(private afAuth:AngularFireAuth,
    private router:Router) { }

  login(email:string,password:string){
    return new Promise((resolve,reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then(userData=>resolve(userData),err=>reject(err))
    });
  }
  register(email:string,password:string){
    return new Promise((resolve,reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      .then(userData=>resolve(userData),err=>reject(err))
    });
  }
  getAuth() {
    return this.afAuth.authState.pipe(map(user=>user));
  }

  logOut(){
    this.afAuth.auth.signOut();
  }

}
