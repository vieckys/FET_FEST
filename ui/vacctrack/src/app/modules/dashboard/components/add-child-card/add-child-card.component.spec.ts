import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChildCardComponent } from './add-child-card.component';

describe('AddChildCardComponent', () => {
  let component: AddChildCardComponent;
  let fixture: ComponentFixture<AddChildCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChildCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChildCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
