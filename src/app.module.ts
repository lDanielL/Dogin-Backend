import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuarios/usuario.module';
import { AuthModule } from './auth/auth.module';
import { CuidadorModule } from './cuidadores/cuidador.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 3, // Aquí se establece el número de intentos
      retryDelay: 3000, // Tiempo de espera en milisegundos entre intentos
    }),
    UsuarioModule,
    AuthModule,
    CuidadorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
