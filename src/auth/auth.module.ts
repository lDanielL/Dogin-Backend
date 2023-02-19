import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsuarioModule } from '../usuarios/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    //* chatgpt recomendo esto ver si funciona todo ok, ya que, usuariomodelu ya esta exportando el typeorm
    // TypeOrmModule.forFeature([Usuario]),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '8h'
          }
        }
      }
    }),
    forwardRef(()=> UsuarioModule),
  ],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule { }
