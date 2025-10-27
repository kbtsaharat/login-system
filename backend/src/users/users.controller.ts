import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ตัวอย่าง: ดึง profile ผู้ใช้จาก JWT
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // ตัวอย่างเพิ่มเติม: ดึงผู้ใช้ทั้งหมด (optional)
  @Get()
  async findAll() {
    return this.usersService.findAll?.() ?? { message: 'Not implemented' };
  }
}
