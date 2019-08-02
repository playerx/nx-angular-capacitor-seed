import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nx-angular-capacitor-seed-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nx-angular-capacitor-seed'

  @Input()
  welcomeMessage: string

  @Output()
  welcomeClicked = new EventEmitter()
}
