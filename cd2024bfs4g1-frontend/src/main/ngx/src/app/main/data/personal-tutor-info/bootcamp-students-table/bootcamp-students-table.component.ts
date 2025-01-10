import { Component, Injector, ViewChild } from '@angular/core';
import { DialogService, Expression, FilterExpressionUtils, OTableComponent, ServiceResponse } from 'ontimize-web-ngx';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { OFormCacheClass, OFormComponent, OTextInputComponent } from 'ontimize-web-ngx';
import { Router } from '@angular/router';
import { MainService } from 'src/app/shared/services/main.service';
import { OntimizeService } from 'ontimize-web-ngx';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bootcamp-students-table',
  templateUrl: './bootcamp-students-table.component.html',
  styleUrls: ['./bootcamp-students-table.component.css']
})
export class BootcampStudentsTableComponent {
  bootcampId: number;
  assignedBootcamps: number[] = [];
  userId: number;
  tutorId: number;
  service: OntimizeService;
  @ViewChild("userId") inputTutorId: OTextInputComponent;
  @ViewChild('bootcampDetailForm') bootcampDetailForm: OFormComponent;
  @ViewChild('sessionBootcampTable', { static: true }) table: OTableComponent;
  selectedStatuses: string[] = ['Started', 'Pending'];

  constructor(
    protected dialogService: DialogService, private router: Router, private mainService: MainService,
    private injector: Injector, private snackBar: MatSnackBar) {
      this.service = this.injector.get(OntimizeService);

  }

  protected configureTutorService(): void {
    const conf = this.service.getDefaultServiceConfiguration('tutors');
    this.service.configureService(conf);
  }

  protected configureTutorBootcampService(): void {
    const conf = this.service.getDefaultServiceConfiguration('tutorBootcamps');
    this.service.configureService(conf);
  }

  getTutorData(userId: number): void {
    if (userId && this.service !== null) {
      const filter = { user_id: userId };
      const columns = ['id', 'name', 'surname1', 'surname2', 'email', 'user_id', 'usr_photo'];
      this.configureTutorService();
      this.service.query(filter, columns, 'tutor').subscribe({
        next: (resp) => {
          if (resp.code === 0 && resp.data.length > 0) {
            const tutorData = resp.data[0];
            console.log('Datos del tutor:', tutorData);
            this.tutorId = tutorData.id;
            this.getBootcamps(this.tutorId);
          } else {
            this.snackBar.open('No tienes permisos para acceder a esta ventana.', '', { duration: 3500, panelClass: 'notification-error' });
            this.router.navigate(['/main/data/tutor']);
          }
        },
        error: (err) => {
          console.error('Error al consultar datos del tutor:', err);
        },
      });
    }
  }

  getBootcamps(tutorId: number): void {
    if (tutorId && this.service !== null) {
      console.log(this.bootcampId);
      const filter = { tutor_id: tutorId, bootcamp_id: this.bootcampId };
      const columns = ['id'];
      this.configureTutorBootcampService();
      this.service.query(filter, columns, 'tutorsWithBootcamp').subscribe({
        next: (resp) => {
          if (resp.code == 1 || resp.data.length == undefined || resp.data.length == 0) {  
            this.snackBar.open('No tienes permisos para acceder a esta ventana.', '', { duration: 3500, panelClass: 'notification-error' });
            this.router.navigate(['/main/data/tutor']);
          }
        },
        error: (err) => {
          console.error('Error al consultar datos del tutor:', err);
        },
      });
    }
  }

  loadData(){
    this.bootcampId = this.bootcampDetailForm.getFieldValue("id");

    this.mainService.getUserInfo().subscribe((result: ServiceResponse) =>{
      this.userId = result.data.usr_id;
      this.getTutorData(this.userId);
    });
  }

  private getCurrentUserId(): number {
    let userId;
    this.mainService.getUserInfo().subscribe((result: ServiceResponse) => {
      const userId = result.data.id; // obtener el id
      this.inputTutorId.setValue(userId); // asignar el id al campo de texto
      this.getTutorData(userId);}) // llamar a getTutorData con el id
    return userId;
  }

  openLink(event: any): void {
    const link = event?.link;

    if (!link) {
      this.showAlert();
      return;
    }
    window.open(link, '_blank');
  }

  showAlert() {
    if (this.dialogService) {
      this.dialogService.error('Error en el link', 'El link no existe o no es válido');
    }
  }

  getRowClass(rowData: any): string {
    const today = new Date();
    const sessionDate = new Date(rowData.session_date);
    if (isNaN(sessionDate.getTime())) {
      console.error('Invalid date format:', rowData.session_date);
      return '';
    }
    if (sessionDate.toDateString() === today.toDateString()) {
      return 'highlight-today';
    }
    return '';
  }

  sessionFilters: Expression | null = null;

  onComboChange(selectedStatuses: string[]): void {
    if (selectedStatuses.length === 0) {
      this.sessionFilters = null;
    } else {
      const filter = [{ attr: 'status', value: selectedStatuses }];
      this.table.queryData(filter);
    }
  }

  createFilter(values: Array<{ attr: string, value: any }>): Expression {
    const filters: Array<Expression> = [];

    values.forEach(fil => {
      if (fil.value) {
        if (fil.attr === 'status') {
          if (Array.isArray(fil.value) && fil.value.length > 0) {
            const statusFilters = fil.value.map(status =>
              FilterExpressionUtils.buildExpressionEquals(fil.attr, status)
            );
            filters.push(statusFilters.reduce((exp1, exp2) =>
              FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_OR)
            ));
          } else {
            filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
          }
        }
      }
    });

    return filters.length > 0
      ? filters.reduce((exp1, exp2) =>
          FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND))
      : null;
  }

  toggleFinished(event: MatSlideToggleChange): void {
    if (event.checked) {
      this.selectedStatuses = ['Started', 'Pending', 'Finished'];
    } else {
      this.selectedStatuses = ['Started', 'Pending'];
    }
  }
}
