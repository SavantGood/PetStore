import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pet} from '../models/pet';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private readonly ROOT_URL = 'https://petstore.swagger.io/v2/pet/';

  constructor(private http: HttpClient) { }

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
