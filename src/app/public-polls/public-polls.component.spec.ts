import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPollsComponent } from './public-polls.component';

describe('PublicPollsComponent', () => {
  let component: PublicPollsComponent;
  let fixture: ComponentFixture<PublicPollsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicPollsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
