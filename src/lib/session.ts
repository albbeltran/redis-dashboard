const IV_LENGTH = 16;
const algorithm = { name: 'AES-CBC', length: 256 };
const enc = new TextEncoder();
const dec = new TextDecoder();

async function getSecretKey() {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(process.env.SECRET_KEY!),
    algorithm,
    false,
    ['encrypt', 'decrypt']
  );
  return keyMaterial;
}

export async function encrypt(data: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await getSecretKey();
  
  const encrypted = await crypto.subtle.encrypt(
    { ...algorithm, iv },
    key,
    enc.encode(data)
  );
  
  const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
  const encryptedHex = Array.from(new Uint8Array(encrypted)).map(b => b.toString(16).padStart(2, '0')).join('');

  return ivHex + ':' + encryptedHex;
}

export async function decrypt(encryptedData: string): Promise<string> {
  const [ivHex, encryptedHex] = encryptedData.split(':');
  
  const iv = new Uint8Array(ivHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  const encryptedArray = new Uint8Array(encryptedHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  
  const key = await getSecretKey();

  const decrypted = await crypto.subtle.decrypt(
    { ...algorithm, iv },
    key,
    encryptedArray
  );
  
  return dec.decode(decrypted);
}