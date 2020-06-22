import SibApiV3Sdk from 'sib-api-v3-sdk';
import {
  MAILER
} from '@/config';

SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = MAILER.KEY;

const SibApi = new SibApiV3Sdk.SMTPApi();

export default {
  async sendCallback({ phone }) {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    Object.assign(sendSmtpEmail, {
      to: [{ email: MAILER.EMAIL }],
      sender: { email: MAILER.EMAIL },
      htmlContent: `<span>Перезвоните мне, пожалуйста:</span> <a href="tel:${phone}">${phone}</a>`,
      subject: 'Перезвоните мне'
    });

    await SibApi.sendTransacEmail(sendSmtpEmail);
  },
  async sendOrder({ order, email }) {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    Object.assign(sendSmtpEmail, {
      to: [{ email }],
      sender: { email: MAILER.EMAIL },
      htmlContent: `<a href="${order}">Нажмите, чтобы просмотреть ваш заказ</a>`,
      subject: 'Заказ'
    });

    await SibApi.sendTransacEmail(sendSmtpEmail);
  }
};
