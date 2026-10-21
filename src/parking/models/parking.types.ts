
export type VehicleType = 'BIKE' | 'CAR' | 'TRUCK';

export type SpotType = 'BIKE' | 'COMPACT' | 'LARGE';

export interface Vehicle {
  registrationNumber: string;
  type: VehicleType;
}

export interface ParkingSpot {
  id: string;
  type: SpotType;
  ticketId: string | null;
}

export interface ParkingTicket {
  id: string;
  vehicle: Vehicle;
  spotId: string;
  entryTime: Date;
  exitTime: Date | null;
  fee: number | null;
}
