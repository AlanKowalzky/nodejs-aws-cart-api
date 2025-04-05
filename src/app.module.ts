import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.entity';
import { AppController } from './app.controller';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [AuthModule, CartModule, OrderModule, ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database-1.cexgwe8kuwfo.us-east-1.rds.amazonaws.com',
      port: 5432,
      username: 'your_user',
      password: process.env.DB_PASSWORD,
      entities: [User],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [],

})
export class AppModule {}
