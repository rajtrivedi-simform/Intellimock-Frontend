import { Component } from '@angular/core';
import { DataSharingService } from '../../../services/common/data-sharing.service';
import { feedbackObj, QuesAnswerObj } from '../../../constants/types';
import { InterviewService } from '../../../services/interviews/interview.service';

@Component({
  selector: 'app-feedback',
  imports: [],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  feedBack: Array<feedbackObj> = [];
  constructor(
    private _dataShare: DataSharingService,
    private _feedbackService: InterviewService
  ) {}

  ngOnInit() {
    this._dataShare._feedbackSubject.subscribe({
      next: (data: Array<feedbackObj>) => {
        this.feedBack = data;
      },
    });
  }
}
