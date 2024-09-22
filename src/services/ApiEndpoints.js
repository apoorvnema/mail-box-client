const baseUrl = import.meta.env.VITE_BASE_URL;


const ApiEndpoints = {
    signup: ()=>(`${baseUrl}/user/signup`),
    login: ()=>(`${baseUrl}/user/login`),
    sendMail: ()=>(`${baseUrl}/mail/send`),
    getInbox: ()=>(`${baseUrl}/mail/inbox`),
    getMailDetail: (emailId)=>(`${baseUrl}/mail/inbox/${emailId}`),
    markAsRead: (id)=>(`${baseUrl}/mail/mark-as-read/${id}`),
    deleteMail: (id)=>(`${baseUrl}/mail/delete/${id}`),
    getSent: ()=>(`${baseUrl}/mail/sent`),
    getSentMailDetail: (id)=>(`${baseUrl}/mail/sent/${id}`)
}

export default ApiEndpoints;