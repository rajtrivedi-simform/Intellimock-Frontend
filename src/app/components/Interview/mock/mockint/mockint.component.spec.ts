import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockintComponent } from './mockint.component';

describe('MockintComponent', () => {
  let component: MockintComponent;
  let fixture: ComponentFixture<MockintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockintComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
