import { Component, ViewChild } from '@angular/core';
import { FilterExpressionUtils, Expression, OFormComponent, OTableComponent } from 'ontimize-web-ngx';
import { ActivatedRoute, Router } from '@angular/router';
import commercialStatus from '../commercialstatus';

@Component({
  selector: 'app-commercial-section',
  templateUrl: './commercial-section.component.html',
  styleUrls: ['./commercial-section.component.css']
})
export class CommercialSectionComponent {


  @ViewChild('tableStudents') tableComponent: OTableComponent;
  form!: OFormComponent;
  dataArray = commercialStatus.map(status => ({ key: status, value: status }));
  detailId !: Number;



  constructor(private route: ActivatedRoute, private router: Router) { }


  goToDetail(event: any) {
    const studentId = event.row.id

    if (studentId) {
      console.log("ID del estudiante:", studentId);
      this.router.navigate([`/main/students/${studentId}`], { queryParams: { source: 'commercial', id: event.id } });
    } else {
      console.error("No se encontró el ID del estudiante.");
    }
  }

 
  createFilter(values: Array<{ attr: string, value: any }>): Expression | null {
    const filters: Array<Expression> = values
      .filter(fil => fil.value != null && fil.value.toString().trim() !== '') 
      .map(fil => {
        var filterValue = fil.value;

        if (!Array.isArray(filterValue)) {
          filterValue = filterValue.toString().trim();
        }

        switch (fil.attr) {
          case 'bootcamps_id':
            return FilterExpressionUtils.buildExpressionLike(fil.attr,"|"+filterValue+"|");
          case 'student_status_id':
            return FilterExpressionUtils.buildExpressionEquals(fil.attr, filterValue);
          case 'id':
            return FilterExpressionUtils.buildExpressionEquals(fil.attr, filterValue);
          default:
            return null;
        }
      })
      .filter((expr): expr is Expression => expr !== null); 

    return filters.length > 0
      ? filters.reduce((exp1, exp2) =>
          FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND)
        )
      : null;
  }
  
}
