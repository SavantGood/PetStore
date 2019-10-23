import {Component} from '@angular/core';
import {Pet} from './models/pet';
import {PetService} from './services/pet.service';
import {StoreService} from './services/store.service';
import {Order} from './models/order';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  // Для полей ввода данных 'ID' Питомца//
  petId: number; // Получение //
  // Для полей ввода данных 'ID' Заказа//
  orderId: number;
  // Для вывода результата из subscribe //
  petForGet: Pet; // Питомца //
  orderForGet: Order; // Заказа//
  petForCreate: Pet;
  orderForCreate: Order;
  petForUpdate: Pet;
  orderForUpdate: Order;
  petForDelete: Pet;
  orderForDelete: Order;
  // Для обработки ошибок //
  errorForPets: any;
  errorForOrders: any;
  // Модели для методов Create и Update //
  public petModelForCreate: Pet = {
    id: null,
    name: '',
    status: '',
  } as Pet;
  public petModelForUpdate: Pet = {
    id: null,
    name: '',
    status: '',
  } as Pet;
  public orderModelForCreate: Order = {
    complete: null,
    id: this.orderId,
    petId: null,
    quantity: null,
    shipDate: new Date(),
    status: ''
  };
  public orderModelForUpdate: Order = {
    complete: null,
    id: null,
    petId: null,
    quantity: null,
    shipDate: new Date(),
    status: ''
  };

  constructor(private petService: PetService, private storeService: StoreService) {}

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
    this.petService.getPet(this.petId).subscribe((pet: Pet) => {
      this.petForGet = pet;
      this.errorForPets = '';
    }, (error: HttpErrorResponse) => {
      this.petForGet = null;
      this.errorForPets = error.statusText;
    });
  }

  // Создание нового питомца //
  createPet() {
    this.petService.createPet(this.petModelForCreate).subscribe(pet => {
      this.petForCreate = pet;
    });
  }

  // Изменение одного питомца //
  updatePet() {
    this.petService.updatePet(this.petModelForUpdate).subscribe(pet => {
      this.petForUpdate = pet;
    });
  }

  // Удаление одного питомца //
  deletePet() {
    this.petService.deletePet(this.petId).subscribe(pet => {
      this.petForDelete = pet;
      alert('Питомец с ID: ' + this.petId + ' удален.');
    });
  }

  // Получение одного заказа //
  getOrder() {
    this.storeService.getOrder(this.orderId).subscribe((order: Order) => {
      this.orderForGet = order;
      this.errorForOrders = '';
      },
      (error: HttpErrorResponse) => {
      this.orderForGet = null;
      this.errorForOrders = error.statusText;
        });
  }

  // Создание нового заказа //
  createOrder() {
    this.storeService.createOrder(this.orderModelForCreate).subscribe((order: Order) => {
      this.orderForCreate = order;
    });
  }

  // Изменение одного заказа //
  updateOrder() {
    this.storeService.updateOrder(this.orderModelForUpdate).subscribe((order: Order) => {
      this.orderForUpdate = order;
    });
  }

  // Удаление одного заказа //
  deleteOrder() {
    this.storeService.deleteOrder(this.orderId).subscribe((order: Order) => {
      this.orderForDelete = order;
      alert('Заказ с ID: ' + this.orderId + ' удален.');
    });
  }
}
