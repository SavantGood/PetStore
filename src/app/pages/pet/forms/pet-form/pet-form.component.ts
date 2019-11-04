import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Pet} from '../../../../models/pet';
import {PetService} from '../../../../services/pet.service';
import {SnackBarService} from '../../../../services/snack-bar.service';

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent {
  // Флаг для Update //
  public isEdit = false;
  // Флаг для спинера //
  public isComplete = true;
  // Опции для select //
  public optionsForPet = ['available', 'pending', 'sold'];
  // Модель питомца //
  public petModel: Pet = {
    id: null,
    name: '',
    status: 'available'
  };

  constructor(
    public dialogRef: MatDialogRef<PetFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pet, private petService: PetService, private snackBarService: SnackBarService) {
    if (data) {
      this.petModel = data;
      this.isEdit = true;
    }
  }

  // Выход из далогового окна //
  public close(): void {
    this.dialogRef.close();
  }

  // Сохранение изменений //
  public save(): void {
    this.isComplete = false;
    const alertText = 'Pet with ID:' + this.petModel.id + (this.isEdit ? ' update' : ' create') + '.';
    if (this.isEdit) {
      this.petService.updatePet(this.petModel).subscribe(() => {
        this.closeDialogWithAlert(alertText);
      }, error => {
        this.snackBarService.openSnackBar(error.statusText, 'ok');
        this.isComplete = true;
      });
    } else {
      this.petService.createPet(this.petModel).subscribe(() => {
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
