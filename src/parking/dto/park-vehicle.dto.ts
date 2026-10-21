
import {
  IsIn,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ParkVehicleDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @Matches(/\S/, { message: 'Registration number cannot be blank' })
  registrationNumber!: string;

  @IsIn(['BIKE', 'CAR', 'TRUCK'])
  type!: 'BIKE' | 'CAR' | 'TRUCK';
}
