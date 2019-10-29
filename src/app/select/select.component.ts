import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() option1: string;
  @Input() option2: string;
  @Input() option3: string;
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }
}
