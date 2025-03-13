import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizaCustosComponent } from './visualiza-custos.component';
import { HttpClientModule } from '@angular/common/http';

describe('VisualizaCustosComponent', () => {
  let component: VisualizaCustosComponent;
  let fixture: ComponentFixture<VisualizaCustosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizaCustosComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizaCustosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
