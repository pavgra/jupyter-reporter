import axios from 'axios';

async function sendGet(url: string) {
    const { data } = await axios.get(url);
    return data;
}

async function sendDelete(url: string) {
    const { data } = await axios.delete(url);
    return data;
}

export {
    sendGet,
    sendDelete,
};