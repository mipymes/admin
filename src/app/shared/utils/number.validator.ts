import { AbstractControl } from '@angular/forms';
export function numberValidator(control : AbstractControl){

    if(control.pristine){
        return null;
    }
    control.markAsTouched();
    const numberRegExp = /^[0-9]\d*$/

    if(numberRegExp.test(control.value)){
        return null;
    }
   return {numberIsInvalid: true} 
}