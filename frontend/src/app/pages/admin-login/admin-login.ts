import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-admin-login',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss'
})
export class AdminLogin {

  username = '';
  password = '';

  errorMessage = '';
  isLoading = false;

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  login(): void {

    this.errorMessage = '';

    if (!this.username.trim() || !this.password) {
      this.errorMessage = 'Please enter your username and password.';
      return;
    }

    this.isLoading = true;

    this.auth.login(
      this.username,
      this.password
    ).subscribe({

      next: () => {

        this.isLoading = false;

        this.router.navigate(['/admin-dashboard']);

      },

      error: (error) => {

        this.isLoading = false;

        console.error('Login failed:', error);

        this.errorMessage = 'Invalid username or password.';

      }

    });

  }

}