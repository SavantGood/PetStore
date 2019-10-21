import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pet} from './pet';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  readonly ROOT_URL = 'https://petstore.swagger.io/v2/pet/';
  petIdForGet: number;
  petIdForCreate: number;
  petIdForUpdate: number;
  petIdForDelete: number;
  namePetForCreate = '';
  namePetForUpdate = '';
  statusPetForCreate = '';
  statusPetForUpdate = '';
  response: Pet;
  error: any;
  newPetForCrate: Pet;
  newPetForUpdate: Pet;


  constructor(private http: HttpClient) {}

  getAllPets() {
    for (let i = 0; i < 9; i++) {
      this.http.get<Pet>(this.ROOT_URL + i).subscribe((response) => this.response = response, error => {
        this.error = error.message;
        console.log(error);
      });
    }
  }

  getPets() {
    this.http.get<Pet>(this.ROOT_URL + this.petIdForGet).subscribe((response: Pet) => {
      this.response = response;
      console.log(response);
    }, error1 => {
      this.error = error1.message;
    });
  }

  createPet() {
    const data: { name: string; id: number; status: string } = {
      id: this.petIdForCreate,
      name: this.namePetForCreate,
      status: this.statusPetForCreate
    };
    this.http.post<Pet>(this.ROOT_URL, data).subscribe(result => {
      this.newPetForCrate = result;
    });
  }

  updatePet() {
    const data1: { name: string; id: any; status: string } = {
      id: this.response.id,
      name: this.namePetForUpdate,
      status: this.statusPetForUpdate
    };
    this.http.post<Pet>(this.ROOT_URL, data1).subscribe(result => {
       this.newPetForUpdate = result;
    });
  }

  deletePet() {
    this.http.delete<Pet>(this.ROOT_URL + this.petIdForDelete).subscribe(result => {
      console.log(result);
    });
  }
}
