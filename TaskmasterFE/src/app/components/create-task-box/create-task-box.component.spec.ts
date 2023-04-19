import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskBoxComponent } from './create-task-box.component';

describe('CreateTaskBoxComponent', () => {
  let component: CreateTaskBoxComponent;
  let fixture: ComponentFixture<CreateTaskBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaskBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
