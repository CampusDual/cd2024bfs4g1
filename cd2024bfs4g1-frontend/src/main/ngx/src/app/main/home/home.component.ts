import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    this.dateClass.bind(this);
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
   let startDate:Date = this.startDateInput.getValue();
   let endDate:Date = this.endDateInput.getValue();
     if (view === "month"){
        if (startDate && endDate && date> startDate && date <endDate)
        {
          return "miestilo";
        }
     }


    return '';
  };

  navigate() {
    this.router.navigate(['../', 'login'], { relativeTo: this.actRoute });
  }



}
