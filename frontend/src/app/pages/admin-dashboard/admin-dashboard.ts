
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { EnquiryService } from '../../services/enquiry';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard implements OnInit {

  enquiries: any[] = [];
  searchText: string = '';
  selectedEnquiry: any = null;

  // Loading and error settings
  isLoading: boolean = false;
  loadError: string = '';

  // Theme settings
  isDarkMode: boolean = false;

  constructor(
    private enquiryService: EnquiryService,
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // Restore previously selected theme
    const savedTheme = localStorage.getItem('yatriva-admin-theme');

    this.isDarkMode = savedTheme === 'dark';

    // Check whether admin is logged in
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/admin-login']);
      return;
    }

    this.loadEnquiries();
  }

  // Scroll smoothly to the enquiries table
  scrollToEnquiries(event: Event): void {

    event.preventDefault();

    const section = document.getElementById('enquiries');

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Toggle between dark mode and light mode
  toggleTheme(): void {

    this.isDarkMode = !this.isDarkMode;

    localStorage.setItem(
      'yatriva-admin-theme',
      this.isDarkMode ? 'dark' : 'light'
    );
  }

  // Load all travel enquiries
  loadEnquiries(): void {

    this.isLoading = true;
    this.loadError = '';

    this.enquiryService.getEnquiries().subscribe({

      next: (response: any) => {

        this.enquiries = Array.isArray(response)
          ? response
          : response.results ?? [];

        this.isLoading = false;

        console.log('Enquiries loaded:', this.enquiries);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Error loading enquiries:', error);

        this.isLoading = false;

        this.loadError =
          'Unable to load enquiries. Please try again.';

        this.cdr.detectChanges();

        if (error.status === 401 || error.status === 403) {
          this.auth.logout();
          this.router.navigate(['/admin-login']);
        }
      }

    });
  }

  // Count enquiries by status
  getStatusCount(status: string): number {

    return this.enquiries.filter(
      enquiry => enquiry.status === status
    ).length;
  }

  // Search by customer name or destination
  get filteredEnquiries(): any[] {

    const search = this.searchText.toLowerCase().trim();

    return this.enquiries.filter(enquiry => {

      const name = String(enquiry.name ?? '').toLowerCase();

      const destination = String(
        enquiry.destination ?? ''
      ).toLowerCase();

      return name.includes(search) ||
             destination.includes(search);
    });
  }

  // Update enquiry status
  updateStatus(enquiry: any): void {

    this.enquiryService.updateEnquiryStatus(
      enquiry.id,
      enquiry.status
    ).subscribe({

      next: () => {

        this.loadEnquiries();

        alert('Enquiry status updated successfully!');
      },

      error: (error) => {

        console.error('Status update failed:', error);

        alert('Unable to update status. Please try again.');

        this.loadEnquiries();
      }

    });
  }

  // Open enquiry details popup
  viewDetails(enquiry: any): void {

    this.selectedEnquiry = enquiry;
  }

  // Close enquiry details popup
  closeDetails(): void {

    this.selectedEnquiry = null;
  }

  // Delete a travel enquiry
  deleteEnquiry(enquiry: any): void {

    const confirmed = confirm(
      `Are you sure you want to delete the enquiry from ${enquiry.name}?`
    );

    if (!confirmed) {
      return;
    }

    this.enquiryService.deleteEnquiry(enquiry.id).subscribe({

      next: () => {

        this.selectedEnquiry = null;

        this.loadEnquiries();

        alert('Enquiry deleted successfully!');
      },

      error: (error) => {

        console.error('Delete failed:', error);

        alert('Unable to delete enquiry. Please try again.');
      }

    });
  }

  // Admin logout
  logout(): void {

    this.auth.logout();

    this.router.navigate(['/admin-login']);
  }

}
