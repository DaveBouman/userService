class SendGridMessage {
  from!: string;
  to!: string;
  subject!: string;
  text!: string;
  html!: string;
  attachments?: [
    {
      content: string,
      filename: string,
      type: string,
      disposition: string
    }
  ]
  cc?: [{ name: string, email: string }];
}

export default SendGridMessage