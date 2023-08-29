import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/share/auth.service';
import { MasterService } from 'src/app/service/master.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupForm: FormGroup;
  hide1 = true;
  hide2 = true;

  constructor(private fb: FormBuilder, private service: MasterService) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordComplexityValidator]],
      cpassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  onLogin() {
    if (this.signupForm.valid) {
      // this.service.
      let data = {
        email:this.signupForm.value.email,
        password: this.signupForm.value.password
      }
      this.service.register(data).subscribe((res: any) => {
        console.log(res.statusText);
        
      })} else {
     console.log("errror")
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
  register(){

  }
}