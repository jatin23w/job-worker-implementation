
import { Injectable } from '@nestjs/common';
import type {
  ParkingSpot,
  ParkingTicket,
} from '../models/parking.types';
import type { ParkingRepository } from './parking.repository';

@Injectable()
export class InMemoryParkingRepository implements ParkingRepository {
  private readonly spots: ParkingSpot[] = [
    { id: 'B1', type: 'BIKE', ticketId: null },
    { id: 'B2', type: 'BIKE', ticketId: null },
    { id: 'C1', type: 'COMPACT', ticketId: null },
    { id: 'C2', type: 'COMPACT', ticketId: null },
    { id: 'L1', type: 'LARGE', ticketId: null },
  ];

  private readonly tickets = new Map<string, ParkingTicket>();

  getAllSpots(): ParkingSpot[] {
    return this.spots;
  }

  findSpotById(id: string): ParkingSpot | undefined {
    return this.spots.find((spot) => spot.id === id);
  }

  findTicketById(id: string): ParkingTicket | undefined {
    return this.tickets.get(id);
  }

  findActiveTicketByRegistration(
    registrationNumber: string,
  ): ParkingTicket | undefined {
    return [...this.tickets.values()].find(
      (ticket) =>
        ticket.vehicle.registrationNumber === registrationNumber &&
        ticket.exitTime === null,
    );
  }

  createTicket(ticket: ParkingTicket): void {
    this.tickets.set(ticket.id, ticket);
  }

  updateTicket(ticket: ParkingTicket): void {
    this.tickets.set(ticket.id, ticket);
  }
}
