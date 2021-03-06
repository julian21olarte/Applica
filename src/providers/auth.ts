import { User } from '../shared/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthCredential } from '@firebase/auth-types';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Platform } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public currentUser: User;
  public currentUserObservable: BehaviorSubject<any>;
  private CORDOVA: string = 'cordova';
  constructor(
    public http: HttpClient,
    private fireAuth: AngularFireAuth,
    private database: AngularFirestore,
    private platform: Platform,
    private googlePlus: GooglePlus,
    public facebook: Facebook,
    public Twitter: TwitterConnect) {
    if (localStorage.getItem('currentUser') !== null) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.currentUserObservable = new BehaviorSubject(false);
  }


  /**PUBLIC LOGIN FUNCTIONS */

  /**
   * Login Facebook
   */
  public loginFacebook() {
    if (this.platform.is(this.CORDOVA)) {
      return this.nativeFacebookLogin();
    } else {
      return this.webFacebookLogin();
    }
  }

  /**
   * Login Twitter
   */
  public loginTwitter() {
    if (this.platform.is(this.CORDOVA)) {
      return this.nativeTwitterLogin();
    } else {
      return this.webTwitterLogin();
    }
  }

  /**
   * Login Google
   */
  public loginGoogle() {
    if (this.platform.is(this.CORDOVA)) {
      return this.nativeGoogleLogin();
    } else {
      return this.webGoogleLogin();
    }
  }

  /**
   * Native Facebook Login (in cordova platform, native devices)
   */
  private async nativeFacebookLogin() {
    try {
      await this.fireAuth.auth.signInAndRetrieveDataWithCredential(await this.getFacebookCredential());
      const user = await this.loginUser();
      this.setCurrentUser(user);
      return user;
    } catch(error) {
      return this.loginErrorHandler(error)
    }
  }

  /**
   * Native Twitter login
   */
  private async nativeTwitterLogin() {
    try {
      await this.fireAuth.auth.signInAndRetrieveDataWithCredential(await this.getTwitterCredential());
      const user = await this.loginUser();
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      return this.loginErrorHandler(error);
    }
  }

  /**
   * Native Google login
   */
  private async nativeGoogleLogin() {
    try {
      await this.fireAuth.auth.signInAndRetrieveDataWithCredential(await this.getGoogleCredential());
      const user = await this.loginUser();
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      return this.loginErrorHandler(error);
    }
  }



  /**WEB LOGIN FUNCTIONS */
  /**Use in Browsers */

  /**
   * Web Facebook login (run in web browser)
   */
  private async webFacebookLogin() {
    try {
      await this.fireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
      const user = await this.loginUser();
      this.setCurrentUser(user);
      return user;
    } catch (error) {

      return this.loginErrorHandler(error)
    }
  }

  /**
   * Web Twitter login
   */
  private async webTwitterLogin() {
    try {
      await this.fireAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
      const user = await this.loginUser();
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      return this.loginErrorHandler(error);
    }
  }

  /**
   * Web Google login
   */
  private async webGoogleLogin() {
    try {
      await this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      const user = await this.loginUser();
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      return this.loginErrorHandler(error);
    }
  }



  /*GET CREDENTIALS FUNCTIONS*/
  /* Use in native platoforms (cordova)*/

  /**
   * get Facebook credentials
   */
  private async getFacebookCredential() {
      const response = await this.facebook.login(['email', 'public_profile']);
      return firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
  }

  /**
   * Get Twitter Credentials
   */
  private async getTwitterCredential() {
    const response = await this.Twitter.login();
    return firebase.auth.TwitterAuthProvider.credential(response.token, response.secret);
  }

  /**
   * Get Google Credentials
   */
  private async getGoogleCredential() {
    const gplusUser = await this.googlePlus.login({
      'webClientId': '194788830493-3a0sg2db3ug9ouhs2mjg5jag9taunl94.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'profile email'
    });
    return firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken);
  }

  /**
   * Login User
   */
  private async loginUser() {
    const fireUser = this.fireAuth.auth.currentUser;

    // fill User
    this.currentUser = {
      uid: fireUser.uid,
      status: 1,
      name: fireUser.displayName,
      fullname: fireUser.displayName,
      email: fireUser.email,
      image: fireUser.photoURL,
      phone: fireUser.phoneNumber
    };
    const firestoreUserRef = this.database.doc('users/'+fireUser.uid);
    const firestoreUser = await firestoreUserRef
      .valueChanges()
      .take(1)
      .toPromise();

    firestoreUser
      ? this.currentUser = firestoreUser as User
      : firestoreUserRef.set(this.currentUser);
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    return this.currentUser;
  }

  /**
   * Error Handler (and verify if exist other account with the same email.)
   * @param errorResponse 
   */
  private loginErrorHandler(errorResponse: any) {
    const email = errorResponse.email;
    const credential = errorResponse.credential;
    if (errorResponse.code !== 'auth/account-exists-with-different-credential') {
      return null;
    }
    return this.loginIfExistProvider(email, credential);
  }

  /**
   * Login if exist other provider (other account with the same email)
   * @param email 
   * @param credential 
   */
  private async loginIfExistProvider(email: string, credential: AuthCredential) {
    const providers = await this.fireAuth.auth.fetchSignInMethodsForEmail(email);
    if (providers.length) {
      let provider = null;
      if(this.platform.is(this.CORDOVA)) {
        switch (providers[0]) {
          case 'twitter.com': provider = await this.getTwitterCredential(); break;
          case 'facebook.com': provider = await this.getFacebookCredential(); break;
          case 'google.com': provider = await this.getGoogleCredential(); break;
        }
      } else {
        switch (providers[0]) {
          case 'twitter.com': provider = new firebase.auth.TwitterAuthProvider(); break;
          case 'facebook.com': provider = new firebase.auth.FacebookAuthProvider(); break;
          case 'google.com': provider = new firebase.auth.GoogleAuthProvider(); break;
        }
      }
      if(provider) {
        try {
          if(this.platform.is(this.CORDOVA)) {
            await this.fireAuth.auth.signInAndRetrieveDataWithCredential(provider);
          } else {
            provider.setCustomParameters({ login_hint: email });
            await this.fireAuth.auth.signInWithPopup(provider);
          }
          await this.fireAuth.auth.currentUser.linkAndRetrieveDataWithCredential(credential);
          const user = await this.loginUser();
          this.setCurrentUser(user);
          return user;
        } catch(error) {
          alert('Error obteniendo los proveedores de autenticacion.');
        }
      }
    } else {
      alert('No existen mas proveedores de autenticacion.');
    }
  }
  
  /**
   * setCurrentUser
   * @param user new User
   */
  private setCurrentUser(user: any = null) {
    this.currentUserObservable.next(user);
  }

  /**
   * get The current User in System
   */
  public getCurrentUser(): Observable<User> {
    if(this.currentUser && localStorage.getItem('currentUser') !== null) {
      this.setCurrentUser(this.currentUser);
    }
    return this.currentUserObservable.asObservable();
  }


  /**
   * Logout
   */
  public async logout() {
    try {
      localStorage.removeItem('currentUser');
      await this.fireAuth.auth.signOut();
      this.setCurrentUser(null);
      //window.location.assign('https://accounts.google.com/Logout');
    } catch(error) {
      alert('Error al salir de la aplicacion');
    }
  }


  /**
   * Update User Data from Personal Data Page
   * @param user New Data
   */
  public async updateUserData(user?: User) {
    if(user && this.currentUser) {
      try {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.setCurrentUser(this.currentUser);
        return await this.database.collection('users').doc(this.currentUser.uid).set(user);
      } catch(error) {
        alert(error);
        alert('Error actualizando los datos del usuario.');
      }
    }
    return false;
  }

}
