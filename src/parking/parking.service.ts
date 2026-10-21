
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type {
  ParkingTicket,
  Vehicle,
  VehicleType,
  SpotType,
} from './models/parking.types';
import type { ParkingRepository } from './repositories/parking.repository';
import { PARKING_REPOSITORY } from './constants';

@Injectable()
export class ParkingService {
  constructor(
    @Inject(PARKING_REPOSITORY)
    private readonly repository: ParkingRepository,
  ) {}

  // Allocate a compatible free spot and issue a ticket.
  park(registrationNumber: string, type: VehicleType): ParkingTicket {
    const registration = registrationNumber.trim().toUpperCase();

    const existing =
      this.repository.findActiveTicketByRegistration(registration);

    if (existing) {
      throw new ConflictException('Vehicle is already parked');
    }

    const vehicle: Vehicle = { registrationNumber: registration, type };

    const spot = this.repository.getAllSpots().find(
      (candidate) =>
        candidate.ticketId === null &&
        this.canFit(candidate.type, vehicle.type),
    );

    if (!spot) {
      throw new ConflictException('No compatible parking spot available');
    }

    const ticket: ParkingTicket = {
      id: randomUUID(),
      vehicle,
      spotId: spot.id,
      entryTime: new Date(),
      exitTime: null,
      fee: null,
    };

    spot.ticketId = ticket.id;
    this.repository.createTicket(ticket);

    return ticket;
  }

  // Close a ticket, calculate the fee, and free the spot.
  unpark(ticketId: string): ParkingTicket {
    const ticket = this.repository.findTicketById(ticketId);

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    if (ticket.exitTime !== null) {
      throw new ConflictException('Vehicle has already exited');
    }

    const spot = this.repository.findSpotById(ticket.spotId);

    if (!spot || spot.ticketId !== ticket.id) {
      throw new InternalServerErrorException(
        'Parking state is inconsistent',
      );
    }

    const exitTime = new Date();
    const elapsedMs = exitTime.getTime() - ticket.entryTime.getTime();
    const hours = Math.max(1, Math.ceil(elapsedMs / 3_600_000));

    const hourlyRate: Record<VehicleType, number> = {
      BIKE: 20,
      CAR: 50,
      TRUCK: 100,
    };

    ticket.exitTime = exitTime;
    ticket.fee = hours * hourlyRate[ticket.vehicle.type];

    spot.ticketId = null;
    this.repository.updateTicket(ticket);

    return ticket;
  }

  // Return a parking availability summary.
  getAvailability() {
    const spots = this.repository.getAllSpots();

    return {
      total: spots.length,
      available: spots.filter((spot) => spot.ticketId === null).length,
      spots: spots.map((spot) => ({
        id: spot.id,
        type: spot.type,
        available: spot.ticketId === null,
      })),
    };
  }

  // Find a currently parked vehicle.
  getVehicle(registrationNumber: string): ParkingTicket {
    const registration = registrationNumber.trim().toUpperCase();

    const ticket =
      this.repository.findActiveTicketByRegistration(registration);

    if (!ticket) {
      throw new NotFoundException('No active parking found for vehicle');
    }

    return ticket;
  }

  private canFit(spotType: SpotType, vehicleType: VehicleType): boolean {
    switch (vehicleType) {
      case 'BIKE':
        return true;
      case 'CAR':
        return spotType === 'COMPACT' || spotType === 'LARGE';
      case 'TRUCK':
        return spotType === 'LARGE';
    }
  }
}
