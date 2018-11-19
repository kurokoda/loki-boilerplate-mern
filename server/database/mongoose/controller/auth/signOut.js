export const signOut = (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        console.log(error); // tslint:disable-line:no-console
      } else {
        console.log('success'); // tslint:disable-line:no-console
      }
    });
  } else {
    console.log('success'); // tslint:disable-line:no-console
  }
};
