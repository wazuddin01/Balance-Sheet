import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class RegisterGuard implements CanActivate {
    constructor(
        private router: Router,
        private settings: SettingsService
    ) { }

    canActivate(): boolean {
        if (this.settings.getSettings().allowRegistrarion) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false
        }

    }


}