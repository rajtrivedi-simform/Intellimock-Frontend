import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { CommonModule } from '@angular/common';
import { FetchQuestionService } from '../../../services/Question/fetch-question.service';
import { Question } from '../../../constants/types';

@Component({
  selector: 'app-questionpage',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './questionpage.component.html',
  styleUrl: './questionpage.component.css',
})
export class QuestionpageComponent {
  questions: Array<Question> = [];
  filteredQuestions: Array<Question> = [];
  typeOptions = signal<Array<string>>([]);
  selectedType: string = '';

  constructor(private fetchQuestionService: FetchQuestionService) {
    this.filterQuestions()
  }

  ngOnInit() {
    this.fetchQuestionService.fetchQuestions().subscribe({
      next: (res) => {
        this.questions = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterTypes() {}

  filterQuestions(){
    if(this.selectedType==""){
      this.filteredQuestions = this.questions;
    }
    else{
      this.filteredQuestions = this.questions.filter((question) => question.type == this.selectedType);
    }
  }
}
