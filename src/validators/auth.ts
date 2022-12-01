import joi from 'joi-browser'

export function createUserValidator (user:any){
    const schema = {
        password:joi.string().required(),
        email:joi.string().email().required(),
        username:joi.string().required()
    }

    return joi.validate(user, schema)
}

export function loginValidator (user:any){
    const schema = {
        password:joi.string().required(),
        email:joi.string().email().required()
    }

    return joi.validate(user, schema)
}