import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// Importations FireBase
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  categories: Observable<any[]>;
  dbArticelsRef = null;
  /************/
  /* CkEditor */
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log = '';
  @ViewChild('myckeditor') ckeditor: any;

  constructor(db: AngularFireDatabase, private route: Router) {
    this.categories = db.list('categories').valueChanges();
    this.dbArticelsRef = db.list('articles');
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      removeButtons: 'Save,Find,Replace,Form,Print,Preview,Subscript' +
      ',SelectAll,Superscript,Scayt,Styles,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,Language,Flash,HiddenField'
    };
  }

  onSubmit(formRef: NgForm) {
    const today: Date = new Date();
    const dd: any = today.getDate();
    const mm: any = today.getMonth() + 1; // Janvier = 0
    const yyyy = today.getFullYear();
    const currDate = (dd < 10 ? '0' + dd : dd) + '/' + (mm < 10 ? '0' + mm : mm) + '/' + yyyy;
    let sendingObj = {}; // Préparation de l'objet pour l'envoi a firebase

    sendingObj = {
      titre: formRef.value.titre,
      date: currDate,
      categorie: formRef.value.categorie,
      texte: this.mycontent
    };

    // Ajout de l'objet à la base de donnée
     this.dbArticelsRef.push(sendingObj);

     this.route.navigate(['/articles']);
  }

}
