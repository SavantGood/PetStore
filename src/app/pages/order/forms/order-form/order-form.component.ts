import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SnackBarService} from '../../../../services/snack-bar.service';
import {StoreService} from '../../../../services/store.service';
import {Order} from '../../../../models/order';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  // Для опций select //
  public optionsForOrderStatus = ['placed', 'approved', 'delivered'];
  public optionForOrderComplete = ['True', 'False'];
  // Флаг для редактирования //
  public isEdit = false;
  // Флаг для спинера //
  public isComplete = true;
  // Модель заказа //
  public orderModel: Order = {
    complete: true,
    id: null,
    petId: null,
    quantity: null,
    shipDate: new Date(),
    status: 'placed'
  };

  constructor(
    public dialogRef: MatDialogRef<OrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order, private orderService: StoreService, private snackBarService: SnackBarService) {
    if (data) {
      this.orderModel = data;
      this.isEdit = true;
    }
  }

  // Закрытие диалогового окна //
  public close(): void {
    this.dialogRef.close();
  }

  // Создание нового заказа //
  public save(): void {
    this.isComplete = false;
    const alertText = 'Order with ID: ' + this.orderModel.id + ' ' + (this.isEdit ? 'update' : 'create') + '.';
    if (this.isEdit) {
      this.orderService.updateOrder(this.orderModel).subscribe(() => {
        this.closeDialogWithAlert(alertText);
      }, () => {
        this.isComplete = true;
      });
    } else {
      this.orderService.createOrder(this.orderModel).subscribe(() => {
        this.closeDialogWithAlert(alertText);
      }, () => {
        this.isComplete = true;
      });
    }
  }

  private closeDialogWithAlert(alertText: string) {
    this.snackBarService.openSnackBar(alertText, 'ok');
    this.close();
  }
}
