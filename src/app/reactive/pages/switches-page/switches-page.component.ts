import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

  ngOnInit(): void {
    this.myForm.reset( this.person );
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  private fb: FormBuilder = new FormBuilder();

  public myForm: FormGroup = this.fb.group({
    gender: ['M', [ Validators.required ] ],
    wantNotifications: [ true, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ],
  });

  public person = {
    gender: 'F',
    wantNotifications: false
  }

  // ngSubmit
  onSave() {

    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;

    console.log( this.myForm.value );
    console.log( this.person );

    this.myForm.reset({
      gender: 'M',
      wantNotifications: true,
      termsAndConditions: false,
    })

  }

}
