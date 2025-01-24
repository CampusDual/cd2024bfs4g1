import { Component, Injector, ViewChild } from '@angular/core';
import { DialogService, OButtonComponent, OFileInputComponent, OFormComponent, OImageComponent, OListComponent, OntimizeService, OTableButtonComponent, OTableComponent, OTextareaInputComponent, OTextInputComponent, OValidators } from 'ontimize-web-ngx';
import { ODateInputComponent } from 'ontimize-web-ngx';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import spainComunitys from 'src/app/main/students/spaincomunitys';
import EventEmitter from 'events';
import { ActivatedRoute } from '@angular/router';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ViewChildren, QueryList } from '@angular/core';
import { OTranslateService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.css']
})
export class StudentsDetailComponent {
notesLoaded(event: any) {

  this.notesBool = event && event.length > 0;
}
  @ViewChild("idNumber") idNumber: OTextInputComponent;
  @ViewChild("documentsTable") documentsTable: OTableComponent;
  @ViewChild("fileinput") fileinput: OFileInputComponent;
  @ViewChild("UsrPhoto") UsrPhoto: OImageComponent;
  @ViewChild("form") form: OFormComponent;
  @ViewChild("bootcampsStudentTable") bootcampTable: OTableComponent;
  @ViewChildren(MatTab) tabs!: QueryList<MatTab>;
  @ViewChild('deleteButtton', {static: false}) deleteButtton: OTableButtonComponent;

  selected = false;
  isUpdatingImage: boolean = false;
  isUpdateOtherFile: boolean = false;
  validatorsArray: ValidatorFn[] = [];
  validatorsArray1: ValidatorFn[] = [];
  validatorsNewPasswordArray: ValidatorFn[] = [];
  validatorsWithoutSpace: ValidatorFn[] = [];
  dataArray = spainComunitys.map(comunity => ({ key: comunity, value: comunity }));
  protected service: OntimizeService;
  showNotice:boolean=false;
  notesBool: boolean = false;
  isNoteAreaValid: boolean = false;
  flagEnabled: boolean = false;

  // Valor predeterminado (opcional)
  valueSimple = "Madrid"; // Elige el valor que deseas predeterminar

  onDataLoaded(): boolean {
    return this.notesBool;
  }
  constructor(
    private router: Router,
    public location: Location,
    public injector: Injector,
    protected dialogService: DialogService,
    private route: ActivatedRoute,
    private traductor : OTranslateService
  ) {
    this.validatorsArray.push(this.dateValidator);
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/\d/, 'hasNumber'));
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/[A-Z]/, 'hasCapitalCase'));
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/[a-z]/, 'hasSmallCase'));
    this.validatorsWithoutSpace.push(OValidators.patternValidator(/^(?!\s*$).+/, 'hasSpecialCharacters'));
    this.service = this.injector.get(OntimizeService);
  }

  protected configureServiceDocuments() {
    const conf = this.service.getDefaultServiceConfiguration('documents');
    this.service.configureService(conf);
  }
