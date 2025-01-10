import { Component, Injector, ViewChild } from '@angular/core';
import { FilterExpressionUtils, Expression, OFormComponent, OFormLayoutManagerComponent, OTableComponent, OntimizeService, DialogService, OTranslateService } from 'ontimize-web-ngx';
import spainComunitys from 'src/app/main/students/spaincomunitys';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent {


  @ViewChild('tableStudents') tableComponent: OTableComponent;
  form!: OFormComponent;
  dataArray = spainComunitys.map(comunity => ({ key: comunity, value: comunity }));
  detailId !: Number;
  service : OntimizeService

  // Valor predeterminado (opcional)
  valueSimple = "Madrid";


  constructor(private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar , protected injector: Injector,  protected dialogService: DialogService, protected translateService : OTranslateService) {

    this.service = this.injector.get(OntimizeService);
  }

  ngOnInit() {

    this.configureService();
    this.route.queryParams.subscribe(params => {
      const tab = params['tab'];
      const studentId = params['studentId'];
      if (studentId) {
        this.detailId = studentId;
      }
    });
  }

  protected configureService() {
    const conf = this.service.getDefaultServiceConfiguration('students');
    this.service.configureService(conf);

  }

  goToDetail() {
    if (this.detailId) {
      this.tableComponent.viewDetail({ id: this.detailId });

    }


  }



  openStudentDetail(studentId: string) {
    console.log(`Abriendo detalle del estudiante con ID: ${studentId}`);


    const formLayoutManager = document.querySelector('o-form-layout-manager') as any;

    if (formLayoutManager) {
      formLayoutManager.openDetail({
        entity: 'student',
        keysValues: { id: studentId },



      });
    } else {
      console.error('No se pudo encontrar el o-form-layout-manager');
    }
  }

  checked: boolean = false;

  toggleFinished(event: MatSlideToggleChange): void {
    this.checked = event.checked;
    this.tableComponent.refresh();
  }

  createFilter(values: Array<{ attr: string, value: any }>): Expression {
    let filters: Array<Expression> = [];
    const isCheck = this.checked;
    values.forEach(fil => {
      const filterValue = fil.value != null ? fil.value.toString() : '';

      if (filterValue) {
        if (fil.attr === 'id' || fil.attr === 'tutor' || fil.attr === 'udemy' ||
          fil.attr === 'v_employment_status_id' || fil.attr === 'student_status_id' || fil.attr === 'spain_comunity') {
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, filterValue));
        }
        if (fil.attr === 'bootcamps_id') {
          filters.push(FilterExpressionUtils.buildExpressionLike(fil.attr, "|" + filterValue + "|"));
        }
      }
      if (isCheck === true) {
        filters.push(FilterExpressionUtils.buildExpressionMoreEqual("validos", 1));
      }
    });

    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) =>
        FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND)
      );
    } else {
      return null;
    }
  }

  onImportCsv(): void {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.csv';
    inputElement.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.processCsvFile(file);
      }
    });
    inputElement.click();
  }
  processCsvFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const csvData = event.target.result;
      const parsedData = this.parseCsv(csvData);
      this.validateAndUploadData(parsedData);
    };
    reader.readAsText(file);
  }
  parseCsv(csvData: string): any[] {
    const lines = csvData.split('\n');
    const headers = lines[0].trim().split(',');

    const data: any[] = lines.slice(1)
      .filter(line => line.trim() !== '')
      .map(line => {
        const values = line.split(',');
        const row: any = {};
        headers.forEach((header, index) => {
          row[header.trim()] = values[index]?.trim();
        });
        return row;
      });

    return data;
  }

  validateAndUploadData(data: any[]): void {
    const REQUIRED_FIELDS = ['name', 'surname1', 'personal_email'];
    const invalidRows = data.filter(row =>
      REQUIRED_FIELDS.some(field => !row[field])
    );

    if (invalidRows.length > 0) {
      this.showValidationError(invalidRows);
      return;
    }
    this.insertCsv(data);
   
  }

  showValidationError(errors: any[]): void {
    this.dialogService.error(
      this.translateService.get('ERROR'),
      `
        <p>${this.translateService.get("ERROR_CSV")}</p>
      `
    );
  
    this.snackBar.open(
      this.translateService.get('IMPORT_CANCELLED'),
      '', 
      { duration: 3500, panelClass: 'notification-error' }
    );
  }
  
  


  insertCsv(data: any) {
    const filter = {
      students: data
    };
    const columns = [];
    let resultado: any[] = [];
    let repeatedDnis: string[] = [];
    let erroresConcatenados: string = '';
  
    this.service.query(filter, columns, 'studentMultipleCheck').subscribe(resp => {
      resultado = resp.data;
  

      if (resultado && resultado.length > 0) {
        resultado.forEach((errorObj: any) => {
          if (errorObj.errors) {
            erroresConcatenados += errorObj.errors + "\n";
          }
        });
      }
  
    
      if (resultado && resultado.length > 0) {
        resultado.forEach((student: any) => {
          if (student.dni) {
            repeatedDnis.push(student.dni);
          }
        });
      }
  
 
      if (erroresConcatenados) {

        let paraps = "";

        erroresConcatenados.split('\n').map(error => {
          if (error.indexOf(":")>-1){
            let code = error.split(':')[0];
            let value = JSON.stringify(error.split(':')[1]);
            let translate = this.translateService.get(code);
            let message = translate + ":"+ value;
            paraps +=`<p>${message}</p>`; 
          }else{
            paraps +=`<p>${error}</p>`; 
          }
        });

        this.dialogService.error(
          this.translateService.get('ERROR'),
          `
            <p>${this.translateService.get("CSV_HELP_TEXT")}</strong></p>
            <p><strong>${this.translateService.get("CSV_ERRORS")}</strong></p>
            <div style="text-align: left;">
              ${paraps} 
            </div>
          `
        );
        
        this.snackBar.open(
          this.translateService.get('IMPORT_CANCELLED'),
          '',
          { duration: 3600, panelClass: 'notification-error' }
        );
        
        return;
        
      }
  
   
      if (repeatedDnis.length > 0) {
        const message = `
          <div style="text-align: center;">
            <p>${this.translateService.get("DUPLICATE_DNIS_MESSAGE")}</p>
            <p><strong>${repeatedDnis.join(', ')}</strong></p>
            <p>${this.translateService.get("CONFIRM_DUPLICATE_DNIS")}</p>
          </div>
        `;
        
        this.dialogService.confirm(this.translateService.get('WARNING'), message)
          .then((confirmed: boolean) => {
            if (confirmed) {
              this.service.insert(filter, 'studentCsv').subscribe(resp => {
                this.snackBar.open(
                  this.translateService.get('STUDENTS_REGISTERED'), 
                  '', 
                  { duration: 3500, panelClass: 'notification-bg' }
                );
              });
            } else {
              this.snackBar.open(
                this.translateService.get('IMPORT_CANCELLED'), 
                '', 
                { duration: 3500, panelClass: 'notification-error' }
              );
            }
          })
          .catch((error) => {
            this.dialogService.error(
              this.translateService.get('ERROR'), 
              `
              <p>${this.translateService.get("CSV_UPDATE_ERROR")}</p>
              `
            );
            this.snackBar.open(
              this.translateService.get('IMPORT_CANCELLED'), 
              '', 
              { duration: 3500, panelClass: 'notification-error' }
            );
          });
        return; 
      }
      
 
      this.service.insert(filter, 'studentCsv').subscribe(resp => {
      });
      this.snackBar.open(
        this.translateService.get('STUDENTS_REGISTERED'), 
        '', 
        { duration: 3500, panelClass: 'notification-bg' }
      );
      
    });
  }
  
}
  
  
  




