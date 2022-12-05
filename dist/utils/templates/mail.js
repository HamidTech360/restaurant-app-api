"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordEmailTemplate = exports.createAccountTemplate = void 0;
function createAccountTemplate() {
    return (`
        <!DOCTYPE html>
        <html lang="en">
        <body>
            <h1>Account created on Khayrul Adab Portal</h1>
            <p>A new account has been created . Please comfirm that you created the account</p>
        </html>
        `);
}
exports.createAccountTemplate = createAccountTemplate;
function forgotPasswordEmailTemplate(link) {
    return (`
        <!DOCTYPE html>
        <html lang="en">
        <body>
            <h1>Reset your Password</h1>
            <p>Click on this <a href="${link}">Link</a> to reset your password</p>
            
        </body>
        </html>
        `);
}
exports.forgotPasswordEmailTemplate = forgotPasswordEmailTemplate;
