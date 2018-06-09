import { AuthProvider } from './../../shared/providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { User } from '../../shared/interfaces/user.interface';

/**
 * Generated class for the TestResultChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'TestResultChart'
})
@Component({
  selector: 'page-test-result-chart',
  templateUrl: 'test-result-chart.html',
})
export class TestResultChartPage {

  @ViewChild('canvas') canvas;
  public chart: any;
  public currentUser: User;
  public careers: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad TestResultChartPage');
    this.authProvider.getCurrentUser()
    .subscribe(user => {
        this.currentUser = user;
        this.careers = this.currentUser.careers;
        this.loadCharts();
    });
  }

  private loadCharts() {
    let total = this.careers
        .map(career => career.match)
        .reduce((a, b) => a + b);


    this.chart = new Chart(this.canvas.nativeElement, {
        type: 'bar',
        data: {
            labels: this.careers.map(career => career.career.name),
            datasets: [{
                label: 'Carreras',
                data: this.careers.map(career => ((career.match * 100) / total).toFixed(1)),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
              ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(153, 102, 255, 1)'
              ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100,
                        callback: function(value) {
                            return value + "%"
                        }
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Carreras"
                    }
                }]
            }
        }
    });
  }
}
