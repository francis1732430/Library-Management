import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  goToLandingPage(): void {
    this.router.navigate(['home/books']);
  }

  goToLoginPage(): void {
    this.router.navigate(['/login']);
  }
}
