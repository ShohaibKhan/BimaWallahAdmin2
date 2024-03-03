const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
  type: "service_account",
  projectId: "bimawallah-deb52",
  private_key_id: "6f81a8b27a22b7d9e4c56aacb089c0f28e6ad03b",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+j8+JtlgfuGvT\npO6tUin6yWvnQMhxJD6xARmvr+AoIem+ADgn1/bawui0V8IznucZzaT0tyG+TIxC\nLBUPViBi44GhKoIWj6ggaa86f1RAnGjXEext0gXhObUBFyML9CJagR2bQEm45kw7\nkxbYDQuo7rTH0wfXGwPf3+h62CvoXjQjqklRserq4O2norfGrZmAzZZODvn1JsAG\nKY7dFKZU4as4id+8MbXk4OoQLOjFNMshMMVVJI+zD+s0umovvJbcqIZyDLKu/hl9\nGeChr+DAfDqlZ3CEh92S9sLy56lHif+kRz+N9MpeZl4VmxJisgDVO1xc+WXefp9F\nohqv2DQ7AgMBAAECggEAGgRBVfBetKn1krYkXeZnU9V3FWH7W7MSmhDn5FwTMvd6\nVZXrFMl/6tsMcT7ABVMvAw9X848jHLuPtKMXFvpvvoCIHKxUiWcAkbhME6T5qD6S\nc7Z/PHkdk2PRCf6SKtogbJHPLHiI+CT9CG8rAcE6M8yvQs7VdbE7BLApqcfkqrsh\nRhR4MPMM2YxzVpTcOCbpddsBT7D+s2CW+tPgy/iBG9u13+sGS7tWBHgddmxj6JAo\nz4SFEA6eDvkKMavWzitTD5ClzjXXiH4NyfZtdI4ge5a2kQ3JkForLZ1FMEgT2c1p\njwxybyhdWBtUXinNoQ78eRsk1haXr0X9/5CbzJ8dZQKBgQDwRVvEEYAA+bvVf8ys\nYmZ/rPULxW7ThPXVSIoz/Q8jU+YVc8Nbe4n8AvUSEFmi2GVNSJEbASqkFGI5u5mp\nVbVbhBsph0sBqmVO607aqkrNFmumUssA7geRJw4oj1btGB4VPML5/VpK6mqEZDKW\nJJbIxudQIxA+hSLN2/z5wW8VvwKBgQDLCWNxI6mdea8XEUU4NgYUEalih4eTes/X\nvsG2sXZWmlvpqvE6K6Lpik8903QLi4BbMVox1+02sYQou8bxZ6aTfH8TRoX1VRBS\nSXUXa3f84i4ouNue5IvXot9aWvIcKlmNFu7DfqQuyMEVWQ0p8i7Ncoztw0aegTzh\nojiNbugYhQKBgQCuVpVESjJoAs0BGE8pkeivoY7YsLQ+tE4wKQdmu6r9RkY/sJTC\nz3wKqRarucNgfsXactofDxSio8u1+mJ/1RnXwp523p1VIw+JWQIJdeD6uNb5gz+b\neBtzfjQux/sZ5BMH8+PBwsx+aWNKlu2BtiDWpER5CEgkJTRgzMvdaTayPwKBgQDE\nrSeC5UTcoo8VDUm8Fbj1n9Yw95BBMGo9Vy9WxbkYUxZN16Us8DAzgiMYhMiYll2T\n+M6iEcRbgsG+o4cnOXyGycZe6aXB7NCOpVGjihsFACQulkNIO6OrEr7BS+/TkMKG\nhXxsKzTnjNhc0ZKK22qy4Q/bEZpK2G4dM4MMni598QKBgGtYtgD0YEBR/k2px2BA\nnkE1kxOJ5dxCoeNuCicDfu0m2385cF7cm1H1gpuV16y/g+eMGo1S6x5CqrvqlVl6\n6miuZjuUSjMWRp5sVcECD31F0l4Jgu1qs3ouThjxamaSp4MQTo1UNCN1g5vJR1x3\nkqu3GLNIPL686pPK5ddsn+V6\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-uehtd@bimawallah-deb52.iam.gserviceaccount.com",
  client_id: "112890657533169352521",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  storageBucket: 'bimawallah-deb52.appspot.com',
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uehtd%40bimawallah-deb52.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage=getStorage(app);

module.exports = {db,storage};