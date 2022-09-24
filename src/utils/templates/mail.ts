export function SignUpMailTemplate (link:string){
    return(
        `
        <!DOCTYPE html>
        <html lang="en">
        <body>
            <h1>Welcome to Settlin</h1>
            <p>Click on this <a href="${link}">Link</a> to comfirm your email address</p>
        </body>
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