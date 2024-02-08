import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
