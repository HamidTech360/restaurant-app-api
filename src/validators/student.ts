import joi from 'joi-browser'

export function createStudentValidator (student:any){
    const schema = {
        firstName:joi.string().required(),
        lastName:joi.string().required(),
        gender:joi.string().required(),
        dob:joi.string().required(),
        admissionDate:joi.string().required(),
        address:joi.string().required(),
        state:joi.string().required(),
        level:joi.string().required(),
        parentName:joi.string().required(),
        parentAddress:joi.string().required(),
        phoneNumber:joi.string().required()
    }

    return joi.validate(student, schema)
}