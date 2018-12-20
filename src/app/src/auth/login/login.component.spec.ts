import { async, ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { LoginComponent } from "./login.component";
import { AuthService } from "../auth.service";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule, FormsModule],
      declarations: [ LoginComponent ],
      providers: [AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    el = fixture.debugElement.query(By.css("a"));
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

/*   
  it("Login button should be hidden if user already logged in", ()=>{
    // expect(el.nativeElement.textContent.trim()).toBe("");
    // fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe("Login");
    spyOn(authService, "isAuthenticated").and.returnValue(true);
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe("Logout");
  }) 
*/

  it("Button Lable using jasmine.done", (done) => {
    expect(el.nativeElement.textContent.trim()).toBe("Login");
    let spy = spyOn(authService, "isAuthenticated").and.returnValue(Promise.resolve(true));
    component.ngOnInit();
    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe("Logout");
      done();
    })
  });

  it("Button Lable using async() and whenStable()", async(() => {
    expect(el.nativeElement.textContent.trim()).toBe("Login");
    spyOn(authService,"isAuthenticated").and.returnValue(Promise.resolve(true));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe("Logout");
    });
    component.ngOnInit();
  }));

  it("Button label via fakeAsync() and tick()", fakeAsync(() => {
    expect(el.nativeElement.textContent.trim()).toBe("Login");
    spyOn(authService, "isAuthenticated").and.returnValue(Promise.resolve(true));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe("Logout");
  }));

  it("Form should be invalid when empty", () => {
    component.ngOnInit();
    expect(component.form.valid).toBeFalsy();
  });

  it("Email field validity", () => {
    component.ngOnInit();
    let email = component.form.controls["email"];
    expect(email.valid).toBeFalsy();

    let errors = email.errors || {};
    expect(errors["required"]).toBeTruthy();

    email.setValue("Dummy Value");
    errors = email.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["pattern"]).toBeTruthy();

    email.setValue("Test@test.com");
    errors = email.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["pattern"]).toBeFalsy();
  });

  it("Password field validity", () => {
    component.ngOnInit();
    let password = component.form.controls["password"];
    expect(password.valid).toBeFalsy();

    let errors = password.errors || {};
    expect(errors["required"]).toBeTruthy();

    password.setValue("12345");
    errors = password.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["minlength"]).toBeTruthy();

    password.setValue("123456789");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  it("Submitting the form emits a User", () => {
    component.ngOnInit();

    expect(component.form.valid).toBeFalsy();
    component.form.controls["email"].setValue("Test@test.com");
    component.form.controls["password"].setValue("123456789");
    expect(component.form.valid).toBeTruthy();

    let user;
    component.loggedIn.subscribe((value) => user = value);

    component.login();

    expect(user.email).toBe("Test@test.com");
    expect(user.password).toBe("123456789");
  })

});
