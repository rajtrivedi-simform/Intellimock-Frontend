import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../common/header/header.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuid } from 'uuid';
import { codeInterviewObj, codingQuestionObj } from '../../../../constants/types';
import { Router } from '@angular/router';
import { DataSharingService } from '../../../../services/common/data-sharing.service';
import { InterviewService } from '../../../../services/interviews/interview.service';

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
    private _router: Router,
    private _interview: InterviewService,
    private _dataShare: DataSharingService
  ) {}

  onSubmit() {
    if (this.codeInterviewData.valid) {
      const codeintId = uuid();
      const payload: codeInterviewObj = {
        codeInterviewId: codeintId,
        language: this.codeInterviewData.value.language,
        experience: this.codeInterviewData.value.experience,
      };

      this._interview.postCodeInterview(payload).subscribe({
        next: (res) => {
          this._toast.success('Interview Started');
          if (isCodingQuestionObj(res.data)) {
            this._dataShare.onChangeCodeQuestion(res.data);
            this._router.navigateByUrl(`interviews/Coding-Interview/${codeintId}`);
          }
        },
        error: (error) => {
          this._toast.error(error.msg);
        },
      });
    } else {
      this._toast.error('Please fill in all fields correctly.');
    }
  }
}

function isCodingQuestionObj(obj: any): obj is codingQuestionObj {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.title === 'string' &&
    typeof obj.difficulty === 'string' &&
    typeof obj.topic === 'string' &&
    typeof obj.experience_level === 'string' &&
    typeof obj.problem_statement === 'string' &&
    typeof obj.example_input === 'string' &&
    typeof obj.example_output === 'string' &&
    Array.isArray(obj.hints) &&
    Array.isArray(obj.follow_up_questions) &&
    Array.isArray(obj.expected_skills)
  );
}
