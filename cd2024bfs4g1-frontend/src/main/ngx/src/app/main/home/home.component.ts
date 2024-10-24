import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ODateInputComponent, OntimizeService, OTextInputComponent } from 'ontimize-web-ngx';
let initialDate: Date=new Date();
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("startdate") startDateInput: ODateInputComponent;
  @ViewChild("enddate") endDateInput: ODateInputComponent;
  protected service: OntimizeService;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    protected injector: Injector
  ) {
    this.service = this.injector.get(OntimizeService);
    this.configureService();
  }

  ngOnInit() {
  }

  protected configureService() {
    const conf = this.service.getDefaultServiceConfiguration('bootcamps');
    this.service.configureService(conf);
  }

  onBootcampChange(event: any) {
      const bootcampId = event.newValue;
      const filter = { id: bootcampId }; 

      this.service.query(filter, ['id', 'start_date', 'end_date'], 'bootcamp').subscribe(resp => {
        if (resp.code === 0 && resp.data.length > 0) {
          const bootcamp = resp.data[0]; 
          this.startDateInput.setValue(new Date(bootcamp.start_date));
          this.endDateInput.setValue(new Date(bootcamp.end_date));
        } else {
          alert('No se encontraron datos para este bootcamp.');
        }
      });
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate: Date, view) => {
    let date: Date = new Date(cellDate);
    if (view === 'month') {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      if ((day === 1 && month === 1 && year === 2022) || 
          (day === 20 && month === 4 && year === 2022)) {
        return 'miestilo';
      }
    }

    return '';
  };

  navigate() {
    this.router.navigate(['../', 'login'], { relativeTo: this.actRoute });
  }



}
