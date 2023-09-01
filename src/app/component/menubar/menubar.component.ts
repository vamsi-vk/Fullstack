import { Component } from '@angular/core';
import { AuthService } from 'src/app/share/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {
  constructor(private auth : AuthService){
    const email = sessionStorage.getItem('email')
  }
  email = sessionStorage.getItem('email')
  badgevisible = true;
  badgevisibility() {
    this.badgevisible = true;
  }
  logout(){
    console.log("menulogout")
    this.auth.signOut()

  }
}
