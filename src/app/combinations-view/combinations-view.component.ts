import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HostListener } from "@angular/core";

@Component({
  selector: "app-combinations-view",
  templateUrl: "./combinations-view.component.html",
  styleUrls: ["./combinations-view.component.css"]
})
export class CombinationsViewComponent implements OnInit {
  @Output() goToTablePage = new EventEmitter();
  @Output() newSearchEvent = new EventEmitter();
  @Input() combinations;
  @Input() collectionSize;
  pageSize = 10;
  @Input() page = 1;
  screenHeight: number;
  screenWidth: number;
  paginationSize = 'sm';
  paginationMaxSize = 15;

  constructor() {
    this.onResize();
  }

  ngOnInit() {}

  goToPage() {
    this.goToTablePage.emit(this.page);
  }

  newSearch() {
    this.newSearchEvent.emit();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if(this.screenWidth < 769) {
      this.paginationSize = 'sm';    
      this.paginationMaxSize = 5; 
    } else {
      this.paginationSize = undefined;
      this.paginationMaxSize = 15;
    }
  }
}
