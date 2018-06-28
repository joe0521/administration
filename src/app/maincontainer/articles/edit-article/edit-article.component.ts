import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit, OnDestroy {
  // Variables nécessaires à l'utilisation de firebase
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  categories: Observable<any[]>;
  itemsSubscription: Subscription;
  dbArticelsRef = null;
  item: any;
  currRouteId = null;
   /************/
  /* CkEditor */
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log = '';
  @ViewChild('myckeditor') ckeditor: any;

  constructor(db: AngularFireDatabase, private activeRoute: ActivatedRoute, private route: Router) {
    this.currRouteId = this.activeRoute.snapshot.params['id'];

    this.items = db.list('/articles', ref => ref.orderByKey().equalTo(this.currRouteId)).valueChanges();
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
    this.itemsSubscription = this.items.subscribe((item: any) => {
      this.item = item[0];
      this.mycontent = this.item.texte;
    });
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }
  onSubmit(formRef: NgForm) {
    this.dbArticelsRef.update(this.currRouteId, {
      titre: formRef.value.titre,
      categorie: formRef.value.categorie,
      texte: this.mycontent
    });
    this.route.navigate(['/articles']);
  }
}
