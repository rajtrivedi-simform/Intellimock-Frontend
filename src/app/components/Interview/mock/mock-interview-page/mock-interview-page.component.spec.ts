import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockInterviewPageComponent } from './mock-interview-page.component';

describe('MockInterviewPageComponent', () => {
  let component: MockInterviewPageComponent;
  let fixture: ComponentFixture<MockInterviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockInterviewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockInterviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
