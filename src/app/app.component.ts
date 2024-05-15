import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/authService';
import { ProductService } from './services/productService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbModule, HttpClientModule, CommonModule, RouterModule],
  providers: [AuthService, ProductService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'test-angular';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getUsernameFromJWT(): string {
    const token = this.authService.getToken()
    const payload = JSON.parse(atob(token!.split('.')[1]));
    return payload.username;
  }

  routeToLogin(): void {
    this.router.navigate(['/login']);
  }

  routeToSignup(): void {
    this.router.navigate(['/signup']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
