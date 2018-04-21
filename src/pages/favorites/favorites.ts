import {Component} from '@angular/core';
import {Quote} from "../../data/quote.interface";
import {QuotesService} from "../../services/qoutes";
import {ModalController} from "ionic-angular";
import {QuotePage} from "../quote/quote";
import {SettingsService} from "../../services/settings";

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[] = [];
  isAlternativeBackgrounON: boolean = false;

  constructor(private quotesService: QuotesService,
              private modalCtrl: ModalController,
              private settingsService: SettingsService) {
  }

  ionViewWillEnter() {
    this.isAlternativeBackgrounON = this.settingsService.isAlternativeSettingsON;
    this.quotes = this.quotesService.getFavoriteQuotes();
  }

  onViewQuote(quote: Quote) {
    let modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();

    modal.onDidDismiss((remove: boolean) => {
      if (remove) {
        this.onRemoveFromFavorite(quote);
      }
    });
  }

  onRemoveFromFavorite(quote: Quote) {
    this.quotesService.removeQuoteFromFavorites(quote);
    // this.quotes = this.quotesService.getFavoriteQuotes();
    let position = this.quotes.findIndex((quoteEl: Quote) => {
      return quoteEl.id === quote.id
    });
    this.quotes.splice(position, 1);
  }
}
