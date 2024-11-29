import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogCustosComponent } from './log-custos.component';
import { HttpClientModule } from '@angular/common/http';

describe('LogCustosComponent', () => {
  let component: LogCustosComponent;
  let fixture: ComponentFixture<LogCustosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogCustosComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LogCustosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
