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
import { tr } from '../utils/tr';
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
        const {
          page: { locale }
        } = this.props;
        const { name, email, message, recaptcha } = this.state;
        Api.post(Api.websiteBasePath + '/contact.php', {
          locale: locale,
          name: name,
          email: email,
          message: message,
          recaptcha: recaptcha
        })
          .then(response => {
            console.log('Server response: ' + JSON.stringify(response));
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
    const {
      page: { locale }
    } = this.props;
    const { name, email, message, formStatus } = this.state;
    return (
      <div className="contactForm">
        <Form onSubmit={this.handleFormSubmit}>
          <FormGroup>
            <Label for="name">{tr('name', locale)}</Label>
            <Input type="text" id="name" value={name} onChange={e => this.setState({ name: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="email">{tr('email', locale)}</Label>
            <Input type="email" id="email" value={email} onChange={e => this.setState({ email: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="request">{tr('message', locale)}</Label>
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
          {formStatus === FormStatus.Validating &&
            !this.checkIfFormValid() && <Alert color="danger">{tr('completeAllFields', locale)}</Alert>}
          {formStatus === FormStatus.Saved && <Alert color="success">{tr('contactFormSent', locale)}</Alert>}
          {formStatus === FormStatus.Error && <Alert color="danger">{tr('oops', locale)}</Alert>}
          <Button color="primary" disabled={formStatus === FormStatus.Saving}>
            {tr('submitContactForm', locale)}
          </Button>
          {formStatus === FormStatus.Saving && <Spinner />}
        </Form>
      </div>
    );
  }
}
