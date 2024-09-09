import * as dotenv from 'dotenv';
import firebaseAdmin from 'firebase-admin';

dotenv.config();

const firebaseConfig = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  storageBucket: 'iprep-7f10a.appspot.com',
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

const ADMIN_CONFIG = {
  credential: firebaseAdmin.credential.cert(firebaseConfig),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

const ADMIN_CONFIG_PAL = {
  credential: firebaseAdmin.credential.cert(firebaseConfig),
  databaseURL: process.env.FIREBASE_DATABASE_URL_PAL,
};

const ADMIN_CONFIG_APP = {
  credential: firebaseAdmin.credential.cert(firebaseConfig),
  databaseURL: process.env.FIREBASE_DATABASE_IPREP_APP,
};


const adminDB = firebaseAdmin.initializeApp(ADMIN_CONFIG).database();
const palDB = firebaseAdmin.initializeApp(ADMIN_CONFIG_PAL, 'pal').database();
const appDB = firebaseAdmin.initializeApp(ADMIN_CONFIG_APP, 'app').database();

export {adminDB, palDB, appDB};