import { Component } from '@angular/core';
import { DataSharingService } from '../../../services/common/data-sharing.service';
import { feedbackObj } from '../../../constants/types';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../common/header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feedback',
  imports: [CommonModule, HeaderComponent, RouterLink],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  feedBack: feedbackObj = {
    feedback: [],
    selection_probablity: 0,
  };
  constructor(private _dataShare: DataSharingService) {}

  ngOnInit() {
    this._dataShare._feedbackSubject.subscribe({
      next: (data: feedbackObj) => {
        this.feedBack = data;
      },
    });
  }

  selectedFeedback: any = null;

  openModal(feedback: any) {
    this.selectedFeedback = feedback;
  }

  closeModal() {
    this.selectedFeedback = null;
  }
}
