import { DayOfWeekEnum } from '@/model/enum_model';
import { Decimal } from '@prisma/client/runtime';
import crypto from 'crypto';

export const EncryptString = (text: string, secretKey: string, iv_key?: string) => {

    const ivKeyBuffer = iv_key ? Buffer.from(iv_key, 'hex') : crypto.randomBytes(16);
    const secretKeyBuffer = Buffer.from(secretKey, 'hex');
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKeyBuffer, ivKeyBuffer);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return [ encrypted, ivKeyBuffer.toString('hex') ]
}
  
export const DecryptString = (encryptedText: string, secretKey: string, iv_key: string) => {

    const ivKeyBuffer = Buffer.from(iv_key, 'hex');
    const secretKeyBuffer = Buffer.from(secretKey, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKeyBuffer, ivKeyBuffer);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

export const IsStringValid = (value: string | null | undefined): boolean => {
    
    if (value === null || value === undefined) {
      return false; // Check for null or undefined
    }
  
    if (value.trim().length === 0) {
      return false; // Check for empty string or whitespace
    }
  
    return true; // String is valid
  }

export const DecimalToNumber = (decimal: Decimal | null) => {

    // change to string and cast to number with "+"
    return decimal ? +(decimal.toString()) : 0;
}

export const StringDateToDisplayDate = (stringDate: string | null) => {

    if (stringDate != null) {

        const [ year, month, day ] = stringDate.split("T")[0].split("-");

        const date = new Date(stringDate);
        const dayOfweekName = DayOfWeekEnum[date.getDay()]

        return `${dayOfweekName} ${day}/${month}/${year}`;
    }

    return "-"
}