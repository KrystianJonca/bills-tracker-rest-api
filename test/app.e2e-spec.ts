import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { DatabaseService } from '../src/database/database.service';
import { AuthDto } from 'src/auth/dto';

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
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });

  describe('User', () => {
    describe('Get user', () => {
      it.todo('Should get the user');
    });

    describe('Edit user', () => {
      it.todo('Should edit the user');
    });

    describe('Delete user', () => {
      it.todo('Should delete the user');
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
