import {Component} from '@angular/core';
import {Toggle} from "ionic-angular";
import {SettingsService} from "../../services/settings";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(private settingsService: SettingsService) {

  }

  onToggle(toggle: Toggle) {
    this.settingsService.isAlternativeSettingsON = toggle.checked
  }

  getAlternativeBackgroundState() {
    return this.settingsService.isAlternativeSettingsON;
  }
}
