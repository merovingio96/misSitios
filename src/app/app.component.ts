import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LoginPage } from '../pages/login/login';
import { MisTabsPage } from '../pages/mis-tabs/mis-tabs'; //Agregado tutorial
//import { DbProvider } from '../providers/db/db';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: 'app.html',
  providers: [
    AuthServiceProvider
  ]
})
export class MyApp {
  //rootPage:any = MisTabsPage; //Modificado tutorial
  rootPage:any = LoginPage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    //private sqlite: SQLite,
   // private dbprovider: DbProvider,
    private auth: AuthServiceProvider) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        
        //La página al iniciar la app dependerá de si estamos logueados o no
        this.auth.session.subscribe(session => {
          if (session) {
            this.rootPage = MisTabsPage;
          }
          else {
            this.rootPage = LoginPage;
          }
        });
        statusBar.styleDefault();
        splashScreen.hide();
        //this.createDatabase();
    });
  }

  /*public createDatabase() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      this.dbprovider.setDatabase(db);
      return this.dbprovider.createTable();
    })
    .then(() => {
      this.splashScreen.hide();
    })
    .catch(error => {
      console.error(error);
    });
  }*/
}

