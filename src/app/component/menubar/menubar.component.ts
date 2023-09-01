import { Component } from '@angular/core';
import { AuthService } from 'src/app/share/auth.service';
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {
  constructor(private auth : AuthService){}
  badgevisible = true;
  badgevisibility() {
    this.badgevisible = true;
  }
  logout(){
    console.log("menulogout")
    this.auth.signOut()

  }
}
