import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DomainModule } from '@domain/domain.module';
import { HTTP_LOADING_INTERCEPTOR } from '@shared/interceptors/loading.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, SharedModule, DomainModule],
  providers: [HTTP_LOADING_INTERCEPTOR],
  bootstrap: [AppComponent],
})
export class AppModule {}