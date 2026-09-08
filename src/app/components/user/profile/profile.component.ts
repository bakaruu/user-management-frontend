import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { User, UpdateUserRequest } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  user: User | null = null;
  updateRequest: UpdateUserRequest = {};
  confirmPassword: string = '';
  errorMessages: string[] = [];
  successMessage: string = '';
  loading: boolean = false;
  editing: boolean = false;
  private successTimeout: any;

  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: (user: User) => {
        this.user = user;
        this.updateRequest = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };
      },
      error: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  startEditing(): void {
    if (!this.user) return;
    this.updateRequest = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: ''
    };
    this.confirmPassword = '';
    this.errorMessages = [];
    this.editing = true;
  }

  onUpdate(): void {
    this.errorMessages = [];
    this.successMessage = '';

    if (this.updateRequest.password && this.updateRequest.password !== this.confirmPassword) {
      this.errorMessages = ['Passwords do not match'];
      return;
    }

    this.loading = true;

    const payload: UpdateUserRequest = {
      firstName: this.updateRequest.firstName,
      lastName: this.updateRequest.lastName,
      email: this.updateRequest.email
    };
    if (this.updateRequest.password) {
      payload.password = this.updateRequest.password;
    }

    this.userService.updateMe(payload).subscribe({
      next: (user: User) => {
        this.user = user;
        this.editing = false;
        this.successMessage = 'Profile updated successfully';
        this.loading = false;

        clearTimeout(this.successTimeout);
        this.successTimeout = setTimeout(() => {
          this.successMessage = '';
        }, 4000);
      },
      error: (err: any) => {
        const fieldErrors = err.error?.errors;
        this.errorMessages = fieldErrors
          ? Object.values(fieldErrors) as string[]
          : [err.error?.message || 'Update failed'];
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}