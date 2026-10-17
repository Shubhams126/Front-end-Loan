import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Data returned when a customer views their own tickets.
export interface SupportTicket {
  ticketId: number;
  subject: string;
  description: string;
  attachmentPath: string | null;
  createdDate: string;
  status: string;
  officerResponse: string | null;
}

// Data returned when an officer views all tickets.
export interface SupportTicketList {
  ticketId: number;
  loanAccountNo: string;
  customerName: string;
  subject: string;
  status: string;
  createdDate: string;
}

// Data returned when viewing one ticket in detail.
export interface SupportTicketDetails {
  ticketId: number;
  customerName: string;
  loanAccountNo: string;
  subject: string;
  description: string;
  attachmentPath: string | null;
  createdDate: string;
  status: string;
  officerResponse: string | null;
}

// Data sent when updating a ticket.
export interface UpdateSupportTicket {
  status: string;
  officerResponse: string | null;
}

// Response returned by create and update APIs.
export interface SupportTicketMessage {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupportTicketService {

  // Base URL of the .NET SupportTicketController.
  private readonly apiUrl =
    'https://localhost:7121/api/SupportTicket';

  constructor(private http: HttpClient) {}

  // API 1: Create a ticket, optionally including an attachment.
  addTicket(
    customerId: number,
    subject: string,
    description: string,
    attachment?: File | null
  ): Observable<SupportTicketMessage> {

    // FormData is required because the backend accepts [FromForm].
    const formData = new FormData();

    formData.append('Subject', subject);
    formData.append('Description', description);

    // Add the file only when the customer selects one.
    if (attachment) {
      formData.append('Attachment', attachment);
    }

    // Send customerId as a query parameter.
    const params = new HttpParams()
      .set('customerId', customerId);

    return this.http.post<SupportTicketMessage>(
      this.apiUrl,
      formData,
      { params }
    );
  }

  // API 2: Get all tickets belonging to one customer.
  getMyTickets(customerId: number): Observable<SupportTicket[]> {
    const params = new HttpParams()
      .set('customerId', customerId);

    return this.http.get<SupportTicket[]>(
      `${this.apiUrl}/my-tickets`,
      { params }
    );
  }

  // API 3: Get every support ticket for the officer view.
  getAllTickets(): Observable<SupportTicketList[]> {
    return this.http.get<SupportTicketList[]>(this.apiUrl);
  }

  // API 4: Get the full details of one ticket.
  getTicketById(
    ticketId: number
  ): Observable<SupportTicketDetails> {
    return this.http.get<SupportTicketDetails>(
      `${this.apiUrl}/${ticketId}`
    );
  }

  // API 5: Update a ticket's status and officer response.
  updateTicket(
    ticketId: number,
    ticket: UpdateSupportTicket
  ): Observable<SupportTicketMessage> {
    return this.http.put<SupportTicketMessage>(
      `${this.apiUrl}/${ticketId}`,
      ticket
    );
  }
}
