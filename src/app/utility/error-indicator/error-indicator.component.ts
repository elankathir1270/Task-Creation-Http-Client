import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-indicator',
  templateUrl: './error-indicator.component.html',
  styleUrls: ['./error-indicator.component.css']
})
export class ErrorIndicatorComponent {

  @Input()errorMsg : string;

}
