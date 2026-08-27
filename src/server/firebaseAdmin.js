// firebaseAdmin.js
import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { readFileSync } from 'fs'

const serviceAccount = JSON.parse(
    readFileSync(new URL('./firebase-adminsdk.json', import.meta.url))
)

initializeApp({
    credential: cert(serviceAccount),
})

export const auth = getAuth()
export const db = getFirestore()