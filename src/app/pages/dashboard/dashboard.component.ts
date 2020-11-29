import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { RestService } from "../../services/rest.services";
import { Constants } from "../../common/constants";
import { BlockstackService } from 'src/app/services/blockstack.service';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public totalSignup;
  public weeklySignup;
  public dailySignup;
  public totalReferral;


  constructor(private restService: RestService, private blockstackService: BlockstackService) { }

  ngOnInit() {
    this.getFile();





    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });



    var chartSales = document.getElementById('chart-sales');
    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
  }





  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }




  getFile() {
    let options = { decrypt: true };
    this.blockstackService.userSession.getFile("Dc4bc71d2_stats.json").then(data => {
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


        console.log(statsData)



      } else {
        const user = {};

      }
    });




  }


}
