import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { CommonModule } from '@angular/common';
import { FetchQuestionService } from '../../../services/Question/fetch-question.service';
import { Question } from '../../../constants/types';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-questionpage',
  imports: [HeaderComponent, CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './questionpage.component.html',
  styleUrl: './questionpage.component.css',
})
export class QuestionpageComponent {
  questions: Array<Question> = [];
  filteredQuestions: Array<Question> = [];
  visibleQuestions: Array<Question> = [];

  typeOptions = ['Technical', 'HR', 'Coding'];
  difficultyOptions = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  _selectedType: string = 'Technical';
  _selectedDifficulty: string = 'All';
  searchTerm = new FormControl();

  constructor(private fetchQuestionService: FetchQuestionService) {}

  ngOnInit() {
    this.fetchQuestionService.fetchQuestions().subscribe({
      next: (res) => {
        this.questions = res.data;
        this.filterQuestions(this._selectedType);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.searchTerm.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      if (res.length != 0) {
        this.fetchQuestionService.searchQuestions(res).subscribe({
          next: (res) => (this.visibleQuestions = res.data),
          error: (err) => console.error(err),
        });
      } else {
        this.filterQuestions('All');
      }
    });
  }

  filterQuestions(selectedType: string) {
    this._selectedType = selectedType || this._selectedType;

    this.filteredQuestions = this.questions.filter((question) =>
      this._selectedType === 'All' ? true : question.type === this._selectedType
    );

    // Apply difficulty and search after type filter
    this.applyDifficultyFilter();
  }

  applyDifficultyFilter() {
    const difficulty = this._selectedDifficulty;
    const base =
      difficulty === 'All'
        ? this.filteredQuestions
        : this.filteredQuestions.filter((q) => q.level.includes(difficulty));

    this.visibleQuestions = base;
  }

  search(term: string) {
    this.fetchQuestionService.searchQuestions(term).subscribe({
      next: (res) => {
        this.visibleQuestions = res.data;
        console.log(this.visibleQuestions);
      },
      error: (err) => console.error(err),
    });
  }
  changeType(type: string) {
    this.filterQuestions(type);
  }

  changeDifficulty(difficulty: string) {
    this._selectedDifficulty = difficulty;
    this.applyDifficultyFilter();
  }
}
