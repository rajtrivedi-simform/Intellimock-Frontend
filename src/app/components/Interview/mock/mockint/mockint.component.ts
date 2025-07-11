import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { HeaderComponent } from '../../../common/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { InterviewService } from '../../../../services/interviews/interview.service';
import { mockInterviewObj } from '../../../../constants/types';
import { DataSharingService } from '../../../../services/common/data-sharing.service';
import { UserProfileService } from '../../../../services/User/user-profile.service';

@Component({
  selector: 'app-mock-interview',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './mockint.component.html',
  styleUrl: './mockint.component.css',
})
export class MockInterviewComponent {
  intId: string = uuid();
  skills: Array<string> = [];
  interviewData: FormGroup = new FormGroup({
    interviewType: new FormControl('', [Validators.required]),
    language: new FormControl(''),
    experience: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required]),
  });

  constructor(
    private _toast: ToastrService,
    private _interview: InterviewService,
    private _router: Router,
    private _dataShare: DataSharingService,
    private _userService: UserProfileService
  ) {}

  get isMockTypeSelected(): boolean {
    return this.interviewData.get('interviewType')?.value === 'mock';
  }

  onSubmit() {
    if (this.interviewData.valid) {
      const payload: mockInterviewObj = {
        mockInterviewId: this.intId,
        interviewType: this.interviewData.controls['interviewType'].value,
        level: this.interviewData.controls['level'].value,
        skill: this.interviewData.controls['language'].value,
      };
      this._interview.postMockInterview(payload).subscribe({
        next: (res) => {
          this._toast.success('Interview Started');
          if (res.data instanceof Object) {
            const questionArray = Object.values(res.data);
            this._dataShare.onChange(questionArray);
          }
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
    this._userService.getUserSkills().subscribe({
      next: (res) => {
        this.skills = res.data.skills;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.interviewData.get('experience')?.valueChanges.subscribe((value) => {
      let level = '';
      if (value === '0') {
        level = 'fresher';
      } else if (value === '1') {
        level = 'junior';
      } else if (value === '2-5') {
        level = 'mid';
      } else if (value === '5+') {
        level = 'senior';
      }
      this.interviewData.patchValue({ level });
    });

    this.interviewData.get('level')?.disable();
  }
}
