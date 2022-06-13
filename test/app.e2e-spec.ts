import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { DatabaseService } from '../src/database/database.service';

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
    await app.listen('3000');
    db = app.get(DatabaseService);
    await db.cleanDb();
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Signin', () => {
      it.todo('Should sign in');
    });

    describe('Signup', () => {
      it.todo('Should sign up');
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
