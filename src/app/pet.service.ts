import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pet} from './pet';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  readonly ROOT_URL = 'https://petstore.swagger.io/v2/pet/';
  // Питомцы для записи результата pipe //
  newPetForGet: Pet;
  newPetForCrate: Pet;
  newPetForUpdate: Pet;

  constructor(private http: HttpClient) { }

  // Получение одного питомца //
  public getPet(id: number) {
    return this.http.get<Pet>(this.ROOT_URL + id).pipe(map(response => this.newPetForGet = response));
  }

  // Создание одного питомца //
  createPet(data: Pet) {
    return this.http.post<Pet>(this.ROOT_URL, data).pipe(map(result => this.newPetForCrate = result));
  }

  // Изменение одного питомца //
  updatePet(data: Pet) {
    return this.http.post<Pet>(this.ROOT_URL, data).pipe(map(result => this.newPetForUpdate = result));
  }

  // Удаление одного питомца //
  deletePet(id: number) {
    return this.http.delete<Pet>(this.ROOT_URL + id).subscribe(result => {
      console.log(result);
    });
  }
}
