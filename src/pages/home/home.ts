import { TwitterProvider } from './../../providers/twitter';
import { User } from './../../shared/interfaces/user.interface';
import {Component, ViewChild} from '@angular/core';
import {NavController, IonicPage, Slides} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth";
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild(Slides) slides: Slides;
	public currentUser: User;
	public skipMessage: string;
	public tweets: Array<any>;
	public dashboardItems: Array<any>;
	constructor(public navCtrl: NavController, public authProvider: AuthProvider, public twitterProvider: TwitterProvider, public domSanitizer: DomSanitizer) {
			this.skipMessage = 'saltar';
			this.dashboardItems = [
				{type: 'tweet', name: 'UFPSCUCUTA', query: 'from:UFPSCUCUTA', account: '@UFPSCUCUTA', tweets: []},
				{type: 'tweet', name: 'El Espectador', query: 'from:elespectador', account: '@elespectador', tweets: []},
				{type: 'tweet', name: 'Orientacion Vocacional', query: 'orientacion vocacional', tweets: []},
				//{type: 'video', name: 'Firebase Video', url: 'https://www.youtube.com/watch?v=3aoxOtMM2rc'}
			]
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad HomePage');

		// get user logged
		this.authProvider.getCurrentUser()
			.subscribe(user => {

				this.currentUser = user;
				if(this.currentUser) {

					this.dashboardItems.forEach((dItem, index) => {

						// if item is a tweet
						if(dItem.type == 'tweet') {
							this.twitterProvider.getTweets(`${dItem.query}`, 3)
							.subscribe(tweets => {
								if(tweets.data && tweets.data.statuses) {
									this.dashboardItems[index].tweets = tweets.data.statuses;
								}
							})

							// else if item is a video
						} else if(dItem.type == 'video') {
							this.dashboardItems[index].url = this.domSanitizer.bypassSecurityTrustResourceUrl(dItem.url);
						}
					})
				}
			});
	}

	slideChanged() {
		if(this.slides.isEnd()) {
				this.skipMessage = 'Vamos!';
		}
	}
	public goToLogin() {
		this.navCtrl.setRoot('LoginPage');
	}

	public goToProfile() {
		this.navCtrl.setRoot('ProfilePage');
	}

	public goToResults() {
		this.navCtrl.push('TestResultPage');
	}
}
