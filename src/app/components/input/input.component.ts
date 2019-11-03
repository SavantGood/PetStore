import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() public placeholder: string;
  @Input() public value: any;
  @Input() public type: string;
  @Input() public active = false;

  constructor() { }
}
