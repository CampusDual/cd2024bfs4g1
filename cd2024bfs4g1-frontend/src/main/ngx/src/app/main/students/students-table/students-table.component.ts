import { Component, Injector, ViewChild } from '@angular/core';
import { FilterExpressionUtils, Expression, OFormComponent, OTableComponent, OntimizeService, DialogService, OTranslateService } from 'ontimize-web-ngx';
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
  serviceBootcamp : OntimizeService
  serviceStudentBootcamp : OntimizeService

  // Valor predeterminado (opcional)
  valueSimple = "Galicia";


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
  protected configureServiceBootcamp() {

     const confBootcamp = this.service.getDefaultServiceConfiguration('bootcamps');
     this.service.configureService(confBootcamp);


  }  

  goToDetail() {
    if (this.detailId) {
      this.tableComponent.viewDetail({ id: this.detailId });

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
    const EXPECTED_HEADERS = [
      'name', 'surname1', 'personal_email', 'dni', 'surname2',
      'birth_date', 'phone', 'campus_email', 'spain_comunity', 'location','codigo'
    ];
  
    const lines = csvData.split('\n');
    const headers = lines[0]?.trim().split(',');
  
    if (!this.areHeadersValid(headers, EXPECTED_HEADERS)) {
      this.snackBar.open(
        this.translateService.get("ERROR_CSV"),
        '',
        { duration: 3500, panelClass: 'notification-error' }
      );
      return [];
    }
  
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
  
  areHeadersValid(headers: string[], expectedHeaders: string[]): boolean {
    if (headers.length !== expectedHeaders.length) {
      return false;
    }
    return headers.every((header, index) => header.trim() === expectedHeaders[index]);
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
    if (data.length === 0) {
      return;
    }
  
    const filter = { students: data };
    const filter2 = { students: data };
  
    const columns2 = ['codigo', 'name'];
    let resultadoBootcamps: any[] = [];
    let Bootcamps: string[] = [];
    let repeatedDnis: string[] = [];
    let erroresConcatenados: string = '';

    this.configureServiceBootcamp();
    this.service.query(filter2, columns2, 'bootcampCheck').subscribe(resp => {
      resultadoBootcamps = resp.data;
  
      if (resultadoBootcamps && resultadoBootcamps.length > 0) {
        resultadoBootcamps.forEach((bootcamp: any) => {
          if (bootcamp.error) {
            Bootcamps.push(
              this.translateService.get("BOOTCAMP_CODE") + 
              `(${bootcamp.codigo}) ` + 
              this.translateService.get(bootcamp.error)
            );
          }
        });
      }
  

      this.configureService();
      this.service.query(filter, [], 'studentMultipleCheck').subscribe(resp => {
        const resultado = resp.data;
  
        if (resultado && resultado.length > 0) {
          resultado.forEach((errorObj: any) => {
            if (errorObj.errors) {
              erroresConcatenados += errorObj.errors + "\n";
            }
            if (errorObj.dni) {
              repeatedDnis.push(errorObj.dni);
            }
          });
        }

        if (erroresConcatenados) {
          let paraps = '';
          erroresConcatenados.split('\n').forEach(error => {
            if (error.indexOf(":") > -1) {
              const [code, value] = error.split(':');
              const translate = this.translateService.get(code);
              paraps += `<p>${translate}: ${JSON.stringify(value)}</p>`;
            } else {
              paraps += `<p>${error}</p>`;
            }
          });
  
          this.dialogService.error(
            this.translateService.get('ERROR'),
            `
              <p>${this.translateService.get("CSV_HELP_TEXT")}</p>
              <p><strong>${this.translateService.get("CSV_ERRORS")}</strong></p>
              <div style="text-align: left;">${paraps}</div>
            `
          );
          this.snackBar.open(
            this.translateService.get('IMPORT_CANCELLED'),
            '',
            { duration: 3500, panelClass: 'notification-error' }
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
                this.proceedWithBootcampValidation(filter, Bootcamps);
              } else {
                this.cancelImport();
              }
            })
            .catch(() => this.cancelImport());
        } else {
          this.proceedWithBootcampValidation(filter, Bootcamps);
        }
      });
    });
  }
  
  private proceedWithBootcampValidation(filter: any, Bootcamps: string[]) {
    if (Bootcamps.length > 0) {
      const messageBootcamps = `
        <div style="text-align: center;">
          <p>${this.translateService.get("BOOTCAMPS_NOTFOUND")}</p>
          <p><strong>${Bootcamps.join("<br/>")}</strong></p>
          <p>${this.translateService.get("CONTINUE_ASK")}</p>
        </div>
      `;
  
      this.dialogService.confirm(this.translateService.get('WARNING'), messageBootcamps)
        .then((confirmed: boolean) => {
          if (confirmed) {
            this.insertStudents(filter);
          } else {
            this.cancelImport();
          }
        })
        .catch(() => this.cancelImport());
    } else {
      this.insertStudents(filter);
    }
  }
  
  private insertStudents(filter: any) {
    this.service.insert(filter, 'studentCsv').subscribe(() => {
      this.snackBar.open(
        this.translateService.get('STUDENTS_REGISTERED'),
        '',
        { duration: 3500, panelClass: 'notification-bg' }
      );
    });
  }
  
  private cancelImport() {
    this.snackBar.open(
      this.translateService.get('IMPORT_CANCELLED'),
      '',
      { duration: 3500, panelClass: 'notification-error' }
    );
  }
  
}  
  
  
  




