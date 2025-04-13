import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeInterviewPageComponent } from './code-interview-page.component';

describe('CodeInterviewPageComponent', () => {
  let component: CodeInterviewPageComponent;
  let fixture: ComponentFixture<CodeInterviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeInterviewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeInterviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
