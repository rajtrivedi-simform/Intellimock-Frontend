import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { CommonModule } from '@angular/common';
import { FetchQuestionService } from '../../../services/Question/fetch-question.service';
import { Question } from '../../../constants/types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-questionpage',
  imports: [HeaderComponent, CommonModule, RouterLink],
  templateUrl: './questionpage.component.html',
  styleUrl: './questionpage.component.css',
})
export class QuestionpageComponent {
  questions: Array<Question> = [];
  filteredQuestions: Array<Question> = [];
  typeOptions = ['Technical', 'HR', 'Coding'];
  _selectedType: string = 'Technical';

  constructor(private fetchQuestionService: FetchQuestionService) {}

  ngOnInit() {
    this.fetchQuestionService.fetchQuestions().subscribe({
      next: (res) => {
        this.questions = res.data;
        this.filterQuestions('');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterQuestions(selectedType: string) {
    if (selectedType == '') {
      this.filteredQuestions = this.questions.filter(
        (question) => question.type == this._selectedType
      );
    } else {
      this.filteredQuestions = this.questions.filter((question) => question.type == selectedType);
    }
  }

  changeType(type: string) {
    this._selectedType = type;
  }
}