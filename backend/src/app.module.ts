import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RoutesModule } from './routes/routes.module';
import { MapsModule } from './maps/maps.module';

@Module({
  imports: [PrismaModule, RoutesModule, MapsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
