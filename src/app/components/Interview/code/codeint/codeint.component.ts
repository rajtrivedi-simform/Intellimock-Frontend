import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../common/header/header.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuid } from 'uuid';
import { codeInterviewObj } from '../../../../constants/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codeint',
  imports: [ReactiveFormsModule, HeaderComponent, CommonModule],
  templateUrl: './codeint.component.html',
  styleUrl: './codeint.component.css',
})
export class CodeintComponent {
  programmingLanguages = [
    'Python',
    'JavaScript',
    'Java',
    'C++',
    'C#',
    'Ruby',
    'Go',
    'Swift',
    'Kotlin',
    'PHP',
    'TypeScript',
    'Rust',
    'Perl',
    'Scala',
    'R',
    'Dart',
    'Lua',
    'Haskell',
    'Julia',
    'Objective-C',
  ];

  language: FormControl = new FormControl('', [Validators.required]);
  experience: FormControl = new FormControl('', [Validators.required]);
  codeInterviewData: FormGroup = new FormGroup({
    language: this.language,
    experience: this.experience,
  });

  constructor(
    private _toast: ToastrService,
    private _router: Router
  ) {}

  onSubmit() {
    if (this.codeInterviewData.valid) {
      const codeintId = uuid();
      // const payload: interviewObj = {
      //   interviewId: codeintId,
      //   interviewType: 'code',
      //   language: this.codeInterviewData.value.language,
      // };
      // console.log(payload);
      // Service integration pending for now
      this._router.navigateByUrl(`interviews/Coding-Interview/${codeintId}`);
    } else {
      this._toast.error('Please fill in all fields correctly.');
    }
  }
}
