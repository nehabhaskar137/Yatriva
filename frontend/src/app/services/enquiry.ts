
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  private apiUrl = 'http://127.0.0.1:8000/api/enquiries/';

  constructor(private http: HttpClient) {}

  // Submit a new travel enquiry
  submitEnquiry(enquiry: any): Observable<any> {
    return this.http.post(
      this.apiUrl + 'submit/',
      enquiry
    );
  }

  // Get all travel enquiries
  getEnquiries(): Observable<any> {
    return this.http.get(
      this.apiUrl + 'all/'
    );
  }

  // Update enquiry status
  updateEnquiryStatus(id: number, newStatus: string): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}update-status/${id}/`,
      { status: newStatus }
    );
  }

  // Delete a travel enquiry
  deleteEnquiry(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}delete/${id}/`
    );
  }

}
