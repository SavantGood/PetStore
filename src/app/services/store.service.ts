import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Order} from '../models/order';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  readonly STORE_URL = 'https://petstore.swagger.io/v2/store/order/';
  // Заказы для записи результата pipe //
  orderForCreate: Order;
  orderForUpdate: Order;

  constructor(private http: HttpClient) { }

  // Получение одного заказа //
  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(this.STORE_URL + id);
  }
  // Создание нового заказа //
  createOrder(data: Order): Observable<Order> {
    return this.http.post<Order>(this.STORE_URL, data);
  }
  // Изменение заказа//
  updateOrder(data: Order): Observable<Order> {
    return this.http.post<Order>(this.STORE_URL, data);
  }
  // Удаление заказа //
  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(this.STORE_URL + id);
  }

}
