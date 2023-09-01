import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPopupComponent } from './edit-popup.component';

describe('EditPopupComponent', () => {
  let component: EditPopupComponent;
  let fixture: ComponentFixture<EditPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPopupComponent],
    });
    fixture = TestBed.createComponent(EditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
