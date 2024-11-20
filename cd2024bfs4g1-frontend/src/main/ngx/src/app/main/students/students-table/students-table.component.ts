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
      // Convierte fil.value a una cadena, o a una cadena vacía si es null o undefined

      // Convierte fil.value a una cadena, o a una cadena vacía si es null o undefined
      const filterValue = fil.value != null ? fil.value.toString() : '';

      if (filterValue) {  // Solo agrega el filtro si filterValue no está vacío
        if (fil.attr === 'tutor' || fil.attr === 'udemy' ||
            fil.attr === 'employment_status_id' || fil.attr === 'student_status_id' || fil.attr === 'spain_comunity') {
          filters.push(FilterExpressionUtils.buildExpressionLike(fil.attr, filterValue));
        }
        if (fil.attr === 'id') {
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, filterValue));
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
