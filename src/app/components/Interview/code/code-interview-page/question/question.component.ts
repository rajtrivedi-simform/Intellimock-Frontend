import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-question',
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  question = {
    title: 'Two Sum',
    difficulty: 'Easy',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.`,
    input: `nums = [2,7,11,15], target = 9`,
    output: `[0,1]`,
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ]
  };
}
