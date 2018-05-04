import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFirstComponent } from './search-first.component';

describe('SearchFirstComponent', () => {
  let component: SearchFirstComponent;
  let fixture: ComponentFixture<SearchFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
