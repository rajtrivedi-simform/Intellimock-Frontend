import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { HeaderComponent } from '../../../common/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { InterviewService } from '../../../../services/interviews/interview.service';
import { interviewObj } from '../../../../constants/types';

@Component({
  selector: 'app-mock-interview',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './mockint.component.html',
  styleUrl: './mockint.component.css',
})
export class MockInterviewComponent {
  intId = uuid();
  interviewData: FormGroup = new FormGroup({
    interviewType: new FormControl('', [Validators.required]),
    language: new FormControl(''),
    experience: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required]),
  });

  constructor(
    private _toast: ToastrService,
    private _interview: InterviewService,
    private _router: Router
  ) {}

  get isMockTypeSelected(): boolean {
    return this.interviewData.get('interviewType')?.value === 'mock';
  }

  onSubmit() {
    if (this.interviewData.valid) {
      const payload: interviewObj = {
        interviewId: this.intId,
        interviewType: this.interviewData.controls['interviewType'].value,
        level: this.interviewData.controls['level'].value,
        language: this.interviewData.controls['language'].value,
      };
      this._interview.postInterview(payload).subscribe({
        next: (res) => {
          this._toast.success('Interview Started');
          this._router.navigateByUrl(`interviews/Mock-Interview/${this.intId}`);
        },
        error: (error) => {
          this._toast.error(error.msg);
        },
      });
    } else {
      this._toast.error('Please Fill all the fields!!!');
    }
  }

  ngOnInit() {
    this.interviewData.get('experience')?.valueChanges.subscribe((value) => {
      let level = '';
      if (value === '0-1') {
        level = 'junior';
      } else if (value === '2-5') {
        level = 'mid';
      } else if (value === '5+') {
        level = 'senior';
      }
      this.interviewData.patchValue({ level });
    });

    // this.interviewData.get('level')?.disable();
  }
}
