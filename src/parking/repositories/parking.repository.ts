
import type {
    ParkingSpot,
    ParkingTicket,
  } from '../models/parking.types';
  
  export interface ParkingRepository {
    getAllSpots(): ParkingSpot[];
    findSpotById(id: string): ParkingSpot | undefined;
    findTicketById(id: string): ParkingTicket | undefined;
  
    findActiveTicketByRegistration(
      registrationNumber: string,
    ): ParkingTicket | undefined;
  
    createTicket(ticket: ParkingTicket): void;
    updateTicket(ticket: ParkingTicket): void;
  }
  