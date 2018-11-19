import PasswordResetRequest from '../../schema/passwordResetRequest';
import { randomString } from '../../service/crypto';
import { sendPasswordResetEmail } from '../../service/email';

export const passwordResetRequest = (req, res) => {
  const passwordResetRequestData = {
    email: req.body.email,
    token: randomString(8)
  };
  PasswordResetRequest.create(passwordResetRequestData)
    .then(() =>
      PasswordResetRequest.findOne({ token: passwordResetRequestData.token })
    )
    .then(resetRequest => {
      if (resetRequest) {
        // TODO send email
        console.log('Sending email', passwordResetRequestData.email);
        sendPasswordResetEmail(
          passwordResetRequestData.email,
          passwordResetRequestData.token
        );
        res.status(200).send('Success: password request email sent');
      } else {
        res.status(404).send('Error: PasswordResetRequest not found');
      }
    })
    .catch(error => {
      res.status(500).send('Error: ', error);
    });
};
