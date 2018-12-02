import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Alert from 'reactstrap/lib/Alert';
import Button from 'reactstrap/lib/Button';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import { ContactPageProps } from 'src/containers/ContactPage';
import { Api } from '../../scripts/Api';
import { FormStatus } from '../models/FormStatus';
import { Spinner } from './Spinner';

export interface ContactFormProps extends ContactPageProps {}

interface ContactFormState {
  name: string;
  email: string;
  message: string;
  recaptcha: string;
  formStatus: FormStatus;
}

export class ContactForm extends React.Component<ContactFormProps, ContactFormState> {
  public state: ContactFormState = {
    name: '',
    email: '',
    message: '',
    recaptcha: null,
    formStatus: FormStatus.Initial
  };

  private handleRecaptchaResolved = response => {
    this.setState({ recaptcha: response });
  };

  private checkIfFormValid = () => {
    const { name, email, message, recaptcha } = this.state;
    return !!(recaptcha && name && email && message);
  };

  private handleFormSubmit = e => {
    e.preventDefault();
    if (this.checkIfFormValid()) {
      this.setState({ formStatus: FormStatus.Saving }, () => {
        const { locale } = this.props;
        const { name, email, message, recaptcha } = this.state;
        Api.post(Api.websiteBasePath + '/contact.php', {
          locale: locale,
          name: name,
          email: email,
          message: message,
          recaptcha: recaptcha
        })
          .then(() => {
            this.setState({ formStatus: FormStatus.Saved });
          })
          .catch(error => {
            console.log('Oops, something went wrong! ' + JSON.stringify(error));
            this.setState({ formStatus: FormStatus.Error });
          });
      });
    } else {
      this.setState({ formStatus: FormStatus.Validating });
    }

    return false;
  };

  public render() {
    const { text } = this.props;
    const { name, email, message, recaptcha, formStatus } = this.state;
    return (
      <div className="contactForm">
        <Form onSubmit={this.handleFormSubmit}>
          <FormGroup>
            <Label for="name">{text.name}</Label>
            <Input type="text" id="name" value={name} onChange={e => this.setState({ name: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="email">{text.email}</Label>
            <Input type="email" id="email" value={email} onChange={e => this.setState({ email: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="request">{text.message}</Label>
            <Input
              type="textarea"
              id="request"
              value={message}
              onChange={e => this.setState({ message: e.target.value })}
            />
          </FormGroup>
          <div className="captcha">
            <ReCAPTCHA sitekey="6LcmM3cUAAAAAMlm-0Mz-2NpkhY-vog1cag9y_fC" onChange={this.handleRecaptchaResolved} />
          </div>
          {formStatus === FormStatus.Validating && !this.checkIfFormValid() && (
            <Alert color="danger">{text.completeAllFields}</Alert>
          )}
          {formStatus === FormStatus.Saved && <Alert color="success">{text.contactFormSent}</Alert>}
          {formStatus === FormStatus.Error && <Alert color="danger">{text.oops}</Alert>}
          <Button color="primary" disabled={formStatus === FormStatus.Saving || !recaptcha}>
            {text.submitContactForm}
          </Button>
          {formStatus === FormStatus.Saving && <Spinner />}
        </Form>
      </div>
    );
  }
}
