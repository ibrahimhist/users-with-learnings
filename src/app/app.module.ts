import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
} from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/modules/material/material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CoreModule } from './core/core.module';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  hasProgressBar: false,
  overlayColor: 'rgba(40,40,40,.1)',
};

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
