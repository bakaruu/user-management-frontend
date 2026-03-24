import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  request: RegisterRequest = {
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    password: ''
  };
  errorMessage: string = '';
  loading: boolean = false;

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.request).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Registration failed';
        this.loading = false;
      }
    });
  }
}