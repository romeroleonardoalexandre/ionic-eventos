import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventListPage } from '../event-list/event-list';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SpendinglistPage } from '../spendinglist/spendinglist';

/**
 * Generated class for the EventFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-form',
  templateUrl: 'event-form.html',
})
export class EventFormPage {
  eventForm: FormGroup;
  eventError: string;
  private data:any;
  private headers: Headers = new Headers();
  private spending:boolean;
   constructor(public navCtrl: NavController, public navParams: NavParams,public fb:FormBuilder, private http: Http, private storage:Storage) {
    if(this.navParams.get('show')){
      this.spending = this.navParams.get('show');
    }

    this.eventForm = fb.group({
			titulo: ['', Validators.compose([Validators.required])],
      descricao: ['', Validators.compose([null])],
      realizado:['', Validators.compose([Validators.required])],
      data_evento:['',null],
      id:['', null]
    });

    if(this.navParams.get('item')){
      let evento = this.navParams.get('item')
      this.eventForm = fb.group({
        titulo: [evento.titulo, Validators.compose([Validators.required])],
        descricao: [evento.descricao, Validators.compose([null])],
        realizado:[evento.realizado, Validators.compose([Validators.required])],
        data_evento:[evento.data_evento,null],
        id:[evento.id, null]
      });
    }
  }

  handleEvent(){
    this.data = this.eventForm.value;
    if (!this.data.titulo) {
			return;
    }
    this.headers.append('Content-Type', 'application/json');
    //create
    if(this.data.id == ""){
      this.storage.get('usuario').then((id_usuario) => {
        let evento = {evento:this.data, id:id_usuario}
        this.http.post('http://localhost:3456/evento',evento, {headers:this.headers})
        .map(res => res.json()).subscribe(result => {
            this.navCtrl.push(EventListPage)
        })
      });
    //update
    }else{
      this.storage.get('usuario').then((id_usuario) => {
        let evento = {evento:this.data, id:id_usuario}
        this.http.put('http://localhost:3456/evento',evento)
        .map(res => res.json()).subscribe(result => {
            this.navCtrl.push(EventListPage)
        })
      });
    }
    
  }

  viewSpending(evento_id){
    this.navCtrl.push(SpendinglistPage,{evento_id:evento_id})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventFormPage');
  }

}
