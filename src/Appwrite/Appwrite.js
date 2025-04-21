import { Client,Account } from 'appwrite'

export const client = new Client();
client.setProject('67f88c7c0016abab99cf');

export const account = new Account(client);
