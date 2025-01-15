import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { OBaseTableCellRenderer } from 'ontimize-web-ngx';

@Component({
  selector: 'app-o-table-cell-renderer-link',
  templateUrl: './o-table-cell-renderer-link.component.html',
  styleUrls: ['./o-table-cell-renderer-link.component.css']
})
export class OTableCellRendererLinkComponent extends OBaseTableCellRenderer {
  @ViewChild('templateref', { read: TemplateRef }) public templateref: TemplateRef<any>;

  constructor(protected injector: Injector) {
    super(injector);
  }
}
