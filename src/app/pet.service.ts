import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pet} from './pet';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  readonly ROOT_URL = 'https://petstore.swagger.io/v2/pet/';
  petIdForGet: number;
  petIdForCreate: number;
  petIdForUpdate: number;
  petIdForDelete: number;
  namePetForCreate = '';
  namePetForUpdate = '';
  statusPetForCreate = '';
  statusPetForUpdate = '';
  response: Pet;
  error: any;
  newPetForCrate: Pet;
  newPetForUpdate: Pet;

  constructor(private http: HttpClient) { }

  public getPet(id: number) {
    return this.http.get<Pet>(this.ROOT_URL + id).pipe(map(response => this.response = response));
  }
}
