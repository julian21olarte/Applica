import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AuthCredential } from '@firebase/auth-types';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Platform } from 'ionic-angular';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private currentUser: any;
  private currentUserObservable: BehaviorSubject<any>;
  private api: string;
  private apiUser: string;
  constructor(
    public http: HttpClient,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private googlePlus: GooglePlus,
    public facebook: Facebook,
    public Twitter: TwitterConnect) {
    if (localStorage.getItem('currentUser') !== null) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.currentUserObservable = new BehaviorSubject(this.currentUser);
    console.log(this.fireAuth.auth.currentUser);
  }

  public loginFacebook() {
    if (this.platform.is('corova')) {
      return this.nativeFacebookLogin();
    } else {
      return this.webFacebookLogin();
    }
  }

  private async nativeFacebookLogin() {
    try {
      const response = await this.facebook.login(['email', 'public_profile']);
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      const signIn = await this.fireAuth.auth.signInWithCredential(facebookCredential);
      const user = this.loginUser();
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      return this.loginErrorHandler(error)
    }
  }
  private async webFacebookLogin() {
    try {
      const response = await this.fireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
      const user = this.loginUser();
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      return this.loginErrorHandler(error)
    }
  }
  // private webFacebookLogin() {
  //   return this.fireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  //     .then(response => this.loginUser())
  //     .then(user => {
  //       this.setCurrentUser(user);
  //       return user;
  //     })
  //     .catch(error => this.loginErrorHandler(error));
  // }
  // private async nativeFacebookLogin() {
  //   return this.facebook.login(['email', 'public_profile'])
  //       .then(response => {
  //         const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
  //         return this.fireAuth.auth.signInWithCredential(facebookCredential)
  //           .then(response => this.loginUser())
  //           .then(user => {
  //             this.setCurrentUser(user);
  //             return user;
  //           }).catch(error => this.loginErrorHandler(error));
  //       });
  // }

  public loginTwitter() {
    if (this.platform.is('cordova')) {
      return this.nativeTwitterLogin();
    } else {
      return this.webTwitterLogin();
    }
  }

  private async nativeTwitterLogin() {
    try {
      const response = await this.Twitter.login();
      const twitterCredential = firebase.auth.TwitterAuthProvider.credential(response.token, response.secret);
      const signin = await this.fireAuth.auth.signInWithCredential(twitterCredential);
      const user = this.loginUser();
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      return this.loginErrorHandler(error);
    }
  }
  private async webTwitterLogin() {
    try {
      const response = await this.fireAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
      const user = this.loginUser();
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      return this.loginErrorHandler(error);
    }
  }

  public loginGoogle() {
    if (this.platform.is('cordova')) {
      return this.nativeGoogleLogin();
    } else {
      return this.webGoogleLogin();
    }
  }
  // public loginGoogle() {
  //   return this.fireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  //     .then(response => this.loginUser())
  //     .then(user => {
  //       console.log(user);
  //       this.setCurrentUser(user);
  //       return user;
  //     })
  //     .catch(error => {
  //       return this.loginErrorHandler(error);
  //     });
  // }

  private async nativeGoogleLogin() {
    try {
      const gplusUser = await this.googlePlus.login({
        'webClientId': '194788830493-3a0sg2db3ug9ouhs2mjg5jag9taunl94.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })
      const response = await this.fireAuth.auth
        .signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));
      const user = this.loginUser();
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      return this.loginErrorHandler(error);
    }

  }
  private async webGoogleLogin() {
    try {
      const response = await this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      const user = this.loginUser();
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      return this.loginErrorHandler(error);
    }
  }

  private loginUser() {
    const fireUser = this.fireAuth.auth.currentUser;
    this.currentUser = {};
    console.log(fireUser);
    this.currentUser.name = fireUser.displayName;
    this.currentUser.email = fireUser.email;
    this.currentUser.image = fireUser.photoURL;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    return this.currentUser;
  }


  private loginErrorHandler(errorResponse: any) {
    const email = errorResponse.email;
    console.log(email);
    const credential = errorResponse.credential;
    if (errorResponse.code !== 'auth/account-exists-with-different-credential') {
      return null;
    }
    return this.loginIfExistProvider(email, credential);
  }

  // private async loginIfExistProvider(email: string, credential: AuthCredential) {
  //   const providers = await this.fireAuth.auth.fetchProvidersForEmail(email);
  //   if (providers.length) {
  //     let provider = null;
  //     console.log(providers);
  //     switch (providers[0]) {
  //       case 'twitter.com': provider = new firebase.auth.TwitterAuthProvider(); break;
  //       case 'facebook.com': provider = new firebase.auth.FacebookAuthProvider(); break;
  //       case 'github.com': provider = new firebase.auth.GithubAuthProvider(); break;
  //       case 'google.com': provider = new firebase.auth.GoogleAuthProvider(); break;
  //     }
  //     if(provider) {
  //       try {
  //         console.log(providers[0]);
  //         provider.setCustomParameters({ login_hint: email });
  //         const responseRedirect = await this.fireAuth.auth.signInWithRedirect(provider);
  //         const response = await this.fireAuth.auth.currentUser.linkWithCredential(credential);
  //         const user = this.loginUser();
  //         this.setCurrentUser(user);
  //         return user;
  //       } catch(error) {
  //         alert('Error obteniendo los proveedores de autenticacion.');
  //       }
  //     }
  //   } else {
  //     alert('Error obteniendo los proveedores de autenticacion.');
  //   }
  // }
  private loginIfExistProvider(email: string, credential: AuthCredential) {
    return this.fireAuth.auth.fetchProvidersForEmail(email)
      .then(providers => {
        if (providers.length) {
          let provider = null;
          switch (providers[0]) {
            case 'twitter.com': provider = new firebase.auth.TwitterAuthProvider(); break;
            case 'facebook.com': provider = new firebase.auth.FacebookAuthProvider(); break;
            case 'github.com': provider = new firebase.auth.GithubAuthProvider(); break;
            case 'google.com': provider = new firebase.auth.GoogleAuthProvider(); break;
          }
          if (provider) {
            provider.setCustomParameters({ login_hint: email });
            return this.fireAuth.auth.signInWithPopup(provider)
              .then(resp =>
                this.fireAuth.auth.currentUser.linkWithCredential(credential)
                  .then(response => this.loginUser())
                  .then(user => {
                    this.setCurrentUser(user);
                    return user;
                  }));
          }
        } else {
          alert('Error obteniendo los proveedores de autenticacion.');
        }
      })
      .catch(error => {
        console.log(error);
        alert('Error obteniendo los proveedores de autenticacion.');
      });
  }

  private setCurrentUser(user: any = null) {
    this.currentUserObservable.next(user);
  }

}
