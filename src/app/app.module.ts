import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation'; //Añadido tutorial
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { GoogleMaps } from '@ionic-native/google-maps'; //Añadido tutorial

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { MisTabsPage } from '../pages/mis-tabs/mis-tabs'; //Añadido tutorial
import { LoginPage } from '../pages/login/login';
import { ModalNuevoSitioPage } from '../pages/modal-nuevo-sitio/modal-nuevo-sitio';
//import { DbProvider } from '../providers/db/db'; //Manejo de base de datos
import { AuthServiceProvider } from '../providers/auth-service/auth-service'; //Manejo de autenticación
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { GoogleDataProvider } from '../providers/google-data/google-data';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

export const firebaseConfig = {
  apiKey: "AIzaSyCaSjy3nQ8oH99-0m-GVvem4D2JenjsgH0",
  authDomain: "ionicapp-746e3.firebaseapp.com",
  databaseURL: "https://ionicapp-746e3.firebaseio.com",
  projectId: "ionicapp-746e3",
  storageBucket: "",
  messagingSenderId: "916469235685"
};

@NgModule({
  declarations: [
    MyApp,
    MisTabsPage,
    LoginPage,
    ModalNuevoSitioPage //Añadido tutorial
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MisTabsPage,
    LoginPage,
    ModalNuevoSitioPage //Añadido tutorial
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    LaunchNavigator,
    AuthServiceProvider,
    FirebaseDbProvider,
    GoogleDataProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
