import { FormControl, ValidationErrors } from '@angular/forms';

export function noWhitespaceValidator(
  control: FormControl,
): ValidationErrors | null {
  return (control.value || '').trim().length ? null : { whitespace: true };
}
