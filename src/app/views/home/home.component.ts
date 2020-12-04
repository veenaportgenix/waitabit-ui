import {Component, OnInit} from "@angular/core";
import { LoaderService } from '../../services/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: "app-landing-v10",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  isLoading: Subject<boolean> = this.loader.isLoading;
  backgroundColor = "landing-indigo";

  constructor(private loader: LoaderService) {}

  ngOnInit() {}

  
}
