import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgZone } from '@angular/core';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private toast: NgToastService,
    private ngZone: NgZone
  ) {
    // this.toast.success()
  }

  isLoggedIn() {
    return !!sessionStorage.getItem('firebaseToken');
  }
  signOut() {
    sessionStorage.removeItem('firebaseToken');
    this.router.navigate(['./login']);
  }

  // async login (email :string , password :string ){
  //     await this.fireauth.signInWithEmailAndPassword(email,password).then((res)=>{
  //     console.log(res)
  //     // sessionStorage.setItem('token','true')
  //     this.router.navigate( ['/admin' ]);
  //   },err=>{
  //     this.toast.warning({detail:"vk"})
  //     this.router.navigate(['/login']);

  //   })

  // }
  async login(email: string, password: string) {
    try {
      const res = await this.fireauth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log('res:', res);
      const userTokenResult = await res.user?.getIdTokenResult();
      console.log('userTokenResult:', userTokenResult?.token);
      const accessToken = userTokenResult?.token;
      if (accessToken) {
        sessionStorage.setItem('firebaseToken', accessToken);
        sessionStorage.setItem('email' , email )
      }
      this.ngZone.run(() => {
        this.router.navigate(['/admin']);
      });
      console.log('hi');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        alert('User not found. ');
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password.');
      } else if (error.code === 'auth/too-many-requests') {
        alert('Too many unsuccessful login attempts. Please try again later.');
      } else {
        alert(error.message);
      }
      this.ngZone.run(() => {
        this.router.navigate(['/login']);
      });
    }
  }

  //logout

  logout() {
    this.fireauth.signOut().then(
      () => {
        sessionStorage.removeItem('token');
        this.router.navigate(['./login']);
      },
      (err) => {
        alert('error');
      }
    );
  }
  forgetpassword(email: any) {
    console.log(email);
    this.fireauth
      .sendPasswordResetEmail(email)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}
