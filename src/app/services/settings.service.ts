import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  settings = {
    allowRegistrarion: false,
  
  }

  constructor() { }
  getSettings() {
    return this.settings;
  }
}
