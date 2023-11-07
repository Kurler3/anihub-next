import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('654a9fde3c5a3d79c27a');

export const account = new Account(client);
export { ID } from 'appwrite';
