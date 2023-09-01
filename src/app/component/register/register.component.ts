// 
import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/share/auth.service';
import { MasterService } from 'src/app/service/master.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  signupForm: FormGroup;
  hide1 = true;
  hide2 = true;
  errorMessage: string = '';
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private service: MasterService, private router: Router, private ngZone: NgZone) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordComplexityValidator]],
      cpassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onRegister() {
    if (this.signupForm.valid) {
      const data = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };

      // Send registration request and handle response
      const registrationSubscription = this.service.register(data).subscribe(
        (res: any) => {
          if (res.error) {
            this.errorMessage = res.error;
          } else {
            console.log(res);
            this.router.navigate(['login']);
            this.ngZone.run(() => {
              // Use ngZone.run() to trigger the navigation inside Angular's zone
              alert(res.message);
            });
          }
        },
        (error) => {
          console.error('Registration error:', error);
          this.errorMessage = 'An error occurred during registration. Please try again later.';
        }
      );

      // Add the registration subscription to the list of subscriptions
      this.subscriptions.push(registrationSubscription);
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const cpassword = control.get('cpassword');
  
    if (password && cpassword && password.value !== '' && password.value !== cpassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  passwordComplexityValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    // Add your custom password complexity validation logic here
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

    if (!hasNumber || !hasSpecialCharacter) {
      return { passwordComplexity: true };
    }
    return null;
  }
}
