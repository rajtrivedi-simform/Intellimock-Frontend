import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResumeUploaderService } from '../../../services/User/resume.service';

@Component({
  selector: 'app-user-profile-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile-form.component.html',
  styleUrl: './user-profile-form.component.css',
})
export class UserProfileFormComponent {
  experience: number = 0;
  skills: string = '';
  resumeFile: File | null = null;
  data: any = {};

  constructor(private _resumeService: ResumeUploaderService) {}

  onResumeUpload(event: Event) {
    const inpElement = event.target as HTMLInputElement;
    if (inpElement.files) {
      console.log(inpElement.files[0]);
      this.resumeFile = inpElement.files[0];

      const payload = new FormData();
      payload.append('resumeFile', this.resumeFile);

      this._resumeService.uploadResume(payload).subscribe({
        next: (res) => (this.data = res.data),
        error: (err) => console.log(err),
      });
    }
  }

  extractSkillsFromResume() {
    if (!this.resumeFile) {
      alert('Please upload a resume first.');
      return;
    }

    // Simulate skill extraction
    // In production, this would call a backend service
    setTimeout(() => {
      this.skills = 'Angular, TypeScript, HTML, CSS, JavaScript';
    }, 1000);
  }

  submitForm() {
    if (!this.resumeFile || !this.experience) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Submitted:', {
      file: this.resumeFile.name,
      experience: this.experience,
      skills: this.skills,
    });
  }

  // onResumeUpload(event: any) {}
}
