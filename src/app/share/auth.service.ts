import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {NgToastService} from 'ng-angular-popup'
import { NgZone } from '@angular/core';


import { AngularFireAuthModule } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router, private toast:NgToastService,private ngZone: NgZone) { }

  isLoggedIn() {
    return !!localStorage.getItem('firebaseToken');
}
  signOut(){
    localStorage.removeItem('token')
  }
  
  // async login (email :string , password :string ){
  //     await this.fireauth.signInWithEmailAndPassword(email,password).then((res)=>{
  //     console.log(res)
  //     // localStorage.setItem('token','true') 
  //     this.router.navigate( ['/admin' ]);
  //   },err=>{
  //     this.toast.warning({detail:"vk"})
  //     this.router.navigate(['/login']);

  //   })
     
  // }
  async login(email: string, password: string) {
    try {
        const res = await this.fireauth.signInWithEmailAndPassword(email, password);
        console.log("res:", res);
        
        const userTokenResult = await res.user?.getIdTokenResult();
        console.log("userTokenResult:", userTokenResult?.token);
        
        const accessToken = userTokenResult?.token;

        if (accessToken) {
            localStorage.setItem('firebaseToken', accessToken);
        }
        this.ngZone.run(() => {
            this.router.navigate(['/admin']);
        });
        console.log("hi")
    } catch (error) {
        console.error("Login error:", error);
        this.toast.warning({ detail: "Login failed" });
        this.ngZone.run(() => {
            this.router.navigate(['/login']);
        });
    }
}


//logout 

logout (){
this.fireauth.signOut().then(()=>
{
  localStorage.removeItem('token');
  this.router.navigate(['./login'])
},err=>{
  alert("error")
})
}



}