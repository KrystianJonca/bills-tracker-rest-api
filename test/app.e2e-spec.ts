import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { DatabaseService } from '../src/database/database.service';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let db: DatabaseService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen('3001');
    db = app.get(DatabaseService);
    await db.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3001');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@email.ok',
      password: '1234',
    };
    describe('Signup', () => {
      it('should throw when password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw when email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw when body is empty', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('should throw when password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw when email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw when body is empty', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('user_access_token', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get user', () => {
      it('should throw if unathorized', () => {
        return pactum.spec().get('/user').expectStatus(401);
      });
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/user')
          .withHeaders({ Authorization: 'Bearer $S{user_access_token}' })
          .expectStatus(200)
          .expectBodyContains('email');
      });
    });

    describe('Edit user', () => {
      it('should edit the user', () => {
        const editDto: EditUserDto = {
          firstName: 'Test',
          lastName: 'User',
        };
        return pactum
          .spec()
          .patch('/user')
          .withBody(editDto)
          .withHeaders({ Authorization: 'Bearer $S{user_access_token}' })
          .expectStatus(200)
          .expectBodyContains(editDto.firstName);
      });
    });

    describe('Delete user', () => {
      it('should delete the user', () => {
        return pactum
          .spec()
          .delete('/user')
          .withHeaders({ Authorization: 'Bearer $S{user_access_token}' })
          .expectStatus(200)
          .expectBodyContains('email');
      });
    });
  });

  describe('Bills', () => {
    describe('Get bill', () => {
      it.todo('Should get the bill');
    });

    describe('Get all bills', () => {
      it.todo('Should get all the bills');
    });

    describe('Create new bill', () => {
      it.todo('Should create a new bill');
    });

    describe('Edit bill', () => {
      it.todo('Should edit the bill');
    });

    describe('Delete bill', () => {
      it.todo('Should delete the bill');
    });
  });
});
