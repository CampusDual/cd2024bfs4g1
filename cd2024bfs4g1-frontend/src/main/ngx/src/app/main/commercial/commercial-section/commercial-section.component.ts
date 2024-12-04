import { Component, ViewChild } from '@angular/core';
import { FilterExpressionUtils, Expression, OFormComponent, OFormLayoutManagerComponent, OTableComponent } from 'ontimize-web-ngx';
import spainComunitys from 'src/app/main/students/spaincomunitys';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-commercial-section',
  templateUrl: './commercial-section.component.html',
  styleUrls: ['./commercial-section.component.css']
})
export class CommercialSectionComponent {


  @ViewChild('tableStudents') tableComponent: OTableComponent;
  form!: OFormComponent;
  detailId !: Number;

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

  // Método para construir el filtro (sin cambios)
  createFilter(values: Array<{ attr: string, value: any }>): Expression | null {
    const filters: Array<Expression> = values
      .filter(fil => fil.value != null && fil.value.toString().trim() !== '') // Filtra valores no nulos ni vacíos
      .map(fil => {
        const filterValue = fil.value.toString().trim();
        switch (fil.attr) {
          case 'bootcamp':
          case 'student_status_id':
            return FilterExpressionUtils.buildExpressionLike(fil.attr, filterValue);
          case 'id':
            return FilterExpressionUtils.buildExpressionEquals(fil.attr, filterValue);
          default:
            return null;
        }
      })
      .filter((expr): expr is Expression => expr !== null); // Elimina posibles nulos del mapeo

    // Si hay filtros, combina usando AND, si no devuelve null.
    return filters.length > 0
      ? filters.reduce((exp1, exp2) =>
          FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND)
        )
      : null;
  }
}
