import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataSharingService } from '../../../../../services/common/data-sharing.service';
import { codingQuestionObj } from '../../../../../constants/types';

@Component({
  selector: 'app-question',
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent {
  question: codingQuestionObj = {
    title: '',
    difficulty: '',
    topic: '',
    experience_level: '',
    problem_statement: '',
    example_input: '',
    example_output: '',
    hints: [''],
    follow_up_questions: [''],
    expected_skills: [''],
  };

  constructor(private _dataShare: DataSharingService) {}

  ngOnInit() {
    this._dataShare._codeQuestionSubject.subscribe((data) => {
      this.question = data;
    });
  }
}
