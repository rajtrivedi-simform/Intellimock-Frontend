import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntdataformComponent } from './intdataform.component';

describe('IntdataformComponent', () => {
  let component: IntdataformComponent;
  let fixture: ComponentFixture<IntdataformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntdataformComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IntdataformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
