import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworksvmsComponent } from './networksvms.component';

describe('NetworksvmsComponent', () => {
  let component: NetworksvmsComponent;
  let fixture: ComponentFixture<NetworksvmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworksvmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworksvmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
