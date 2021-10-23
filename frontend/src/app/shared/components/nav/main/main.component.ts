import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@domain/auth/shared/services/auth.service';
import { Forwarder } from '@domain/auth/shared/interfaces/forwarder.interface';

@Component({
  selector: 'app-nav-main',
  templateUrl: './main.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {
  forwarder!: Forwarder;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentProfile.subscribe((forwarder) => {
      this.forwarder = forwarder;
    });
  }

  logout() {
    this.authService.logOut();
  }
}
