import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddQuestionService } from '../../../services/Question/add-question.service';
import { HeaderComponent } from '../../common/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-question-form',
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './add-question-form.component.html',
  styleUrl: './add-question-form.component.css',
})
export class AddQuestionFormComponent {
  question: FormControl = new FormControl('', [Validators.required]);
  skill: FormControl = new FormControl('', [Validators.required]);
  level: FormControl = new FormControl('', [Validators.required]);
  type: FormControl = new FormControl('', [Validators.required]);
  
  questionForm: FormGroup = new FormGroup({});

  constructor(private _postQuestion: AddQuestionService, private _toast: ToastrService, private _router: Router) {
    this.initializeForm()
  }

  initializeForm() {
    this.questionForm.addControl('question', this.question);
    this.questionForm.addControl('skill', this.skill);
    this.questionForm.addControl('level', this.level);
    this.questionForm.addControl('type', this.type);
  }

  onSubmit() {
    const payload = this.questionForm.value;

    this._postQuestion.postQuestion(payload).subscribe({
      next: res => {
        if(res.success){
          this._toast.success("Question Added Successfully")
          this._router.navigateByUrl('/questions')
        }
      }, error: err => console.error(err)
    })
  }
}
