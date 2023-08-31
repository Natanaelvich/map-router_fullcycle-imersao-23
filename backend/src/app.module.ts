import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RoutesModule } from './routes/routes.module';
import { MapsModule } from './maps/maps.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RoutesModule,
    MapsModule,
  ],
})
export class AppModule {}
