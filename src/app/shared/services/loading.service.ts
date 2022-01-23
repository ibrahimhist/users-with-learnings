import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private ngxService: NgxUiLoaderService) {}

  showLoading(): void {
    this.ngxService.start();
  }

  hideLoading(): void {
    this.ngxService.stop();
  }
}
