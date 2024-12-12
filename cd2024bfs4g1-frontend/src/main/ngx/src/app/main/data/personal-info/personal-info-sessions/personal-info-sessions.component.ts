import { Component, ViewChild } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DialogService, Expression, FilterExpressionUtils, OTableComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-personal-info-sessions',
  templateUrl: './personal-info-sessions.component.html',
  styleUrls: ['./personal-info-sessions.component.css']
})
export class PersonalInfoSessionsComponent {

  @ViewChild('sessionsTable', { static: true }) table: OTableComponent;
  selectedStatuses: string[] = ['Started', 'Pending'];
  constructor(
    protected dialogService: DialogService
   ) {
  }

  openLink(event: any): void {
    const link = event?.link;

    if (!link) {
      this.showAlert()
      return;
    }
    window.open(link, '_blank');
  }

  showAlert() {
    if (this.dialogService) {
      this.dialogService.error('Error en el link', 'El link no existe o  no es válido');
    }
  }



    getRowClass(rowData: any): string {
      const today = new Date();
      const sessionDate = new Date(rowData.session_date);
      if (isNaN(sessionDate.getTime())) {
        console.error('Invalid date format:', rowData.session_date);
        return '';
      }
      if (sessionDate.toDateString() === today.toDateString()) {
        return 'highlight-today';
      }
      return '';
    }

  sessionFilters: Expression | null = null;

  onComboChange(selectedStatuses: string[]): void {
    if (selectedStatuses.length === 0) {
      this.sessionFilters = null;
    } else {
      const filter = [{ attr: 'status', value: selectedStatuses }];
      this.table.queryData(filter);
    }
  }
  createFilter(values: Array<{ attr: string, value: any }>): Expression {
    const filters: Array<Expression> = [];

    values.forEach(fil => {
      if (fil.value) {
        if (fil.attr === 'status') {
          if (Array.isArray(fil.value) && fil.value.length > 0) {
            const statusFilters = fil.value.map(status =>
              FilterExpressionUtils.buildExpressionEquals(fil.attr, status)
            );
            filters.push(statusFilters.reduce((exp1, exp2) =>
              FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_OR)
            ));
          } else {
            filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
          }
        }
      }
    });

    return filters.length > 0
      ? filters.reduce((exp1, exp2) =>
          FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND))
      : null;
  }


  toggleFinished(event: MatSlideToggleChange): void {
    if (event.checked) {
      this.selectedStatuses = ['Started', 'Pending', 'Finished'];
    } else {
      this.selectedStatuses = ['Started', 'Pending'];
    }
  }
}
