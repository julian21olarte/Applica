import { User } from 'src/shared/interfaces/user.interface';
import {AuthProvider} from "../../providers/auth";
import { AppAvailability } from '@ionic-native/app-availability';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public email: string;
  public password: string;
  public isLogin: boolean;
  public authOptions: Array<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public appAvailability: AppAvailability,
    public platform: Platform,
    public toastCtrl: ToastController,
    public loading: LoadingController) {
      this.email = '';
      this.password = '';
      this.isLogin = this.navParams.get('isLogin')
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public handleLogin() {
      if( !this.email || !this.password) {
        this.createToast('Datos invalidos!');
        return false;
      }
      let load = this.loading.create({
        content: 'Cargando...',
        duration: 2000
      });
      load.present();
      load.onDidDismiss(() => {
        if(this.isLogin) {
          this.login()
        } else {
          this.authProvider.signup(this.email, this.password)
          .then(response => {
            return this.login();
          })
          .catch(err => {
            this.createToast('No se pudo iniciar sesion, intentelo mas tarde');
            return false;
          });
        }
      });
  }

  private login() {
    this.authProvider.emailLogin(this.email, this.password)
    .then(user => {
      this.loginHandler(user);
    })
    .catch(err => {
      this.createToast('No se pudo iniciar sesion, intentelo mas tarde');
      return false;
    });
  }
  private createToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000
    }).present();
  }

  private loginHandler(user) {
    if(user) {
      console.log(user);
      let page = (user.status <= 1) // status <= 1 means user not already compete the profile data
        ? 'PersonalDataPage'
        : 'HomePage';
      this.navCtrl.setRoot(page);
    } else {
      alert('error en la autenticacion');
    }
  }
}
