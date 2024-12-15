
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = '2011001120110356tiendatphantancg'; // Same key used for encryption

function decrypt(text:string) {
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from('2011001120110356')); 
    let decrypted = decipher.update(text, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.ENCRYPTED_GOOGLE_CLIENT_ID ? decrypt(process.env.ENCRYPTED_GOOGLE_CLIENT_ID) : "",
      clientSecret: process.env.ENCRYPTED_GOOGLE_CLIENT_SECRET ? decrypt(process.env.ENCRYPTED_GOOGLE_CLIENT_SECRET) : "",
    }),
    GithubProvider({
      clientId: process.env.ENCRYPTED_GITHUB_CLIENT_ID ? decrypt(process.env.ENCRYPTED_GITHUB_CLIENT_ID) : "",
      clientSecret: process.env.ENCRYPTED_GITHUB_CLIENT_SECRET? decrypt(process.env.ENCRYPTED_GITHUB_CLIENT_SECRET) : "",
    }),
  ],
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);