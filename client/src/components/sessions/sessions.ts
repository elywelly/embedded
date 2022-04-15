import axios from "axios";

const fetchSession = async () => {
    const response = await axios.get('/api/sessions');
    setSession(response.data);
    return response.data;
}

let thisSession = ''

//get session
function getSession() {
    return thisSession;
}

//set session
function setSession(session: any) {
    thisSession = session;
}
