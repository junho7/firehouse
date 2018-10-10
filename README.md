# Firehouse

## Requirements

* `firebase` and `@angular/fire` must be installed on the project.
* `chance` is optional for testing.
* `AngularFire` must be initialized on app module like below

```` typescript
@NgModule({
  imports: [
    ...
    AngularFireModule.initializeApp( /* ... firebase config ... */ ),
    AngularFirestoreModule,
    AngularFireAuthModule
    ...
  ],
  ...
})
export class AppModule {}
````

## Sample code

### How to get user data

* You need to get data when the user auth changed.

```` typescript
this.firehouse.auth.onAuthStateChanged(async () => {
  if (this.firehouse.isLoggedIn) {
    const re = await this.firehouse.userGet(this.firehouse.currentUser.uid).then(user => {
      this.form = user;
      this.a.render();
    }).catch(e => e);
    if (this.firehouse.isError(re)) {
      this.a.error(re);
    }
  }
});
````

### User registration

* When you put user registration form and profile update form in one componet(tempalte),
  * use the following code.

```` typescript
load = false;
subscriber;
form = {};
constructor(
  public a: AppService,
  public firehouse: FirehouseService
) {
  this.subscriber = this.firehouse.auth.onAuthStateChanged(async user => {
    if (this.load) {
      return;
    }
    this.load = true;
    if (user) {
      const re = await this.firehouse.userGet(this.firehouse.currentUser.uid).catch(e => e);
      if (this.firehouse.isError(re)) {
        this.a.error(re);
        return;
      }
      this.form = re;
      this.a.render();
    }
  });
}

ngOnDestroy() {
  if (this.subscriber) {
    this.subscriber(); // unsubscribe
    this.subscriber = null;
  }
}
 async onSubmit() {
    if (this.firehouse.isLoggedIn) {
      const re = await this.firehouse.userUpdate(this.form).catch(e => e);
      if (this.firehouse.isError(re)) {
        this.a.error(re);
      } else {
        // profile upload success
      }

    } else {
      const re = await this.firehouse.userRegister(this.form).catch(e => e);
      if (re.code === void 0) {
        // do something after registration
      } else {
        this.a.error(re);
      }
    }
    return false;
  }
````

## Common pitfalls

* The following shows a common pitfall you may be trapped.
  * It first creates account with email/password
  * And inside the `firehouse.userRegister`, it will create user profile documentation under
    `/users` collection.
  * Before it creates a doc undre `/users`, it will try to read it because it listens the user staet change.
  * So, it reads the user data before it exists.
  * That's why you get `premission-denied` error.

```` typescript
this.f.fireAuth.auth.onAuthStateChanged( async () => {
  console.log(`auth.onAuthStateChanged() happens right after email/password registration before updated /users collection`);
  if ( this.f.isLoggedIn ) {
    console.log(`Since the user has logged in already
                  and it is trying to get user data from /users collection which is not exists yet.`);
    const re = await this.f.userGet( this.f.currentUser.uid ).then( user => {
      this.form = user;
      this.a.render();
      }).catch( e => e);
      if ( this.f.isError(re) ) {
        console.log(`That's why you get permission-denied error here!`);
        this.a.error(re);
      }
  }

/**
 * going to register
 */
  const re = await this.f.userRegister( this.form ).catch(e => e);
if ( re.code === void 0 ) {
  // this.a.alert('Register success');
  // this.a.openHome();
} else {
  this.a.error( re );
}
});
````
