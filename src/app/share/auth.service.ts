import { Token } from '@angular/compiler';
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
    await this.fireauth.signInWithEmailAndPassword(email, password).then((res) => {
      console.log(res);
      // localStorage.setItem('token', 'true') 
      this.ngZone.run(() => {
        this.router.navigate(['/admin']);
      });
    }, err => {
      this.toast.warning({ detail: "vk" });
      this.ngZone.run(() => {
        this.router.navigate(['/login']);
      });
    });


  }

  // registet 


  register(email:string, password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then((res:any)=>{
      alert("Registration Successful")
     
      this.router.navigate (['/login' ]);

  },err=>{
    this.toast.warning({detail:"Failed"})
    this.router.navigate(['/registation']);
  })
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