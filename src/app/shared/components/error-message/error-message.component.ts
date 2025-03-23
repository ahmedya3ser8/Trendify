import { Component, input, InputSignal } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  inputControl: InputSignal<AbstractControl | null> = input<AbstractControl | null>(null);
  inputTitle: InputSignal<string> = input('');
  inputMessage: InputSignal<string> = input('');
}
