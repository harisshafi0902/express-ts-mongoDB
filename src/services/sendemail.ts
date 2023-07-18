import { NextFunction, Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { CronJob } from 'cron';
import { promises } from 'dns';

export async function emailSend(): Promise<boolean> {
  try {
    let testaccount = nodemailer.createTestAccount();
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        // user: (await testaccount).user,
        // pass: (await testaccount).pass,
        user: 'luther.windler@ethereal.email',
        pass: 'CpZh43kKJgzC3fQnfC',
      },
    });
    console.log('the mail data is : ', transporter);
    // Send the email
    await transporter
      .sendMail({
        from: 'luther.windler@ethereal.email',
        to: 'luther.windler@ethereal.email',
        subject: 'New User Created',
        text: 'A new user has been created.',
      })
      .then(info => {
        console.log('info :', info.messageId);
        console.log(' Preview ', nodemailer.getTestMessageUrl(info));
      });

    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
