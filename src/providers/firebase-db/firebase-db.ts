import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthServiceProvider } from '../auth-service/auth-service';
import { Observable } from 'rxjs';
/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDbProvider {

  constructor(
  	public http: HttpClient,
  	public afDB: AngularFireDatabase,
  	public auth: AuthServiceProvider) {
    	console.log('Hello FirebaseDbProvider Provider');
  }

  //Guardamos un sitio con link /sitio/id_usuario/id_sitio
  guardarSitio(sitio) {
    if (!sitio.id) { //Si no existe el sitio, se crea con nuevo id. Si no se sobreescribe al editarlo
      sitio.id = Date.now(); //el id del sitio será la fecha en milisegundos desde el 01/01/1970

    }
  	return this.afDB.database.ref('sitios/'+this.auth.getUser()+'/'+sitio.id).set(sitio);
  }

  //Devolvemos un Observer con la lista de sitios del usuario logueado actualmente
  getSitios() {
  	return this.afDB.list('sitios/'+this.auth.getUser()).valueChanges();
  }

  //Se elimina un sitio de la lista de sitios del usuario según el id del sitio
  public borrarSitio(id) {
    this.afDB.database.ref('sitios/'+this.auth.getUser()+'/'+id).remove();
  }
}
