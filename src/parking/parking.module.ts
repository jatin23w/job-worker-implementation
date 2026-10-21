
import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { PARKING_REPOSITORY } from './constants';
import { InMemoryParkingRepository } from './repositories/in-memory-parking.repository';

@Module({
  controllers: [ParkingController],
  providers: [
    ParkingService,
    InMemoryParkingRepository,
    {
      provide: PARKING_REPOSITORY,
      useExisting: InMemoryParkingRepository,
    },
  ],
})
export class ParkingModule {}
