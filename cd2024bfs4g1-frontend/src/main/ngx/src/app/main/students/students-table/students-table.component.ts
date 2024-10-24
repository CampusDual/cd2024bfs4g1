import { Component} from '@angular/core';
import { FilterExpressionUtils, Expression, OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent {

  form!: OFormComponent;

  createFilter(values: Array<{ attr: string, value: any }>): Expression {
    let filters: Array<Expression> = [];

    values.forEach(fil => {
      if (fil.value) {
        if (fil.attr === 'name' || fil.attr === 'surname1' || fil.attr === 'surname2' || fil.attr === 'tutor' || fil.attr === 'udemy' || fil.attr === 'employment_status') {
          filters.push(FilterExpressionUtils.buildExpressionLike(fil.attr, fil.value));
        }
        if (fil.attr === 'id') {
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
        }
      }
    });

    if (filters.length > 0) {
      if (this.form.formGroup.value.slidertoggle) {
        return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_OR));
      } else {
        return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND));
      }
    } else {
      return null;
    }
  }
}


