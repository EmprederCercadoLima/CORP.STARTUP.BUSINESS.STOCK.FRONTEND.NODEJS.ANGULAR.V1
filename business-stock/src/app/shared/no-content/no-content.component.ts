import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.css']
})
export class NoContentComponent implements OnInit {

  public loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.loading = false;
  }

}
