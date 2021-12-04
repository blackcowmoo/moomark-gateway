import { v4 as uuidv4 } from 'uuid';

export const generateSession = () => {
    return `SESSION=${uuidv4().replace(/-/g, '')}`;
}