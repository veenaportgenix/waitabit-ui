import { Component, OnInit,Inject } from '@angular/core';
import Chart from 'chart.js';
import { RestService } from "../../services/rest.services";
import { Constants } from "../../common/constants";
import { BlockstackService } from 'src/app/services/blockstack.service';

// core components
import {
  chartOptions,
  parseOptions,
  monthSignupChart
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public monthChart;
  public barMonthChart;
  //public clicked1: boolean = true;
  public totalSignup = '-'
  public weeklySignup = '-'
  public dailySignup = '-'
  public totalReferral = '-'


  constructor(private restService: RestService, private blockstackService: BlockstackService,@Inject('SESSIONSTORAGE') private sessionStorage: Storage) {
    //this.getFile();
    this.getApiKey();
   }

  ngOnInit() {
    
  }

  updateChartComponent() {
    var chartOrders = document.getElementById('chart-orders');
    parseOptions(Chart, chartOptions());

    this.barMonthChart = new Chart(chartOrders, {
      type: 'bar',
      options: monthSignupChart.options,
      data: monthSignupChart.data
    });


    var chartSales = document.getElementById('chart-sales');
    this.monthChart = new Chart(chartSales, {
      type: 'line',
      options: monthSignupChart.options,
      data: monthSignupChart.data
    });
    this.updateOptions();
  }

  public updateOptions() {
    this.monthChart.data.datasets[0].data = this.data[0];
    //console.log(this.salesChart.data.datasets[0].data)
    this.monthChart.update();

    this.barMonthChart.data.datasets[0].data = this.data[0];
    this.barMonthChart.update();
  }

  getFile(filename) {
    let options = { decrypt: true };
    this.blockstackService.userSession.getFile(filename + "_stats.json").then(data => {
      if (data) {
        const statsData = JSON.parse(data);
        this.totalSignup = statsData.total;
        this.weeklySignup = statsData.weekSignupTotal;
        this.dailySignup = statsData.todaySignup;
        this.totalReferral = statsData.totalReferal;
        this.datasets = [
          [statsData.monthSignup],
          [statsData.monthSignup]
        ];
        this.data = this.datasets[0];
        this.updateChartComponent();
      } else{
        this.datasets =[
          ['NA']
          ['NA']
        ];
        this.data = this.datasets[0];
        this.updateChartComponent();
      }
    });
  }
  
  getApiKey() {
    const existingData = sessionStorage.getItem("waitabit-session")
    if(existingData) {
      const data = JSON.parse(existingData);
      this.getFile(data.prod_api_key);
    } else{
      this.restService
      .get(Constants.DOMAIN_URL + Constants.CLIENT_SHOW_GENERATED_API_KEY)
      .subscribe(
        (data: any) => {
          sessionStorage.setItem("waitabit-session",JSON.stringify(data)); 
          this.getFile(data.prod_api_key);
        },
        (error) => {
          //token expires
          if (error.status === 401) {
           
          }
        }
      );
    }
    console.log("Fetching API Key")
    
  }


}
