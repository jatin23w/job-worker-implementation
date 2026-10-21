
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common';
  
  import { ParkingService } from './parking.service';
  import { ParkVehicleDto } from './dto/park-vehicle.dto';
  
  @Controller('parking')
  export class ParkingController {
    constructor(private readonly parkingService: ParkingService) {}
  
    @Post('park')
    park(@Body() dto: ParkVehicleDto) {
      return this.parkingService.park(
        dto.registrationNumber,
        dto.type,
      );
    }
  
    @Post('unpark/:ticketId')
    unpark(@Param('ticketId') ticketId: string) {
      return this.parkingService.unpark(ticketId);
    }
  
    @Get('availability')
    getAvailability() {
      return this.parkingService.getAvailability();
    }
  
    @Get('vehicles/:registrationNumber')
    getVehicle(@Param('registrationNumber') registrationNumber: string) {
      return this.parkingService.getVehicle(registrationNumber);
    }
  }
  