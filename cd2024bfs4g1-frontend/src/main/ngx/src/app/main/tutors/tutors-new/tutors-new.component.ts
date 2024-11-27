import { Component, ViewChild } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService, OImageComponent, OValidators } from 'ontimize-web-ngx';

@Component({
  selector: 'app-tutors-new',
  templateUrl: './tutors-new.component.html',
  styleUrls: ['./tutors-new.component.css']
})
export class TutorsNewComponent {

  validatorsWithoutSpace: ValidatorFn[] = [];
  isUpdatingImage: boolean = false;
  isUpdateOtherFile: boolean = false;

  @ViewChild("tutorsPhoto") tutorsPhoto: OImageComponent;

  constructor(protected dialogService: DialogService, private router: Router) {
    this.validatorsWithoutSpace.push(OValidators.patternValidator(/^(?!\s*$).+/, 'hasSpecialCharacters'));
  }

  volver(e) {
    this.router.navigate(['./main/bootcamps']);
  }

  toUpperCamelCase(event: any) {
    event.target.value = event.target.value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  onImageChange(event: any) {

    if(event){
    if (this.isUpdatingImage) {
      return;
    }
    
    const base64String = event;
    const currentFileName = this.tutorsPhoto.currentFileName; 

  
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif']; 
  const fileExtension = currentFileName.split('.').pop()?.toLowerCase();

  if (!validExtensions.includes(fileExtension)) {
    
    this.showAlert();
    
    this.isUpdatingImage = true; 
    this.tutorsPhoto.setValue(''); 
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
          this.tutorsPhoto.setValue(modifiedImageBase64);
          this.isUpdatingImage = false;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };

      img.onerror = () => {
        console.error('Error al cargar la imagen.');
      };
    }
  }
  }

  showAlert() {
    if (this.dialogService) {
      this.dialogService.error('Error de tipo de archivo', 'Por favor, sube una imagen con extensión .jpg, .jpeg .png o .gif');
    }
  }
}
