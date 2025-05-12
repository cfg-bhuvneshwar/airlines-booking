import database from '@react-native-firebase/database';
import { MyCallback, UserData } from './types';

export const createOrUpdateUser = (user: UserData, callback: MyCallback) => {
  database()
    .ref('/airlines/users')
    .child(user.uid)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        database()
          .ref('/airlines/users')
          .child(user.uid)
          .update(user)
          .then(() => {
            callback();
          });
      } else {
        database()
          .ref('/airlines/users')
          .child(user.uid)
          .set(user)
          .then(() => {
            callback();
          })
          .catch(error => {
            console.log('added', error);
          });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
