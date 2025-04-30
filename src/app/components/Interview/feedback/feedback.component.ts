import { Component } from '@angular/core';
import { DataSharingService } from '../../../services/common/data-sharing.service';
import { feedbackObj, QuesAnswerObj } from '../../../constants/types';
import { InterviewService } from '../../../services/interviews/interview.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../common/header/header.component';

@Component({
  selector: 'app-feedback',
  imports: [CommonModule, HeaderComponent],
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
    // this._dataShare._feedbackSubject.subscribe({
    //   next: (data: Array<feedbackObj>) => {
    //     this.feedBack = data;
    //   },
    // });

    this.feedBack = [
      {
          "question": "Describe a situation where you had to explain a complex technical concept to a non-technical person (e.g., someone in HR). How did you approach it, and what were the key strategies you used to ensure they understood?",
          "answer": "In one instance, I had to explain how our machine learning model prioritized job applicants to the HR team. I avoided technical jargon and instead used an analogy comparing the model to a filter that sifts through resumes based on predefined traits, much like a checklist. I used visuals like flowcharts to illustrate the data flow and decision points. I also paused regularly to check for understanding and encouraged questions, which made the conversation more interactive and ensured clarity.",
          "feedback": "The answer is good but lacks specific details about the complexity of the model and the actual questions HR asked, weakening its impact. Provide a more concrete example of the technical concept and the audience's confusion to highlight your communication skills."
      },
      {
          "question": "Imagine HR is implementing a new performance review system that relies heavily on data and algorithms. What potential biases might arise within this system, and how could a developer contribute to mitigating them during development?",
          "answer": "Potential biases could include gender, racial, or age-related disparities, especially if historical performance data used to train the system contains those biases. As a developer, I would advocate for using anonymized and representative training data, implement fairness audits, and ensure the algorithm’s outputs are interpretable. I would also work closely with HR to continuously monitor outcomes and allow human oversight for final decisions.",
          "feedback": "Good answer highlighting key bias areas and mitigation strategies; consider elaborating on specific techniques for anonymization and fairness audits to demonstrate deeper technical understanding."
      },
      {
          "question": "HR is considering using an AI-powered chatbot for initial candidate screening. What are some ethical considerations a developer should be aware of when building such a system, especially concerning fairness and transparency?",
          "answer": "Key ethical considerations include avoiding biased language or decision-making, ensuring the chatbot does not discriminate based on protected attributes, and being transparent about its AI nature. Developers should design the system to log interactions, enable audits, and provide clear reasons for decisions made. Candidates should be informed when they are interacting with an AI and be given an option to reach a human recruiter.",
          "feedback": "The answer is a good start, but lacks depth and specific examples. Encourage the candidate to elaborate on how bias can creep into the system and provide concrete examples of auditability mechanisms."
      },
      {
          "question": "Suppose HR needs a tool to track employee training and certifications. Briefly outline the key features you would include in the database schema to ensure data integrity and efficient reporting.",
          "answer": "The database schema should include tables like Employees, Trainings, Certifications, and TrainingRecords. Key fields would be EmployeeID (foreign key), TrainingID, CompletionDate, CertificationID, ExpiryDate, and Status. Constraints such as NOT NULL for critical fields, foreign keys for relational integrity, and indexing on dates and IDs would ensure integrity and performance. I’d also include audit fields like CreatedAt and UpdatedAt for tracking changes.",
          "feedback": "The answer is a good starting point but lacks specific details on data types, relationships between tables, and how the schema facilitates efficient reporting beyond basic indexing; elaborate on these aspects to demonstrate a deeper understanding of database design principles."
      },
      {
          "question": "You are asked to build an API endpoint for HR to retrieve anonymized employee data for diversity and inclusion reporting. What measures would you take to ensure the data is truly anonymized and complies with privacy regulations like GDPR or CCPA?",
          "answer": "I would remove or obfuscate direct identifiers like names, emails, and employee IDs. I’d also generalize quasi-identifiers such as age (use age range), department (aggregate where possible), and location (use region instead of city). Techniques like data masking, pseudonymization, and differential privacy could be applied depending on sensitivity. Additionally, I’d document the anonymization process and ensure the endpoint only returns the minimum data necessary, with access controls and logging to comply with GDPR/CCPA.",
          "feedback": "This is a good start, but it could be strengthened by detailing specific anonymization techniques and explicitly addressing the risk of re-identification through linked datasets or statistical inference."
      }
  ]
  
  }


  selectedFeedback: any = null;

openModal(feedback: any) {
  this.selectedFeedback = feedback;
}

closeModal() {
  this.selectedFeedback = null;
}


  
}
