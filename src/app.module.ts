import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { CompaniesModule } from './companies/companies.module';
import { EventsModule } from './events/events.module';
import { DevicesModule } from './devices/devices.module';
import { ProductsModule } from './products/products.module';
import { ConsumptionsModule } from './consumptions/consumptions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    CommonModule,
    CompaniesModule,
    EventsModule,
    DevicesModule,
    ProductsModule,
    ConsumptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
