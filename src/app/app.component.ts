import {Component} from '@angular/core';
import {Pet} from './pet';
import {PetService} from './pet.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  readonly ROOT_URL = 'https://petstore.swagger.io/v2/pet/';
  // Для полей ввода данных 'ID'//
  petIdForGet: number; // Получение //
  petIdForCreate: number; // Создание //
  petIdForUpdate: number; // Изменение //
  petIdForDelete: number; // Удаление //
  // Для полей ввода данных 'Name' //
  namePetForCreate = ''; // Создание //
  namePetForUpdate = ''; // Изменение //
  // Для полей ввода данных 'Status' //
  statusPetForCreate = ''; // Создание //
  statusPetForUpdate = ''; // Изменение //
  // Для обработки ошибок //
  error: any;
  // Для вывода результата из subscribe //
  petForGet: Pet; // Получение //
  petForCreate: Pet; // Создание //
  petForUpdate: Pet; // Изменение //

  constructor(private petService: PetService) {}

  // getAllPets() {
  //   for (let i = 0; i < 9; i++) {
  //     this.http.get<Pet>(this.ROOT_URL + i).subscribe((response) => this.response = response, error => {
  //       this.error = error.message;
  //       console.log(error);
  //     });
  //   }
  // }

  // Получение одного питомца //
  getPet() {
    this.petService.getPet(this.petIdForGet).subscribe(pet => this.petForGet = pet, error1 => this.error = error1.message);
  }

  // Создание одного питомца //
  createPet() {
    // Новый Питомец //
    const dataForCrate: Pet = {
      category: undefined,
      photoUrls: '',
      tags: [],
      id: this.petIdForCreate,
      name: this.namePetForCreate,
      status: this.statusPetForCreate
    };
    this.petService.createPet(dataForCrate).subscribe(pet => this.petForCreate = pet);
  }

  // Изменение одного питомца //
  updatePet() {
    // Измененый питомец //
    const dataForUpdate: Pet = {
      id: this.petIdForUpdate,
      name: this.namePetForUpdate,
      status: this.statusPetForUpdate
    } as Pet;
    this.petService.updatePet(dataForUpdate).subscribe(pet => this.petForUpdate = pet);
  }

  // Удаление одного питомца //
  deletePet() {
    this.petService.deletePet(this.petIdForDelete);
  }
}
