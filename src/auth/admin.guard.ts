import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Role } from "src/user/entities/role";
import { User } from "src/user/entities/user.entity";


@Injectable()
export class AdminGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user: User = request.user

        return user && user.role === Role.Merchant_admin
    }
    
}