import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  /************/
  /* CkEditor */
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log = '';
  @ViewChild('myckeditor') ckeditor: any;

  constructor() { }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      removeButtons: 'Save,Find,Replace,Form,Print,Preview,Subscript' +
      ',SelectAll,Superscript,Scayt,Styles,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,Language,Flash,HiddenField'
    };
  }
  onSend(formRef: NgForm) {
    console.log('Objet: ', formRef.value.objet);
    console.log('Texte: ', this.mycontent);
  }

}
