import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReprocessaPrecosComponent } from './reprocessa-precos.component';
import { HttpClientModule } from '@angular/common/http';

describe('ReprocessaPrecosComponent', () => {
  let component: ReprocessaPrecosComponent;
  let fixture: ComponentFixture<ReprocessaPrecosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReprocessaPrecosComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReprocessaPrecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
