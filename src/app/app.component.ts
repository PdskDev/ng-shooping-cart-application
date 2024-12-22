import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './layout/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, TopBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-shopping-app';
}
