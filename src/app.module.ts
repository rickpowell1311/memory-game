import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { PlayerModule } from './player/player.module';
import { DataAccessModule } from './data_access/data_access.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GameModule, 
    PlayerModule,
    DataAccessModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      database: 'memorygame',
      username: 'postgres',
      password: 'Password123!',
      entities: [],
      synchronize: true
    })
  ]
})
export class AppModule {}
