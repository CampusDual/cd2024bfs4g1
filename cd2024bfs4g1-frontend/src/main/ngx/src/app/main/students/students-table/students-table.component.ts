import { Component, ViewChild } from '@angular/core';
import { FilterExpressionUtils, Expression, OFormComponent, OFormLayoutManagerComponent, OTableComponent } from 'ontimize-web-ngx';
import spainComunitys from 'src/app/main/students/spaincomunitys';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

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

  // Valor predeterminado (opcional)
  valueSimple = "Madrid";

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      const tab = params['tab'];
      const studentId = params['studentId'];
      if (studentId) {
        this.detailId = studentId;
      }
    });
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
}