protected configureServiceStudent() {
    const conf = this.service.getDefaultServiceConfiguration('students');
    this.service.configureService(conf);
  }

  protected configureServiceStudentBootcamp() {
    const conf = this.service.getDefaultServiceConfiguration('studentBootcamps');
    this.service.configureService(conf);
  }

  dateValidator(control: FormControl): ValidationErrors {
    let result = {};

    if (control && control.parent && control.value) {
      let enddate = control.value.valueOf();
      let startdate = control.parent.value.fct_start;

      if (enddate && startdate && enddate < startdate) {
        result['wrongendate'] = true;
      }
    }

    return result;
  }


  throwChange(enddate: ODateInputComponent) {
    enddate.getControl().updateValueAndValidity();
  }
  throwChange2(startdate: ODateInputComponent) {
    startdate.getControl().updateValueAndValidity();
  }
  todayDate: string = '';
  todayTimestamp: number = 0;
  @ViewChild('notesForm') notesForm: OFormComponent;
  @ViewChild('noteDate') noteDate: ODateInputComponent;
  @ViewChild('noteArea') noteArea: OTextareaInputComponent;




  ngAfterViewInit() {
    if (this.noteDate) {
      this.noteDate.setValue(this.todayTimestamp);
      console.log("TiSt"+this.todayTimestamp);
      console.log("Date: "+ this.noteDate.getValue().toString());
    }
    this.deleteButtton.onClick.subscribe(event => {
      this.deleteStudentbootcamp();
    });
  }
  @ViewChild("studentIdNote") studentIdNote: OTextInputComponent;

  setIdStudent(event: any) {
    this.studentIdNote.setValue(this.idNumber.getValue());

  }

  mostrarBoton: boolean = true;
  selectedTabIndex: number = 0;

  ngOnInit() {
    this.mostrarBoton = /\d+$/.test(this.router.url);
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    this.todayDate = `${day}/${month}/${year}`;


    const [dd, mm, yyyy] = this.todayDate.split('/').map(Number);
    const parsedDate = new Date(yyyy, mm - 1, dd);
    this.todayTimestamp = parsedDate.getTime();

    const source = this.route.snapshot.queryParamMap.get('source');
    if (source === 'commercial') {
      setTimeout(() => this.setTabIndexByName('LCOMMENTS'), 0);
    }
  }

  setTabIndexByName(tabName: string): void {
    const translatedName = this.traductor.get(tabName);
  console.log(`Traducción de "${tabName}": ${translatedName}`);

    const tabArray = this.tabs.toArray();
    const index = tabArray.findIndex(tab => tab.textLabel.trim() === translatedName);
    if (index !== -1) {
      this.selectedTabIndex = index;
    } else {
      console.warn(`No se encontró la pestaña con el nombre '${translatedName}'`);
    }
  }

  toUpperCamelCase(event: any) {
    event.target.value = event.target.value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  toUpperCase(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

  getFileData() {
    if (this.idNumber) {
      return { student_id: this.idNumber.getValue() };
    } else {
      return null;
    }
  }


  showMessage = false;

  onUploadFiles(event) {
    this.documentsTable.refresh();
    this.fileinput.clearValue();

    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

  onFileUpload() {

  }

  onError(event) {

    if (event.status === 507) {
      this.showError("event");
    }

  }
  showError(event: any) {
    console.log(event);
  }
  // Método para manejar el evento de clic en la acción
  actionClick(event) {

    this.configureServiceDocuments();
    // Se realiza una consulta al servicio personalDocumentService para obtener los datos del archivo correspondiente al evento de clic.
    this.service.query({ id: event.id }, ['name', 'base64'], 'myPersonalFilesContent').subscribe(res => {
      if (res.data && res.data.length) {
        // Si se encuentran datos, se extrae el nombre del archivo y el contenido en base64.
        let filename = res.data[0].name;
        let base64 = res.data[0].base64;
        // Se crea un enlace temporal para descargar el archivo.
        const src = `data:text/csv;base64,${base64}`;
        const link = document.createElement("a");
        link.href = src;
        link.download = filename;
        link.click();
        link.remove();
      }
    });

  }
  refreshFileInput() {
    this.fileinput.clearValue();
  }
  mostrar(event: any) {


    this.getDNI(event.srcElement.value);

  }

  getDNI(dni:string) {

    this.configureServiceStudent();
    const filter = {
      'dni': dni
    };
    const columns = ['id'];
    this.service.query(filter, columns, 'student').subscribe(resp => {
      if (resp.code === 0){
        this.showNotice=true;
        if(resp.data.length>1){
          this.showNotice=true;

        }else if(resp.data.length==1){
          let idStudent=this.idNumber.getValue();
          let idQueryStudent= resp.data[0].id;
          if(idStudent==idQueryStudent){
            this.showNotice=false;
          }else{
            this.showNotice=true;
          }
        }else{
          this.showNotice=false;
        }
      } else {
        this.showNotice=false;
      }
    });
}
onImageChange(event: any) {
  // Si no hay evento o el archivo no está definido, simplemente retorna
  if (!event || !this.UsrPhoto.currentFileName) {
    return;
  }

  if (this.isUpdatingImage) {
    return;
  }

  const base64String = event;
  const currentFileName = this.UsrPhoto.currentFileName || '';

  const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const fileExtension = currentFileName.split('.').pop()?.toLowerCase();

  // Validar si el nombre del archivo o la extensión son inválidos
  if (!fileExtension || !validExtensions.includes(fileExtension)) {
    this.showAlert(); // Muestra la alerta de error
    this.isUpdatingImage = true;
    this.UsrPhoto.setValue(''); // Limpia el valor del archivo
    this.isUpdatingImage = false;
    return;
  }

  if (base64String) {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    img.src = `data:image/jpg;base64, ${base64String}`;

    img.onload = () => {
      if (ctx) {
        const newWidth = 200;
        const newHeight = 200;

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        const modifiedImageBase64 = canvas.toDataURL('image/jpg');

        this.isUpdatingImage = true;
        this.UsrPhoto.setValue(modifiedImageBase64); // Actualiza la imagen redimensionada
        this.isUpdatingImage = false;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
      }
    };

    img.onerror = () => {
      console.error('Error al cargar la imagen.');
    };
  }
}
showAlert() {
  if (this.dialogService) {
    this.dialogService.error('Error de tipo de archivo', 'Por favor, sube una imagen con extensión .jpg, .jpeg .png o .gif');
  }
}
isRefreshing: boolean = false;
refreshEmploymentStatus() {
  if (this.isRefreshing) {
    return;
  }
  this.isRefreshing = true;
  this.form.queryData({ id: this.idNumber.getValue() });
  setTimeout(() => {
    this.isRefreshing = false;
  }, 500);
}
protected configureBootcamps() {
  const conf = this.service.getDefaultServiceConfiguration('bootcamps');
  this.service.configureService(conf);

}
protected configureNotes() {
  const conf = this.service.getDefaultServiceConfiguration('notes');
  this.service.configureService(conf);

}
@ViewChild("list") list: OListComponent;

InsertNotes() {
    if (!this.isNoteAreaValid) {
      return; // Salimos si el área de texto no tiene contenido válido
    }

    const sqlTypes = {fecha:91,student_id:4};
    let idStudent : Number = this.idNumber.getValue();
    const keys ={
      id_students: idStudent,
      nota: this.noteArea.getValue(),
      fecha:this.noteDate.getValue()
    }

    this.configureNotes();
    this.service.insert(keys,'notes',sqlTypes).subscribe(res => {
      if (res.code === 0) {
        this.noteArea.setValue('');
        this.isNoteAreaValid = false;
        this.list.reloadData();
      }
    });
  }

deleteNotes(notas: any) {

  this.configureNotes();
  this.dialogService.confirm('Confirm_dialog_title', 'Do_you_really_want_to_delete');
  this.dialogService.dialogRef.afterClosed().subscribe( result => {
    if(result) {
      this.service.delete({id: notas.id}, 'notes').subscribe(res => {
        if (res.code === 0) {
          this.list.reloadData();
        }
      });
    }
  });

 }

refreshwarning(){
  this.showNotice = false;
}

onNoteAreaChange(noteArea: OTextareaInputComponent): void {
  const noteValue = noteArea.getValue() || ''; // Obtén el valor del campo, o una cadena vacía si es null/undefined
  // Verifica si hay al menos un carácter no espacio/salto de línea
  const hasValidContent = /\S/.test(noteValue);
  this.isNoteAreaValid = hasValidContent;
}

deleteStudentbootcamp(){
  this.dialogService.confirm('Confirm_dialog_title','Do_you_really_want_to_delete_student_bootcamp');
  this.dialogService.dialogRef.afterClosed().subscribe( result => {
    if(result) {
      this.configureServiceStudentBootcamp();
      this.service.delete({id: this.bootcampTable.getSelectedItems()[0].id}, 'studentsWithBootcamp').subscribe(res => {
        if (res.code === 0) {
          this.bootcampTable.reloadData();
        }
      });
    }
  });

  this.configureServiceStudent();
}

activeDelete(){
  this.flagEnabled = true;
}

desactiveButton(){
  this.flagEnabled = false;
}

}
