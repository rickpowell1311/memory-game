import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { PlayerModule } from './player/player.module';
import { DataAccessModule } from './data_access/data_access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './data_access/typeorm.config';

@Module({
  imports: [
    GameModule, 
    PlayerModule,
    DataAccessModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let config = configService.get('typeorm');
        config.migrations = [];
        return config;
      }
    })
  ]
})
export class AppModule {}
