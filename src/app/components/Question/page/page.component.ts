import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { FetchQuestionByIdService } from '../../../services/Question/fetch-question-by-id.service';
import { questionAPIResponse } from '../../../constants/types';

@Component({
  selector: 'app-page',
  imports: [HeaderComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  _quesid = signal('');
  questionData: questionAPIResponse | null = null;
  constructor(
    private _route: ActivatedRoute,
    private _getQuestion: FetchQuestionByIdService
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this._quesid.set(id);
      } else {
        console.error('Question ID not found in route parameters.');
      }
    });

    this._getQuestion.fetchQuestion(this._quesid()).subscribe({
      next: (question) => {
        if (question.success) {
          this.questionData = question;
          console.log('Question:', this.questionData);
        } else {
          console.error('Failed to fetch question:', question.msg);
        }
      },
    });
  }
}
