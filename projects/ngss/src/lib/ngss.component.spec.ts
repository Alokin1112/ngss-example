import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgssComponent } from './ngss.component';

describe('NgssComponent', () => {
  let component: NgssComponent;
  let fixture: ComponentFixture<NgssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgssComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
