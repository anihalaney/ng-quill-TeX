import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgQuillTexComponent } from './ng-quill-tex.component';

describe('NgQuillTexComponent', () => {
  let component: NgQuillTexComponent;
  let fixture: ComponentFixture<NgQuillTexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgQuillTexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgQuillTexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
