export function createAccountTemplate (){
    return(
        `
        <!DOCTYPE html>
        <html lang="en">
        <body>
            <h1>Account created on Khayrul Adab Portal</h1>
            <p>A new account has been created . Please comfirm that you created the account</p>
        </html>
        `
    )
}

export function forgotPasswordEmailTemplate (link:string){
    return(
        `
        <!DOCTYPE html>
        <html lang="en">
        <body>
            <h1>Reset your Password</h1>
            <p>Click on this <a href="${link}">Link</a> to reset your password</p>
            
        </body>
        </html>
        `
    )
}