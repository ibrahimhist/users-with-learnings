import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fancy-card',
  templateUrl: './fancy-card.component.html',
  styleUrls: ['./fancy-card.component.scss'],
})
export class FancyCardComponent implements OnInit {
  @Input() title?: string;
  @Input() content?: string;
  @Input() imageUrl?: string;

  constructor() {}

  ngOnInit(): void {}
}
