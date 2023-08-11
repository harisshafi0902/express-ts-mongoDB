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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const cron_1 = require("cron");
const sendemail_1 = require("../services/sendemail");
function SendEmail() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                // Call the original method
                console.log('inside decorator');
                const result = yield originalMethod.apply(this, [req, res, next]);
                var job = new cron_1.CronJob('* * * * *', function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        console.log('You will see this message every second');
                        (0, sendemail_1.emailSend)().then((result) => {
                            console.log(result);
                            result ? console.log('emailsent') : console.log('email not sent');
                        });
                    });
                });
                job.start();
                return result;
            });
        };
        return descriptor;
    };
}
exports.SendEmail = SendEmail;
