import { Component } from '@angular/core';

import{FilterExpressionUtils, Expression} from 'ontimize-web-ngx';


@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent {

  createFilter(values: Array<{attr, value}>): Expression{
    let filters: Array<Expression> = [];
    values.forEach(fil => {
      if(fil.value){
        if(fil.attr === 'name' || fil.attr === 'surnames' || fil.attr === 'email'){
          filters.push(FilterExpressionUtils.buildExpressionLike(fil.attr, fil.value));
        }
        if(fil.attr === 'id'){
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
        }
      }
    });

    if(filters.length > 0){
      return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND));
    }else{
      return null;
    }
  }

}
