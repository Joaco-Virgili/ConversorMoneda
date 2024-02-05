import { Component, inject } from '@angular/core';
import { AuthService } from './public/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Conversor';
  auth = inject(AuthService);
}
