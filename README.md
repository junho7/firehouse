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
