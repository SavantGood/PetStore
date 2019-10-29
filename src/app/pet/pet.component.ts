import {Component, OnInit, ViewChild} from '@angular/core';
import {Pet} from '../models/pet';
import {PetService} from '../services/pet.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {SnackBarService} from '../services/snack-bar.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  // Для вывода массива животных в Find by Status //
  pets: Pet[];
  petStatus: string;
  // Для отображения полей Create и Update //
  switchPet: number;
  // Для полей ввода данных 'ID' Питомца//
  petId: number; // Получение //
  // Для вывода результата из subscribe //
  petForGet: Pet; // Питомца //
  petForCreate: Pet;
  petForUpdate: Pet;
  petForDelete: Pet;
  // Для обработки ошибок //
  errorForPets: any;
  // Модели для методов Create и Update //
  public petModelForCreate: Pet = {
    id: null,
    name: '',
    status: 'available',
  } as Pet;
  public petModelForUpdate: Pet = {
    id: null,
    name: '',
    status: 'available',
  } as Pet;
  displayedColumns: string[] = ['ID', 'name', 'status'];
  dataSource: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private petService: PetService, private snackBar: SnackBarService) { }

  ngOnInit(): void {

  }

  // Получение списка животных по статусу //
  findByStatus() {
    this.petService.findByStatus(this.petStatus).subscribe((item: Pet[]) => {
        this.pets = item;
        this.dataSource = new MatTableDataSource<Pet>(this.pets);
        this.dataSource.paginator = this.paginator;
        item.sort((i1, i2) => {
          return (i1.id - i2.id);
        });
        }, error => {
        this.errorForPets = error.message;
        console.log(error);
      });
  }

  // Получение одного питомца //
  getPet() {
    this.petService.getPet(this.petId).subscribe((pet: Pet) => {
      this.petForGet = pet;
      this.errorForPets = '';
    }, (error: HttpErrorResponse) => {
      this.snackBar.openSnackBar(error.statusText, 'ok');
      console.log(error);
    });
  }

  // Создание нового питомца //
  createPet() {
    this.petService.createPet(this.petModelForCreate).subscribe((pet: Pet) => {
      this.petForCreate = pet;
    });
  }

  // Изменение одного питомца //
  updatePet() {
    this.petService.updatePet(this.petModelForUpdate).subscribe((pet: Pet) => {
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


}
