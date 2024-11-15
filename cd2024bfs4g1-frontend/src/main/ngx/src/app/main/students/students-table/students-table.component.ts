import { Component} from '@angular/core';
import { FilterExpressionUtils, Expression, OFormComponent } from 'ontimize-web-ngx';
import spainComunitys from 'src/app/main/students/spaincomunitys';


@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent {

  form!: OFormComponent;

  dataArray = spainComunitys.map(comunity => ({ key: comunity, value: comunity }));

  // Valor predeterminado (opcional)
  valueSimple = "Madrid"; // Elige el valor que deseas predeterminar
  createFilter(values: Array<{ attr: string, value: any }>): Expression {
    let filters: Array<Expression> = [];

    values.forEach(fil => {
      if (fil.value) {
        if ( fil.attr === 'tutor' ||  fil.attr === 'udemy' || 
          fil.attr === 'employment_status'|| fil.attr==='status'|| fil.attr==='spain_comunity') {
          filters.push(FilterExpressionUtils.buildExpressionLike(fil.attr, fil.value));
        }
        if (fil.attr === 'id') {
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
        }
      }
    });

    if (filters.length > 0) {
        return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND));
    } else {
      return null;
    }
  }
}
