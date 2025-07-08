import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResumeUploaderService } from '../../../services/User/resume.service';
import { HeaderComponent } from '../../common/header/header.component';
import { UserProfileService } from '../../../services/User/user-profile.service';
import { userProfilePayload } from '../../../constants/types';

@Component({
  selector: 'app-user-profile-form',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './user-profile-form.component.html',
  styleUrl: './user-profile-form.component.css',
})
export class UserProfileFormComponent {
  experience: number = 0;
  skills: string = '';
  resumeFile: File | null = null;
  data: string[] = [];
  cloudURL: string = '';

  constructor(
    private _resumeService: ResumeUploaderService,
    private _userProfileService: UserProfileService
  ) {}

  onResumeUpload(event: Event) {
    const inpElement = event.target as HTMLInputElement;
    if (inpElement.files) {
      console.log(inpElement.files[0]);
      this.resumeFile = inpElement.files[0];

      const payload = new FormData();
      payload.append('resumeFile', this.resumeFile);

      this._resumeService.uploadResume(payload).subscribe({
        next: (res: any) => {
          this.data = res.data.tokens;
          this.cloudURL = res.data.cloudURL;
        },
        error: (err) => console.log(err),
      });
    }
  }

  handleSkill(index: number) {
    this.data.splice(index, 1);
  }

  submitForm() {
    if (!this.cloudURL || !this.experience) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload: userProfilePayload = {
      cloudURL: this.cloudURL,
      experience: this.experience,
      skills: this.data,
    };
    this._userProfileService.postUserProfile(payload).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
    });
  }
}
