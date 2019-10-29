import {Component} from '@angular/core';
import {Order} from '../models/order';
import {StoreService} from '../services/store.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Inventory} from '../models/inventory';
import {SnackBarService} from '../services/snack-bar.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  // Для отображения полей Create и Update //
  switchOrder: number;
  // Для полей ввода данных 'ID' Питомца//
  orderId: number;
  // Для вывода результата из subscribe //
  orderForGet: Order; // Заказа//
  orderForCreate: Order;
  orderForUpdate: Order;
  orderForDelete: Order;
  // Для обработки ошибок //
  errorForOrders: any;
  // Модели для методов Create и Update //
  public orderModelForCreate: Order = {
    complete: null,
    id: null,
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
  inventories: Inventory;
  inventories1: any;
  data: Inventory = {
    approved: undefined,
    delivered: undefined,
    placed: undefined
  };

  constructor(private storeService: StoreService, private snackBar: SnackBarService) {}

  // Получение списка заказов со статусом //
  statusByOrder() {
    this.storeService.statusByOrder().subscribe((status: Inventory) => {
      this.inventories = status;
      this.inventories1 = JSON.stringify(this.inventories, null, '\t');
    });
  }

  // Получение одного заказа //
  getOrder() {
    this.storeService.getOrder(this.orderId).subscribe((order: Order) => {
        this.orderForGet = order;
        this.errorForOrders = '';
      },
      (error: HttpErrorResponse) => {
        this.snackBar.openSnackBar(error.statusText, 'ok');
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
