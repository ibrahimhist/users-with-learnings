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
import { UsersComponent } from './pages/users/users.component';
import { LearningsComponent } from './pages/learnings/learnings.component';

import { LoadingService } from './shared/services/loading.service';
import { MessageHandlingService } from './shared/services/message-handling.service';
import { UserService } from './shared/services/user/user.service';
import { LearningService } from './shared/services/learning/learning.service';
import { SearchPipe } from './shared/pipes/search.pipe';
import { ProjectRelatedComponents } from './project-related/project-related-components.index';
import { LearningListDialogComponent } from './project-related/learning/learning-list-dialog/learning-list-dialog.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  hasProgressBar: false,
  overlayColor: 'rgba(40,40,40,.1)',
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    LearningsComponent,
    ...ProjectRelatedComponents,
    SearchPipe,
    LearningListDialogComponent,
  ],
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
  providers: [
    LoadingService,
    MessageHandlingService,
    UserService,
    LearningService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
