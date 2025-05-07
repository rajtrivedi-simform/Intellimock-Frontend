import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-interviewform',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './interviewform.component.html',
  styleUrl: './interviewform.component.css',
})
export class InterviewformComponent {
  selectedOption: string | null = null;

  selectOption(option: string) {
    this.selectedOption = option;
  }
}
