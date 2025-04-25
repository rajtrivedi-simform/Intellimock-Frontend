import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../common/header/header.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
  experience: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(15),
  ]);
  codeInterviewData: FormGroup = new FormGroup({
    language: this.language,
    experience: this.experience,
  });

  constructor(private _toast: ToastrService) {}

  onSubmit() {
    if (this.codeInterviewData.valid) {
      console.log(this.codeInterviewData.value);
    } else {
      this._toast.error('Please fill in all fields correctly.');
    }
  }
}
