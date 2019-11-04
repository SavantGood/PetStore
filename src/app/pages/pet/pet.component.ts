import {Component} from '@angular/core';
import {Pet} from '../../models/pet';
import {PetService} from '../../services/pet.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from '../../services/snack-bar.service';
import {MatDialog} from '@angular/material';
import {PetFormComponent} from './forms/pet-form/pet-form.component';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent {
  // Для изменения видимости блока Find Pets by Status //
  visibility = true;
  // Для компонента select //
  public optionsForPet = ['available', 'pending', 'sold'];
  // Для работы со спинером //
  public isComplete = true;
  // Для вывода массива животных в Find by Status //
  public pets: Pet[];
  public petStatus = 'available';
  // Для поля ввода данных 'ID' Питомца//
  public petId: number;
  // Для вывода результата из subscribe //
  public petForGet: Pet; // Питомца //

  constructor(private petService: PetService, private snackBarService: SnackBarService, public dialog: MatDialog) {
  }

  // Получение одного питомца //
  public getPet(): void {
    if (!this.petId) {
      this.snackBarService.openSnackBar('Enter Pet ID', 'ok');
      return;
    }
    this.isComplete = false;
    this.petService.getPet(this.petId).subscribe((pet: Pet) => {
      this.petForGet = pet;
      this.isComplete = true;
    }, (error: HttpErrorResponse) => {
        this.snackBarService.openSnackBar(error.statusText, 'ok');
        this.petForGet = null;
        this.isComplete = true;
    });
  }

  // Удаление одного питомца //
  public deletePet(): void {
    if (!this.petId) {
      this.snackBarService.openSnackBar('Enter Pet ID', 'ok');
      return;
    }
    this.isComplete = false;
    this.petService.deletePet(this.petId).subscribe(() => {
      this.snackBarService.openSnackBar('Pet with ID: ' + this.petId + ' delete.', 'ok');
      this.isComplete = true;
    }, (error: HttpErrorResponse) => {
      this.snackBarService.openSnackBar(error.statusText, 'ok');
      this.isComplete = true;
    });
  }

  // Получение списка животных по статусу //
  public findByStatus(): void {
    this.isComplete = false;
    this.petService.findByStatus(this.petStatus).subscribe((item: Pet[]) => {
      this.pets = item;
      item.sort((i1, i2) => {
        return (i1.id - i2.id);
      });
      this.isComplete = true;
    }, error => {
      this.snackBarService.openSnackBar(error.statusText, 'ok');
    });
  }

  // Для изменения видимости блока Find Pets by Status //
  toggle() {
    this.visibility = !this.visibility;
  }

  // Октрытие диалогового окна с созданием питомца //
  public onShowCreatePet(): void {
    this.dialog.open(PetFormComponent, {
      data: null
    });
  }

  // Октрытие диалогового окна с измением параметров питомца //
  public onShowUpdatePet(): void {
    this.petService.getPet(this.petId).subscribe(pet => {
      this.dialog.open(PetFormComponent, {
        data: pet
      });
    }, error => {
      if (this.petId == null) {
        this.snackBarService.openSnackBar('Enter Pet ID', 'ok');
      } else {
        this.snackBarService.openSnackBar(error.statusText, 'ok');
      }
    });
  }
}
