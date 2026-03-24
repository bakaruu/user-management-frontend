import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  users: User[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load users';
        this.loading = false;
      }
    });
  }

  changeStatus(user: User): void {
    const newStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    this.userService.changeUserStatus(user.id, newStatus).subscribe({
      next: () => this.loadUsers(),
      error: (err: any) => this.errorMessage = err.error?.message || 'Failed to change status'
    });
  }

  deleteUser(user: User): void {
  if (user.role === 'ADMIN') {
    this.errorMessage = 'Cannot delete an admin account';
    return;
  }
  if (confirm('Are you sure you want to delete this user?')) {
    this.userService.deleteUser(user.id).subscribe({
      next: () => this.loadUsers(),
      error: (err: any) => this.errorMessage = err.error?.message || 'Failed to delete user'
    });
  }
}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}