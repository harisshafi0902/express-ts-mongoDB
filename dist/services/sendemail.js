"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSend = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function emailSend() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let testaccount = nodemailer_1.default.createTestAccount();
            // Create a Nodemailer transporter
            const transporter = nodemailer_1.default.createTransport({
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
            yield transporter
                .sendMail({
                from: 'luther.windler@ethereal.email',
                to: 'luther.windler@ethereal.email',
                subject: 'New User Created',
                text: 'A new user has been created x.',
            })
                .then(info => {
                console.log('info :', info.messageId);
                console.log(' Preview ', nodemailer_1.default.getTestMessageUrl(info));
            });
            console.log('Email sent successfully');
            return true;
        }
        catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    });
}
exports.emailSend = emailSend;
