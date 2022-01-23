import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { ButtonType } from '@app/shared/enums/button-type.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @ViewChild('fileInput', { static: false }) fileInput: any;

  @Input() elementId?: string;

  @Input() icon?: string;
  @Input() afterIcon?: string;
  @Input() customIcon?: string;

  @Input() text?: string;
  @Input() tooltip?: string;
  @Input() color: string;
  @Input() iconColor?: string;

  @Input() isSubmit?: boolean;
  @Input() disabled?: boolean;

  @Input() buttonType?: ButtonType;
  buttonTypeEnum = ButtonType;

  @Input() isUploadButton?: boolean;
  @Input() isUploadMultiple?: boolean;
  @Input() fileAccept?: string;

  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() fileUploaded: EventEmitter<File[]> = new EventEmitter<File[]>();

  // @Input() class = ''; // override the standard class attr with a new one.

  constructor() {
    this.buttonType = ButtonType.Basic;
  }

  onClick(event: any): void {
    if (this.isUploadButton && this.fileInput) {
      const el: HTMLElement = this.fileInput.nativeElement;
      el.click();
    }

    this.clicked.emit(event);
  }

  onFileChange(event: any): void {
    const target = event.target || event.srcElement;
    const newFiles: File[] = Array.from(target.files);
    this.fileUploaded.emit(newFiles);
    this.fileInput.nativeElement.value = '';
  }
}
