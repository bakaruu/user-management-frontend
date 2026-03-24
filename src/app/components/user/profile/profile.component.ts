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
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;
  editing: boolean = false;

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

  onUpdate(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.updateMe(this.updateRequest).subscribe({
      next: (user: User) => {
        this.user = user;
        this.editing = false;
        this.successMessage = 'Profile updated successfully';
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Update failed';
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}