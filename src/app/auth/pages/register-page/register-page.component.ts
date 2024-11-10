import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import * as customValidator from '../../../shared/validators/validators';
import { ValidatorsServices } from '../../../shared/service/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorsServices: ValidatorsServices,
    private emailValidator: EmailValidator
  ) {
    this.myForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.validatorsServices.firstNameAndLastnamePattern)]],
      //email: ['', [Validators.required, Validators.pattern(this.validatorsServices.emailPattern)], [ new EmailValidator() ] ],
      email: ['', [Validators.required, Validators.pattern(this.validatorsServices.emailPattern)], [ this.emailValidator ] ],
      username: ['', [Validators.required, this.validatorsServices.cantBeStrider]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    }, {
      validators: [
        this.validatorsServices.isFieldOneEqualTwo('password', 'password2'),
      ]
    });
  }

  isValid( field: string ) {
    return this.validatorsServices.isValidField( this.myForm, field );
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
