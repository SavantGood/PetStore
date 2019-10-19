import {Component, OnInit} from '@angular/core';
import {HttpService} from './http.service';
import {Pet} from './pet';


@Component({
  selector: 'app-root',
  template: `<ul>
      <li *ngFor="let pet of pets">
          <p>Имя пользователя: {{pet?.name}}</p>
          <p>Возраст пользователя: {{pet?.id}}</p>
      </li>
  </ul>
  `,
  providers: [HttpService]
})
export class AppComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private httpService: HttpService) {}
  ngOnInit(): void {
    this.httpService.getData().subscribe(item => this.pets = item);
  }
}
