import { UnauthorizedException } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { ERR_UNAUTHERIZED } from '../errors';

// initialize firebaseApp using credential from GOOGLE_APPLICATION_CREDENTIALS in env
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
});

export const firebaseAuth = async (authToken) => {
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(authToken);
    return decodedToken;
  } catch (error) {
    throw new UnauthorizedException(ERR_UNAUTHERIZED(error.errorInfo));
  }
};

export const getUserDetails = async (uid) => {
  try {
    const userDetails = await firebaseAdmin.auth().getUser(uid);
    return userDetails;
  } catch (error) {
    throw new UnauthorizedException(ERR_UNAUTHERIZED(error.errorInfo));
  }
};

module.exports = {
  firebaseAdmin,
  firebaseAuth,
  getUserDetails,
};
