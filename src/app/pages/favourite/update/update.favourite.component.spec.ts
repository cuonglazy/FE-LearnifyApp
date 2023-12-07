import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFavouriteComponent } from './update.favourite.component';

describe('UpdateFavouriteComponent', () => {
  let component: UpdateFavouriteComponent;
  let fixture: ComponentFixture<UpdateFavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFavouriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
