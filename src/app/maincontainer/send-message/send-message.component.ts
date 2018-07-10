import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

// Importation HttpClient et Rxjs
import { HttpClient } from '@angular/common/http';

// FIREBASE
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit, OnDestroy {
  /************/
  /* CkEditor */
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log = '';
  @ViewChild('myckeditor') ckeditor: any;
  items: Observable<any[]>;
  itemsSubscription: Subscription;
  // Variable de status
  sending = false;
  sendingError = false;

  returnedObj: any[];
  emailsList: string[];
  emailTo: string; // email du destinataire

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.items = db.list('emails').valueChanges();
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      removeButtons: 'Save,Find,Replace,Form,Print,Preview,Subscript' +
      ',SelectAll,Superscript,Scayt,Styles,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,Language,Flash,HiddenField'
    };
    this.itemsSubscription = this.items.subscribe(
      (itemsList: any[]) => {
        // this.returnedObj = itemsList;
        this.emailsList = this.mailListConvert(itemsList);
      }
    );
  }
  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }
  // L'observable nous retourne un objet, cette fonction permet de convertir l'objet en tableau contenant les adresses mail
  mailListConvert(objTab) {
    let emailTab: string[] = [];
    let i = 0;

    for (let item of objTab) {
      if ( i === 0 ) {
        this.emailTo = item.nom;
      } else {
        emailTab.push(item.nom);
      }
      i++;
    }
    return emailTab;
  }
  onSend(formRef: NgForm) {
    this.sending = true;
    this.http.post('http://joel.moutier.space/mytools/mail.php', {
      'objet': formRef.value.objet,
      'dest': this.emailTo,
      'bcc': this.emailsList,
      'message': this.mycontent
      }, {responseType: 'text'}).subscribe(
        (val) => {
          this.sending = false;
          console.log(val);
         }, // Next
        (response) => {
          this.sendingError = true;
          setTimeout(() => { this.sendingError = false; this.sending = false; }, 4000);
        }, // Error
        () => {
          // Success
          this.sendingError = false;
          console.log('Navigate To Email List --->');
    });
  }
}
