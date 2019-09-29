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
  public load: any;
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

  public async handleLogin() {
      if( !this.email || !this.password) {
        this.createToast('Datos invalidos!');
        return false;
      }
      if(this.password.length < 8) {
        this.createToast('Ingresa una contraseña con al menos 8 carácteres!', 4000);
        return false;
      }
      this.load = this.loading.create({
        content: 'Cargando...'
      });
      this.load.present();

      try {
        if(!this.isLogin) {
          await this.authProvider.signup(this.email, this.password)
        }

        await this.login();
      } catch(e) {
        this.createToast('No se pudo iniciar sesion, intentelo mas tarde');
      }
  }

  private async login() {
    try {
      let user = await this.authProvider.emailLogin(this.email, this.password)
      this.load.dismiss();
      if(!this.isLogin) {
        alert('Registro exitoso!');
      }
      this.loginHandler(user);
    } catch(e) {
      this.createToast('No se pudo iniciar sesion, intentelo mas tarde');
      return false;
    }
  }
  private createToast(msg: string, duration: number = 3000) {
    this.toastCtrl.create({
      message: msg,
      duration: duration
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
