import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventFormPage } from '../event-form/event-form';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';


/**
 * Generated class for the EventListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  public lista: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage:Storage) {
  
  }

  openDetail(item){
    this.navCtrl.push(EventFormPage,{'item':item,'show':true});
  }

  openFormDetail(){
    this.navCtrl.push(EventFormPage,{'show': false});
  }

  removeItem(id){
    this.http.delete('http://localhost:3456/evento/'+id)
        .map(res => res.json()).subscribe(result => {
            this.navCtrl.push(EventListPage)
        })
  }

  ionViewDidLoad() {
    this.storage.get('usuario').then((id) => {
      this.http.get('http://localhost:3456/geteventbyuserid/' + id)
      .map(res => res.json()).subscribe(data => {
        this.lista = data.eventos;
      })  
    }).catch(erro => {
      return false;
    });
    

  }

}
