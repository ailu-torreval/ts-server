import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
      origin: "*", // Replace with your frontend URL
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })
export class OrderGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('New client connected');
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected');
  }

  @SubscribeMessage('joinOrderRoom')
  handleJoinOrderRoom(client: Socket, orderId: string) {
    client.join(`order_${orderId}`);
    console.log(`Client joined room order_${orderId}`);
  }

  emitOrderAccepted(orderId: string) {
    console.log('Emitting order accepted for order from socket', orderId);
    this.server.to(`order_${orderId}`).emit('orderAccepted', { orderId });
  }
}