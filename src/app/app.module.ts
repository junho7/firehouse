import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FirehouseModule } from 'firehouse';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBGbCPFaDhZqKgmnNczhxBhJLvomcnvQxc',
      authDomain: 'swallow-15e18.firebaseapp.com',
      databaseURL: 'https://swallow-15e18.firebaseio.com',
      projectId: 'swallow-15e18',
      storageBucket: 'swallow-15e18.appspot.com',
      messagingSenderId: '1088400198831'
    }),
    FirehouseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
