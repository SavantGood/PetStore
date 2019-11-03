import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../models/order';
import {Observable} from 'rxjs';
import {AppConfig} from '../app.config';
import {Inventory} from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly STORE_URL = this.appConfig.getWebApiUrl() + '/store/order/';

  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  // Получение списка заказов со статусом //
  public statusByOrder(): Observable<Inventory> {
    return this.http.get<Inventory>(this.appConfig.getWebApiUrl() + '/store/inventory');
  }

  // Получение одного заказа //
  public getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(this.STORE_URL + id);
  }

  // Создание нового заказа //
  public createOrder(data: Order): Observable<Order> {
    return this.http.post<Order>(this.STORE_URL, data);
  }

  // Изменение заказа//
  public updateOrder(data: Order): Observable<Order> {
    return this.http.post<Order>(this.STORE_URL, data);
  }

  // Удаление заказа //
  public deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(this.STORE_URL + id);
  }

}
