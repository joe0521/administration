import { Component, OnInit, OnDestroy } from '@angular/core';

// FIREBASE
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  // CONFIGURATION DE LA PAGINATION
  artPerPages = 10; // Nombre d'articles par pages
  totalArticles = 0; // Variable contenant le nombre total d'articles
  totalPages = 0; // Nombre total de pages (calculé dans ngOnInit apres la subscription)
  activePage = 1; // Contient la page courante

  articlesList: Array<any>;

  // Variables nécessaires à l'utilisation de firebase
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  // Variable contenant la clé unique de l'item
  itemKey = null;
  itemsSubscription: Subscription;
  // Booleen pour le loading screen
  isLoading = true;

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('articles');
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }
  ngOnInit() {
    // on récupère le nombre total d'articles
    this.itemsSubscription = this.items.subscribe((itemsList: any[]) => {
        this.totalArticles = itemsList.length;
        this.isLoading = false;
        this.articlesList = itemsList;
        this.totalPages = Math.ceil(this.totalArticles / this.artPerPages);
      }
    );
  }
  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
    this.itemKey = null;
  }
  affArticle(itemKey) {
    console.log('Article Cliqué Id: ', itemKey);
  }
  // Clic sur le bouton supprimer
  removeArticle(itemKey) {
    this.itemKey = itemKey;
  }
  // confirmation de la suppression
  removeConfirmed() {
    if (!!this.itemKey) {
      // La clé n'est pas null, on supprime
      this.itemsRef.remove(this.itemKey);
      // Action terminée, on remet la clé à null
      this.itemKey = null;
    }
  }
  // Retourne un tableau représentant le nombre de pages pour utilisation de ngFor
  tabReturn() {
    const tabTotalPages = [];
    for (let i = 0; i < this.totalPages; i++) {
      tabTotalPages.push(i + 1);
    }
    return tabTotalPages;
  }
  pageUp() {
    this.activePage++;
    this.affTab();
  }
  pageDown() {
    this.activePage--;
    this.affTab();
  }
  setPage(index) {
    this.activePage = index;
    this.affTab();
  }
  // Fonctione retourne le tableau de la partie a afficher
  affTab() {
    const start = (this.artPerPages * (this.activePage - 1));
    const end = start + this.artPerPages;

    if (this.articlesList) {
      return this.articlesList.slice(start, end);
    }
  }
}
