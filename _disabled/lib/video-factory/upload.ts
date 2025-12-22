// /lib/videoFactory/upload.ts
import { randomUUID } from "crypto";

// This is a placeholder for actual R2 interaction
const uploadedFiles = new Map<string, string>(); // key -> fake URL content

export async function uploadFilePlaceholder(buffer: Buffer, key: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate upload time
    // In a real app, this key would be used to retrieve or sign the URL
    uploadedFiles.set(key, `FAKE_R2_CONTENT_FOR_${key}_${randomUUID().slice(0, 4)}`);
    return key; 
}

export async function generateFakeSignedUrl(key: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate signing time
    // In a real app, this would generate a signed URL from the key
    return `https://fake.r2.dev/${key}?token=valid`;
}