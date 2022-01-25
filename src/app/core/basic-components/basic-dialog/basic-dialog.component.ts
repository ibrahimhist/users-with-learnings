import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-basic-dialog',
  templateUrl: './basic-dialog.component.html',
  styleUrls: ['./basic-dialog.component.scss'],
})
export class BasicDialogComponent implements OnInit {
  @Input() header?: string;
  @Input() disableActionButton?: boolean;
  @Input() showActionButton?: boolean;
  @Input() showCancelButton?: boolean;
  @Input() actionButtonText?: string;
  @Input() cancelButtonText?: string;
  @Input() isActionButtonSubmit?: boolean;

  @Output() clickedCancelButton: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickedActionButton: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.showActionButton = this.showCancelButton = true;
    this.cancelButtonText = 'Cancel';
    this.actionButtonText = 'Ok';
  }

  ngOnInit(): void {}

  onClickedClose(event: any): void {
    this.clickedCancelButton.emit(event);
  }

  onClickedActionButton(event: any): void {
    this.clickedActionButton.emit(event);
  }
}
