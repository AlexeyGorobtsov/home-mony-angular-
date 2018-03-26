import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'wfm-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  constructor (private router: Router) {

  }
  ngOnInit() {
    this.router.navigate(['./login']);
  }
}
