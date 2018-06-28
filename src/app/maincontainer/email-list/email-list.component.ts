import { Component, OnInit, OnDestroy } from '@angular/core';

// FIREBASE
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit, OnDestroy {
    // Variables nécessaires à l'utilisation de firebase
    itemsRef: AngularFireList<any>;
    items: Observable<any[]>;
    itemsSubscription: Subscription;
    totalEmails: number;
    // Tableau contenant les adresse correspondantes à la recherche (vide au départ)
    searchEmails: any[] = null;
    searchString = ''; // chaine de recherche bindée avec l'input
    emailsList: any[];

    selectedItem: {
      nom: string,
      key: string
    };

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('emails');
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  ngOnInit() {
    // on récupère le nombre total d'articles
    this.itemsSubscription = this.items.subscribe((itemsList: any[]) => {
      this.totalEmails = itemsList.length;
      this.emailsList = itemsList;
    });
  }
  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }
  onChange() {
    this.searchEmail();
    this.emailValidate();
  }
  searchEmail() {
    const regex = '^' + this.searchString;
    let tempTab: any[] = []; // tableau temporaire pour la recherche

    for (let email of this.emailsList) {
      if (email.nom.match(regex)) {
        tempTab.push(email);
      }
    }
    if (this.searchString.length === 0) {
      this.searchEmails = null;
    } else {
      this.searchEmails = tempTab;
    }
  }
  emailSelected(item) {
    this.selectedItem = item;
    this.searchString = item.nom;
    this.searchEmails = null;
  }
  emailValidate() {
    // vérifie si l'adresse email a été écrite en entière dans l'input
    if (this.searchEmails && this.searchEmails.length && this.searchEmails[0].nom === this.searchString) {
      this.selectedItem = this.searchEmails[0];
      this.searchEmails = null;
    } else {
      this.selectedItem = null;
    }
  }
  onDeleteEmail() {
    if (this.selectedItem) {
      this.itemsRef.remove(this.selectedItem.key);
      this.searchString = null;
      this.selectedItem = null;
    }
  }
}
