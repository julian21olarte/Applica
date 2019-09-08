import {AuthProvider} from "../../providers/auth";
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

  @ViewChild('bars') barsCanvas;
  @ViewChild('pie') pieCanvas;
  //@ViewChild('radar') radarCanvas;
  public barsChart: any;
  public pieChart: any;
  //public radarChart: any;
  public currentUser: User;
  public results: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestResultChartPage');
    this.authProvider.getCurrentUser()
      .subscribe(user => { 
          this.currentUser = user;
          if(this.currentUser && this.currentUser.results) {
            if(this.navParams.data.presentation) {
              this.results = this.navParams.data.presentation.results;
            } else {
              this.results = this.currentUser.results;
            }
            this.loadCharts();
          }
      });
  }

  private loadCharts() {
    let total = this.results
        .map(career => career.match)
        .reduce((a, b) => a + b);

    // reused chart data, options
    let chartFields = {
      data: {
        labels: this.results.map(career => career.name),
        datasets: [{
            label: 'Personalidades',
            data: this.results.map(career => ((career.match * 100) / total).toFixed(1)),
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
                      labelString: "Personalidades"
                  }
              }]
          }
      }
    }

    // config charts
    this.barsChart = new Chart(this.barsCanvas.nativeElement, {
      type: 'bar',
      data: chartFields.data,
      options: chartFields.options
    });

    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'doughnut',
      data: chartFields.data,
    })

    // this.radarChart = new Chart(this.radarCanvas.nativeElement, {
    //   type: 'polarArea',
    //   data: chartFields.data,
    //   options: chartFields.options
    // });
  }
}
