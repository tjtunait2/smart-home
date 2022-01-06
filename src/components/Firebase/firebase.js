import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import hash from 'object-hash';

const config = {
  apiKey: "AIzaSyCx_nMuyJecSMQYeLTGfMvXTbFAlYW20Mk",
  authDomain: "smart-home-97b39.firebaseapp.com",
  databaseURL: "https://smart-home-97b39-default-rtdb.firebaseio.com",
  projectId: "smart-home-97b39",
  storageBucket: "smart-home-97b39.appspot.com",
  messagingSenderId: "352148317211",
  appId: "1:352148317211:web:ba651e2fe65d68b2e104be",
  measurementId: "G-JS2E6RBGN2"
};


class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();

        this.doCreateUserWithEmailAndPassword = this.doCreateUserWithEmailAndPassword.bind(this);
        this.doSignInWithEmailAndPassword = this.doSignInWithEmailAndPassword.bind(this);
        this.doPasswordUpdate = this.doPasswordUpdate.bind(this);
        this.users = this.users.bind(this);
        this.user = this.user.bind(this);
    }


    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    data_in = (espid) => this.db.ref(`house/${espid}/data_in`);
    control_out = (espid) => this.db.ref(`house/${espid}/control_out`);

    doCreateUserWithEmailAndPassword = (username, email, espid, password) =>
      this.users().once('value').then( snapshot => {
        const uid = hash(email);
        return new Promise((resolve, reject) => {
          const id = snapshot.child(`${uid}`).exists();
          if(id) {
            reject('This account already exists');
          }
          else {
            this.users().child(`${uid}`).set({'name': username, 'email': email, 'house': espid, 'password': hash(password), 'code': Math.floor(Math.random() * 99999) + 10000});
            resolve('Success!!');
          }
        })
      });


    doSignInWithEmailAndPassword = (email, password) =>
      this.users().once('value').then(snapshot => {
        const uid = hash(email);
        const user = snapshot.child(`${uid}`);
        return new Promise((resolve, reject) => {
          if(user.exists())
            if(user.val().password === hash(password)) {
              resolve(user.val());
            }
          reject('Username or password is wrong!!');
        });
      })



    doPasswordUpdate = (user, password) => {
      const userId = hash(user.email);
      this.user(userId).update({'password': hash(password)});
    }


}

export default Firebase;
