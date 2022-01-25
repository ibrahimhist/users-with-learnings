import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';

import { CreateUserDialogComponent } from './create-user-dialog.component';
import { UserService } from '@app/shared/services/user/user.service';
import { MessageHandlingService } from '@app/shared/services/message-handling.service';
import { of } from 'rxjs';

describe('CreateUserDialogComponent', () => {
  let component: CreateUserDialogComponent;
  let fixture: ComponentFixture<CreateUserDialogComponent>;
  let userService: UserService;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserDialogComponent],
      imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],

      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        MessageHandlingService,
        UserService,
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('First Name field validity', () => {
    // Arrange
    //  Act
    const firstName = component.createUserForm.controls['first_name'];
    //  Assertion
    expect(firstName.valid).toBeFalsy();

    // Act
    firstName.setValue('');
    //  Assertion
    expect(firstName.hasError('required')).toBeTruthy();

    // Act
    firstName.setValue('Test');
    //  Assertion
    expect(firstName.valid).toBeTruthy();
  });

  it('Last Name field validity', () => {
    // Arrange
    //  Act
    const lastName = component.createUserForm.controls['last_name'];
    //  Assertion
    expect(lastName.valid).toBeFalsy();

    // Act
    lastName.setValue('');
    //  Assertion
    expect(lastName.hasError('required')).toBeTruthy();

    // Act
    lastName.setValue('Test');
    //  Assertion
    expect(lastName.valid).toBeTruthy();
  });

  it('Email field validity', () => {
    // Arrange
    //  Act
    fixture.detectChanges();
    let email = component.createUserForm.controls['email'];
    //  Assertion
    expect(email.valid).toBeFalsy();

    //  Act
    email.setValue('');
    //  Assertion
    expect(email.hasError('required')).toBeTruthy();

    //  Act
    email.setValue('dumy@@gmail.com');
    //  Assertion
    expect(email.hasError('email')).toBeTruthy();

    //  Act
    email.setValue('test@gmail.com');
    //  Assertion
    expect(email.valid).toBeTruthy();
  });

  it('should call createUser when form is valid', () => {
    // Arrange
    component.createUserForm.setValue({
      first_name: 'first_name',
      last_name: 'last_name',
      avatar: 'avatar',
      email: 'test@gmail.com',
    });
    //  Act
    const spy = spyOn(userService, 'createUser').and.callFake(() => {
      return of({ success: true } as any);
    });
    component.onClickedCreate();
    //  Assertion
    expect(spy).toHaveBeenCalled();
  });
});
