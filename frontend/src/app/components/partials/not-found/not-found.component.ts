import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {


  @Input()
  visible = false;
  @Input()
  notFoundMessage = "სამწუხაროდ ვერ მოიძებნა";
  @Input()
  resetLinkText = "მთავარ გვერდზე დაბრუნება";
  @Input()
  resetLinkRoute = "/";
  constructor() { }

  ngOnInit(): void {
  }

}
