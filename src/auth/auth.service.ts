import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signin() {
    return 'Signin';
  }

  signup() {
    return 'Signup';
  }
}
