
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  SupportTicketService,
  SupportTicket,
  SupportTicketList,
  SupportTicketDetails
} from '../../services/support-ticket';

@Component({
  selector: 'app-support-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-tickets.html',
  styleUrl: './support-tickets.scss'
})
export class SupportTickets implements OnInit {

  // Customer ID used for testing the customer APIs.
  // Replace this with the logged-in customer's ID later.
  customerId = 1;

  // Select which view to display: customer or officer.
  viewMode: 'customer' | 'officer' = 'customer';

  // Stores the tickets displayed in the customer view.
  myTickets: SupportTicket[] = [];

  // Stores all tickets displayed in the officer view.
  allTickets: SupportTicketList[] = [];

  // Stores the details of the selected ticket.
  selectedTicket: SupportTicketDetails | null = null;

  // Fields used when creating a new ticket.
  subject = '';
  description = '';
  selectedFile: File | null = null;

  // Fields used when updating a ticket.
  updatedStatus = 'Pending';
  officerResponse = '';

  // Loading and message properties for the HTML page.
  isLoading = false;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private supportTicketService: SupportTicketService
  ) {}

  // Runs automatically when the component loads.
  ngOnInit(): void {
    this.loadMyTickets();
  }

  // Loads tickets belonging to the selected customer.
  loadMyTickets(): void {
    this.isLoading = true;
    this.clearMessages();

    this.supportTicketService
      .getMyTickets(this.customerId)
      .subscribe({
        next: (tickets) => {
          this.myTickets = tickets;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage =
            error.error?.message ||
            'Unable to load your support tickets.';

          this.isLoading = false;
        }
      });
  }

  // Loads every ticket for the officer view.
  loadAllTickets(): void {
    this.isLoading = true;
    this.clearMessages();

    this.supportTicketService
      .getAllTickets()
      .subscribe({
        next: (tickets) => {
          this.allTickets = tickets;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage =
            error.error?.message ||
            'Unable to load all support tickets.';

          this.isLoading = false;
        }
      });
  }

  // Switches between customer and officer views.
  changeView(mode: 'customer' | 'officer'): void {
    this.viewMode = mode;
    this.selectedTicket = null;
    this.clearMessages();

    if (mode === 'customer') {
      this.loadMyTickets();
    } else {
      this.loadAllTickets();
    }
  }

  // Reads the file selected in the HTML file input.
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.selectedFile =
      input.files && input.files.length > 0
        ? input.files[0]
        : null;
  }

  // Creates a new support ticket.
  addTicket(): void {
    this.clearMessages();

    if (this.customerId <= 0) {
      this.errorMessage = 'Please enter a valid customer ID.';
      return;
    }

    if (!this.subject.trim() || !this.description.trim()) {
      this.errorMessage =
        'Please enter both subject and description.';
      return;
    }

    this.isSubmitting = true;

    this.supportTicketService
      .addTicket(
        this.customerId,
        this.subject.trim(),
        this.description.trim(),
        this.selectedFile
      )
      .subscribe({
        next: (response) => {
          this.successMessage =
            response.message || 'Support ticket created successfully.';

          this.subject = '';
          this.description = '';
          this.selectedFile = null;

          this.isSubmitting = false;

          this.loadMyTickets();
        },
        error: (error) => {
          this.errorMessage =
            error.error?.message ||
            'Unable to create the support ticket.';

          this.isSubmitting = false;
        }
      });
  }

  // Loads and displays the details of a selected ticket.
  viewTicket(ticketId: number): void {
    this.clearMessages();

    this.supportTicketService
      .getTicketById(ticketId)
      .subscribe({
        next: (ticket) => {
          this.selectedTicket = ticket;
          this.updatedStatus = ticket.status;
          this.officerResponse = ticket.officerResponse || '';
        },
        error: (error) => {
          this.errorMessage =
            error.error?.message ||
            'Unable to load ticket details.';
        }
      });
  }

  // Updates a ticket's status and officer response.
  updateTicket(): void {
    if (!this.selectedTicket) {
      this.errorMessage = 'Please select a ticket first.';
      return;
    }

    this.clearMessages();

    const allowedStatuses = [
      'Pending',
      'InProgress',
      'Resolved'
    ];

    if (!allowedStatuses.includes(this.updatedStatus)) {
      this.errorMessage = 'Please select a valid ticket status.';
      return;
    }

    this.isSubmitting = true;

    this.supportTicketService
      .updateTicket(this.selectedTicket.ticketId, {
        status: this.updatedStatus,
        officerResponse: this.officerResponse.trim() || null
      })
      .subscribe({
        next: (response) => {
          this.successMessage =
            response.message || 'Support ticket updated successfully.';

          this.isSubmitting = false;

          // Refresh the appropriate ticket list.
          if (this.viewMode === 'officer') {
            this.loadAllTickets();
          } else {
            this.loadMyTickets();
          }

          // Refresh the selected ticket details.
          this.viewTicket(this.selectedTicket!.ticketId);
        },
        error: (error) => {
          this.errorMessage =
            error.error?.message ||
            'Unable to update the support ticket.';

          this.isSubmitting = false;
        }
      });
  }

  // Closes the selected ticket details.
  closeTicketDetails(): void {
    this.selectedTicket = null;
  }

  // Clears previous success and error messages.
  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
