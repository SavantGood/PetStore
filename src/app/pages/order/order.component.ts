import {Component} from '@angular/core';
import {Order} from '../../models/order';
import {StoreService} from '../../services/store.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from '../../services/snack-bar.service';
import {OrderFormComponent} from './forms/order-form/order-form.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent {
  // Для изменения видимости блока Find Pets by Status //
  public visibility = true;
  // Для работы со спинером //
  public isComplete = true;
  // Для полей ввода данных 'ID' Питомца//
  public orderId: number;
  // Для вывода результата из subscribe //
  public orderForGet: Order; // Заказа//
  public inventories: string[] = [];

  constructor(private storeService: StoreService, private snackBarService: SnackBarService, public dialog: MatDialog) {
  }

  // Получение одного заказа //
  public getOrder(): void {
    if (!this.orderId) {
      this.snackBarService.openSnackBar('Enter Order ID', 'ok');
      return;
    }
    this.isComplete = false;
    this.storeService.getOrder(this.orderId).subscribe((order: Order) => {
        this.orderForGet = order;
        this.isComplete = true;
      },
      (error: HttpErrorResponse) => {
        this.snackBarService.openSnackBar(error.statusText, 'ok');
        this.orderForGet = null;
        this.isComplete = true;
    });
  }

  // Удаление одного заказа //
  public deleteOrder(): void {
    if (!this.orderId) {
      this.snackBarService.openSnackBar('Enter Order ID', 'ok');
      return;
    }
    this.isComplete = false;
    this.storeService.deleteOrder(this.orderId).subscribe(() => {
      this.snackBarService.openSnackBar('Order with ID: ' + this.orderId + ' delete.', 'ok');
      this.isComplete = true;
    }, (error: HttpErrorResponse) => {
      this.snackBarService.openSnackBar(error.statusText, 'ok');
      this.isComplete = true;
    });
  }

  // Получение списка заказов со статусом //
  public statusByOrder(): void {
    this.isComplete = false;
    this.storeService.statusByOrder().subscribe((result: any) => {
      this.inventories = [];
      Object.keys(result).forEach(key => {
        this.inventories.push(key + ': ' + result[key]);
        this.isComplete = true;
      });
    });
  }

  // Октрытие диалогового окна с созданием питомца //
  public onShowCreateOrder(): void {
    this.dialog.open(OrderFormComponent, {
      data: null
    });
  }

  // Октрытие диалогового окна с измением параметров питомца //
  public onShowUpdateOrder(): void {
    this.storeService.getOrder(this.orderId).subscribe(order => {
      this.dialog.open(OrderFormComponent, {
        data: order
      });
    }, error => {
      if (this.orderId == null) {
        this.snackBarService.openSnackBar('Enter Order ID', 'ok');
      } else {
        this.snackBarService.openSnackBar(error.statusText, 'ok');
      }
    });
  }

  // Для изменения видимости блока Find Pets by Status //
  toggle() {
    this.visibility = !this.visibility;
  }
}
