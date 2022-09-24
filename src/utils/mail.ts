import axios from 'axios'

interface Props {
    targetEmail:[object];
    subject:string;
    htmlContent:string;
    admin:string;
}

export async function SendMail (props:Props){
    
    try{
        const payload = {
            sender:{
                name:props.admin,
                email:'owolabihammed360@gmail.com'
            },
            to:[
                ...props.targetEmail
            ],
            subject:props.subject,
            htmlContent:props.htmlContent
        }

        const response = await axios.post(`https://api.sendinblue.com/v3/smtp/email`, payload, {headers:{
            "content-type": "application/json",
            "api-key":`${process.env.SENDINBLUEAPIKEY}`
        }})
        console.log(response.data)
        return 'success'
    }catch(error:any){
        console.log(error.response?.data)
        return error
    }
}