import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN_NAME, FIREBASE_ADMIN_PROVIDER } from './constant';

const serviceAccount = require('../../../data/firebase.json');

@Module({
  providers: [
    {
      provide: FIREBASE_ADMIN_PROVIDER,
      useValue: admin.initializeApp(
        {
          credential: admin.credential.cert(serviceAccount)
        },
        FIREBASE_ADMIN_NAME
      )
    }
  ],
  exports: []
})
export class FirebaseModule {}
