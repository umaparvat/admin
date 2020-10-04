import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsistencygroupComponent } from './consistencygroup.component';

describe('ConsistencygroupComponent', () => {
  let component: ConsistencygroupComponent;
  let fixture: ComponentFixture<ConsistencygroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsistencygroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsistencygroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
