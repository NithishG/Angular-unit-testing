import { HoverFocusDirective } from './hover-focus.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


@Component({
  template: `<input type="text" appHoverFocus>`
})
class TestAppHoverComponent {}

describe('HoverFocusDirective', () => {

  let component: TestAppHoverComponent;
  let fixture: ComponentFixture<TestAppHoverComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAppHoverComponent, HoverFocusDirective]
    });
    fixture = TestBed.createComponent(TestAppHoverComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('input'));
  })
  
  it('should create an instance', () => {
    const directive = new HoverFocusDirective();
    expect(directive).toBeTruthy();
  });

  it("Hovering over input", () => {
    el.triggerEventHandler("mouseover", null);
    fixture.detectChanges();
    expect(el.nativeElement.style.backgroundColor).toBe("blue");

    el.triggerEventHandler("mouseout", null);
    fixture.detectChanges();
    expect(el.nativeElement.style.backgroundColor).toBe("inherit");
  })
});
