import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-child-card',
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.scss']
})
export class ChildCardComponent implements OnInit {
  @Input() child;
  constructor() {
   }

  ngOnInit() {
    console.log('---->', this.child);
  }

}
