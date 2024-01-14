import { Module } from '@nestjs/common';
import { MessageController, RoomController } from './controllers';
import { MessageService, RoomService } from './services';

@Module({
  controllers: [MessageController, RoomController],
  providers: [MessageService, RoomService],
})
export class ChatModule {}
