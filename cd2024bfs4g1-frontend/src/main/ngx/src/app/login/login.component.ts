import { DomSanitizer } from '@angular/platform-browser';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, NavigationService, ServiceResponse, OUserInfoService } from 'ontimize-web-ngx';
import { Observable } from 'rxjs';
import { MainService } from '../shared/services/main.service';
import { UserInfoService } from '../shared/services/user-info.service';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup = new UntypedFormGroup({});
  public userCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);
  public pwdCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);

  public sessionExpired = false;
  private redirect = '/main';
  hidePassword = true; // Variable para controlar la visibilidad de la contraseña

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    @Inject(NavigationService) private navigationService: NavigationService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(MainService) private mainService: MainService,
    @Inject(OUserInfoService) private oUserInfoService: OUserInfoService,
    @Inject(UserInfoService) private userInfoService: UserInfoService,
    @Inject(DomSanitizer) private domSanitizer: DomSanitizer
  ) {
    const qParamObs: Observable<any> = this.actRoute.queryParams;
    qParamObs.subscribe(params => {
      if (params) {
        if (params['session-expired']) {
          this.sessionExpired = (params['session-expired'] === 'true');
        } else {
          if (params['redirect']) {
            this.redirect = params['redirect'];
          }
          this.sessionExpired = false;
        }
      }
    });
  }

  ngOnInit(): any {
    this.navigationService.setVisible(false);
    this.loginForm.addControl('username', this.userCtrl);
    this.loginForm.addControl('password', this.pwdCtrl);

    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.redirect]);
    } else {
      this.authService.clearSessionData();
    }
    if (this.isHolidaySeason()) {
      this.createSnow(1500); // Cantidad de Nieve
    }

  }

  public login() {
    const userName = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    if (userName && userName.length > 0 && password && password.length > 0) {
      const self = this;
      this.authService.login(userName, password)
        .subscribe(() => {
          self.sessionExpired = false;
          this.loadUserInfo();
          
        }, this.handleError);
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  private loadUserInfo() {
    this.mainService.getUserInfo()
      .subscribe(
        (result: ServiceResponse) => {
          this.userInfoService.storeUserInfo(result.data);
          let avatar = './assets/images/ontimize.png';

          if (result.data['usr_photo']) {
            (avatar as any) = ('data:image/*;base64,' + result.data['usr_photo']);
          }


         this.oUserInfoService.setUserInfo({
                 username: result.data['usr_name'],
                    avatar: avatar
                      });
          const userRole = result.data['rol_name'];
          this.redirectUserBasedOnRole(userRole);
        }
      );
  }

  private redirectUserBasedOnRole(role: string): void {
    let redirectRoute = this.redirect; 
    switch (role) {
      case 'admin':
        redirectRoute = '/main';
        break;
      case 'user':
        redirectRoute = '/main';
        break;
      case 'student':
        redirectRoute = '/main/data/student';
        break;
        case 'tutor':
        redirectRoute = '/main/data/tutor';
        break;
      default:
        redirectRoute = this.redirect; 
    }
    this.router.navigate([redirectRoute]);
  }

  private handleError(error) {
    switch (error.status) {
      case 401:
        console.error('Email or password is wrong.');
        break;
      default: break;
    }
  }

  private isHolidaySeason(): boolean {// Control de fechas de nieve
    const today = new Date();
    const start = new Date(today.getFullYear(), 11, 1); 
    const end = new Date(today.getFullYear() + 1, 0, 6); 
    return today >= start && today <= end;
  }

  private getRandomValue(max: number, min: number = 1): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private createSnow(density: number): void {
    const snowContainer = document.querySelector('.snow-container');

    for (let i = 0; i < density; i++) {
      const snowFlake = document.createElement('span');
      const horizontalPosition = `${this.getRandomValue(100)}%`;
      const fallDelay = `${this.getRandomValue(10)}s`;
      const fallDuration = `${this.getRandomValue(20, 5)}s`;
      const flakeSize = `${this.getRandomValue(7, 1)}px`;
      const flakeOpacity = Math.random().toFixed(2);

      snowFlake.classList.add('snow');
      snowFlake.style.opacity = flakeOpacity;
      snowFlake.style.width = flakeSize;
      snowFlake.style.height = flakeSize;
      snowFlake.style.animation = `fall ${fallDuration} ${fallDelay} linear infinite`;
      snowFlake.style.right = horizontalPosition;

      snowContainer?.appendChild(snowFlake);
    }
  }
}
