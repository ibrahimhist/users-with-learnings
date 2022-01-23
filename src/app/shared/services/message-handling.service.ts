import { Injectable, NgZone } from '@angular/core';

import Swal, { SweetAlertOptions } from 'sweetalert2';

import { from } from 'rxjs';

@Injectable()
export class MessageHandlingService {
  constructor() {}

  showSuccessMessage(text?: string, title?: string, useTimer?: boolean): void {
    const backdrop = `
    rgba(0,0,123,0.4)
    url("/assets/images/nyan-cat.gif")
    left top
    no-repeat
  `;

    const containerClass = 'sweetalert__container--primary';
    this.showSwalMessage(text, title, useTimer, backdrop, containerClass);
  }

  showErrorMessage(text?: string, title?: string, useTimer?: boolean): void {
    const backdrop = `
    rgba(0,0,123,0.4)
    url("/assets/images/oopsie.gif")
    right top / 20rem
    no-repeat
  `;

    const containerClass = 'sweetalert__container--red';

    this.showSwalMessage(text, title, useTimer, backdrop, containerClass);
  }

  showConfirm(title?: string, text?: string) {
    return from(
      Swal.fire({
        title: title || '',
        text: text || '',
        icon: 'question',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        showCloseButton: true,
        customClass: {
          title: 'sweetalert__title',
          // content: 'sweetalert__content',
          confirmButton: 'sweetalert__confirm-btn',
          cancelButton: 'sweetalert__cancel-btn',
        },
      })
    );
  }

  private showSwalMessage(
    text?: string,
    title?: string,
    useTimer?: boolean,
    backdrop?: string,
    containerClass?: string
  ) {
    const sweetAlertOptions: SweetAlertOptions = {
      title: title || '',
      text: text || '',
      width: 600,
      padding: '3em',
      background: '#fff url(/assets/images/trees.png)',
      backdrop,
      confirmButtonText: 'Ok',
      showCloseButton: true,
      customClass: {
        container: containerClass,
        title: 'sweetalert__title',
        // content: 'sweetalert__content',
        confirmButton: 'sweetalert__confirm-btn',
      },
      timer: useTimer ? 3000 : undefined,
      timerProgressBar: useTimer,
    };
    Swal.fire(sweetAlertOptions);
  }

  privateshowFire(): void {
    this.showSuccessMessage('Content', 'Header');
  }
}
