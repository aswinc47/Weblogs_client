import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecenterComponent } from './homecenter.component';

describe('HomecenterComponent', () => {
  let component: HomecenterComponent;
  let fixture: ComponentFixture<HomecenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomecenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomecenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
