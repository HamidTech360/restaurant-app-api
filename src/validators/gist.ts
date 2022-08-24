import joi from 'joi-browser'

export const validateGist = (payload:any)=>{
    const schema = {
        title:joi.string().required(),
        post:joi.string().required(),
        country:joi.string(),
        category:joi.string()
    }

    return joi.validate(payload, schema)
}