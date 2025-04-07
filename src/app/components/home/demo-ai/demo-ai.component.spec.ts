import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAiComponent } from './demo-ai.component';

describe('DemoAiComponent', () => {
  let component: DemoAiComponent;
  let fixture: ComponentFixture<DemoAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoAiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
