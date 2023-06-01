import { AbstractControl, ValidationErrors } from "@angular/forms";

export class Registervalidators {

    // function to check if password and confirm password match
    static match(controlName:string , matchingControlName:string)  {
        return (group:AbstractControl) : ValidationErrors | null => {
            const control = group.get(controlName)
            const matchingControl = group.get(matchingControlName)

            if (!control || !matchingControl) {
                return { noControlValue: false }
            }

            const error = control.value === matchingControl.value ? null : { notMatching: true }

            // setting custom error on confirm password
            matchingControl.setErrors(error)
            return error
    }
    }
}
