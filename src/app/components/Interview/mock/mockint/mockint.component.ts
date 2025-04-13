import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { HeaderComponent } from '../../../common/header/header.component';

@Component({
  selector: 'app-mock-interview',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, HeaderComponent],
  templateUrl: './mockint.component.html',
  styleUrl: './mockint.component.css',
})
export class MockInterviewComponent {
  intId = uuid();
  interviewData: FormGroup = new FormGroup({
    interviewType: new FormControl(''),
    language: new FormControl(''),
    experience: new FormControl(''),
    level: new FormControl({ disabled: true }),
  });

  get isMockTypeSelected(): boolean {
    return this.interviewData.get('interviewType')?.value === 'mock';
  }

  onSubmit() {
    if (this.interviewData.valid) {
      console.log('Form Submitted!', this.interviewData.value);
    } else {
      console.log('Form is invalid!');
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

    this.interviewData.get('level')?.disable();
  }
}
