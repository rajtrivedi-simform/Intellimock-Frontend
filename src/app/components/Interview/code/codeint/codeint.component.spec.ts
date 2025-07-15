import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeintComponent } from './codeint.component';

describe('CodeintComponent', () => {
  let component: CodeintComponent;
  let fixture: ComponentFixture<CodeintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeintComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
