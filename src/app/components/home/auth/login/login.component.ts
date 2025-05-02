import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../common/header/header.component';
import { CommonModule } from '@angular/common';
import { merge } from 'rxjs';
import { LoginService } from '../../../../services/auth/login.service';
import { userObjLogin, userObjRegister } from '../../../../constants/types';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../../../services/auth/register.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, HeaderComponent, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginError = '';
  loginSignal = signal<string>('');
  emailErrorMsg = signal<string>('');
  passErrorMsg = signal<string>('');
  conPassErrorMsg = signal<string>('');
  passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,16}$/;
  readonly userEmail = new FormControl('', [Validators.required, Validators.email]);
  readonly userPassword = new FormControl('', [
    Validators.required,
    Validators.pattern(this.passwordValidator),
    Validators.minLength(8),
    Validators.maxLength(16),
  ]);
  readonly confirmPassword = new FormControl('', [
    Validators.required,
    Validators.pattern(this.passwordValidator),
    Validators.minLength(8),
    Validators.maxLength(16),
  ]);
  readonly userName = new FormControl('', [Validators.required]);
  userDataForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private userLogin: LoginService,
    private register: RegisterService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.userDataForm = new FormGroup({
      userEmail: this.userEmail,
      userPassword: this.userPassword,
    });

    merge(
      this.userEmail.valueChanges,
      this.userPassword.valueChanges,
      this.confirmPassword.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.validatorEmail();
        this.validatorPassword();
        this.validateConfirmPassword();
      });
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.loginSignal.set(data['formType']);
    });
    if (this.loginSignal() === 'Register') {
      this.userDataForm.addControl('confirmPassword', this.confirmPassword);
      this.userDataForm.addControl('userFullName', new FormControl('', Validators.required));
    }

    //initilizing validators
    this.validatorEmail();
    this.validatorPassword();
    this.validateConfirmPassword();
  }

  formHandler() {
    if (this.userDataForm.valid) {
      if (this.loginSignal() == 'Register') {
        if (this.userPassword.value !== this.confirmPassword.value) {
          this.toast.error('Password and Confirm Password should be same.');
          return;
        }
        const data: userObjRegister = {
          userFullName: this.userDataForm.get('userFullName')?.value,
          userEmail: this.userDataForm.get('userEmail')?.value,
          userPassword: this.userDataForm.get('userPassword')?.value,
          confirmPassword: this.userDataForm.get('confirmPassword')?.value,
        };

        if (data['userPassword'] != data['confirmPassword']) {
          this.toast.error('Passwords not Matching');
        }

        this.register.registerUser(data).subscribe({
          next: () => {
            this.toast.success('Account created successfully!');
            this.router.navigateByUrl('login');
          },
          error: (err) => {
            this.toast.error(err.error.msg);
          },
        });
      } else {
        const data: userObjLogin = {
          userEmail: this.userDataForm.get('userEmail')?.value,
          userPassword: this.userDataForm.get('userPassword')?.value,
        };
        this.userLogin.userLogin(data).subscribe({
          next: () => {
            this.toast.success('Login');
            this.router.navigateByUrl('');
          },
          error: (err) => {
            console.error(err);
            this.toast.error(err.error.msg);
          },
        });
      }
    } else {
      this.toast.error('Please fill all the fields');
    }
  }

  validatorEmail() {
    if (this.userEmail.hasError('required')) {
      this.emailErrorMsg.set('*E-Mail is required');
    } else if (this.userEmail.hasError('email')) {
      this.emailErrorMsg.set('Please enter a valid E-mail');
    } else {
      this.emailErrorMsg.set('');
    }
  }

  validatorPassword() {
    if (this.userPassword.hasError('required')) {
      this.passErrorMsg.set('*Password is required');
    } else if (this.userPassword.hasError('minlength') || this.userPassword.hasError('maxlength')) {
      this.passErrorMsg.set('Password should be of 8 characters with maximum of 16');
    } else if (this.userPassword.hasError('pattern')) {
      this.passErrorMsg.set('Password should be alphanumeric & special characters only');
    } else {
      this.passErrorMsg.set('');
    }
  }

  validateConfirmPassword() {
    if (this.confirmPassword.hasError('required')) {
      this.conPassErrorMsg.set('*Confirm Password is required');
    } else if (
      this.confirmPassword.hasError('minlength') ||
      this.confirmPassword.hasError('maxlength')
    ) {
      this.conPassErrorMsg.set('Password should be between 8 and 16 characters.');
    } else if (this.confirmPassword.hasError('pattern')) {
      this.conPassErrorMsg.set(
        'Password should include uppercase, lowercase, numbers, and special characters.'
      );
    } else if (this.confirmPassword.value !== this.userPassword.value) {
      this.conPassErrorMsg.set('Password and Confirm Password should match.');
      // this.toast.error('Password and Confirm Password should match.');
    } else {
      this.conPassErrorMsg.set('');
    }
  }
}
