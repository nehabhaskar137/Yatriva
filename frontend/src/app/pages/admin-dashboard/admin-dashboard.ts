
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private enquiryService: EnquiryService,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Check whether admin is logged in
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/admin-login']);
      return;
    }

    this.loadEnquiries();
  }

  // Load all travel enquiries
  loadEnquiries(): void {
    this.enquiryService.getEnquiries().subscribe({

      next: (response) => {
        this.enquiries = response;
        console.log('Enquiries loaded:', response);
      },

      error: (error) => {
        console.error('Error loading enquiries:', error);

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

    return this.enquiries.filter(enquiry =>
      enquiry.name.toLowerCase().includes(search) ||
      enquiry.destination.toLowerCase().includes(search)
    );
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
