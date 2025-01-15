import { Router } from '@angular/router';
import { AppearanceService, OntimizeService, OUserInfoService } from 'ontimize-web-ngx';
import { Component, OnInit, Injector, ViewChild, Inject } from '@angular/core';
import { OntimizeMatIconRegistry } from 'ontimize-web-ngx';
import { MainService } from './shared/services/main.service';

@Component({
  selector: 'o-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected service: OntimizeService;
  ontimizeMatIconRegistry: OntimizeMatIconRegistry;
  iniciliced = 0;
  constructor(private router: Router, protected appearanceService: AppearanceService,protected injector: Injector, 
    private oUserInfoService:OUserInfoService,
    private mainService: MainService) {
      this.service = this.injector.get(OntimizeService)
    this.ontimizeMatIconRegistry = this.injector.get(OntimizeMatIconRegistry);
    if(window['__ontimize'] !== undefined && window['__ontimize']['redirect'] !== undefined) {
      let redirectTo = window['__ontimize']['redirect'];
      window['__ontimize']['redirect'] = undefined;
      this.router.navigate([redirectTo]);
    }
  }
  ngOnInit() {
    if (this.ontimizeMatIconRegistry.addOntimizeSvgIcon) {
      this.ontimizeMatIconRegistry.addOntimizeSvgIcon('nodo', 'assets/images/faviconNS-AZUL.svg');
    }
    if (this.ontimizeMatIconRegistry.addOntimizeSvgIcon) {
      this.ontimizeMatIconRegistry.addOntimizeSvgIcon('warning', 'assets/icons/warning.svg');
    }
    if (this.ontimizeMatIconRegistry.addOntimizeSvgIcon) {
      this.ontimizeMatIconRegistry.addOntimizeSvgIcon('papelera', 'assets/icons/papelera.svg');
    }
    if (this.ontimizeMatIconRegistry.addOntimizeSvgIcon) {
      this.ontimizeMatIconRegistry.addOntimizeSvgIcon('papelera1', 'assets/icons/papelerareciclaje.svg');
    }
  }

 updateAvatar(){
  this.mainService.getUserInfo().subscribe(result=>{
    this.oUserInfoService.setUserInfo({
      username: result.data['usr_login'],
      avatar: "data:image/png;base64,"+result.data['usr_photo']
   });
   });
 }
  ngAfterViewInit(){
    setTimeout(()=>this.updateAvatar(),1000);
    setTimeout(()=>this.updateAvatar(),5000);
 
}
}
