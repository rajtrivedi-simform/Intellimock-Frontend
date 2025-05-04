import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile-form.component.html',
  styleUrl: './user-profile-form.component.css'
})
export class UserProfileFormComponent {
  experience: number = 0;
  skills: string = '';
  resumeFile: File | null = null;

  onResumeUpload(event: any) {
    this.resumeFile = event.target.files[0];
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
    if (!this.resumeFile || !this.experience || !this.skills) {
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
