import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {

  showDetail = false;
  logs = []

  showDetailBtn() {
    this.showDetail = !this.showDetail
  }

  onToggleDetails(){
    this.showDetail = !this.showDetail
    this.logs.push(new Date())
  }
}
