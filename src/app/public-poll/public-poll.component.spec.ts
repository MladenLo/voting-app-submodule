import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPollComponent } from './public-poll.component';

describe('PublicPollComponent', () => {
  let component: PublicPollComponent;
  let fixture: ComponentFixture<PublicPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicPollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
