import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pet} from '../models/pet';
import {Observable} from 'rxjs';
import {AppConfig} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private readonly ROOT_URL = this.appConfig.getWebApiUrl() + '/pet/';

  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  // Получение списка животных по статусу //
  public findByStatus(status: string): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.ROOT_URL + 'findByStatus?status=' + status);
  }

  // Получение одного питомца //
  public getPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(this.ROOT_URL + id);
  }

  // Создание нового питомца //
  public createPet(data: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.ROOT_URL, data);
  }

  // Изменение одного питомца //
  public updatePet(data: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.ROOT_URL, data);
  }

  // Удаление одного питомца //
  public deletePet(id: number): Observable<Pet> {
    return this.http.delete<Pet>(this.ROOT_URL + id);
  }
}
