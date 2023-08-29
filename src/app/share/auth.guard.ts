import { CanActivateFn,CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn:'root'
})

export class AuthGaurd implements CanActivate{
  constructor (private auth:AuthService,private router:Router){
    
  }
  
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
        return true;
    }
    this.router.navigate(['login']); // Redirect unauthenticated users to login page
    return false;
}
}

