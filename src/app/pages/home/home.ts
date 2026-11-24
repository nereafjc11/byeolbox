import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private supabase = inject(SupabaseService);
  private router = inject(Router);

  email = '';

  async ngOnInit(): Promise<void> {
    const { data } = await this.supabase.client.auth.getSession();

    if (!data.session) {
      await this.router.navigate(['/auth/login']);
      return;
    }

    this.email = data.session.user.email ?? '';
  }
}
