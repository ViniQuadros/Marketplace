import { Router } from 'express';
import { auth, db } from './firebaseAdmin.js'

const router = Router();

router.post('/register', async(req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and Password are mandatory' });
    }

    try {
        const userRecord = await auth.createUser({
            email, 
            password,
            displayName: name,
        })

        await db.collection('users').doc(userRecord.uid).set({
            name,
            email,
            createdAt: new Date(),
        })

        res.status(201).json({
            message: 'User created',
            uid: userRecord.uid,
        })
    } catch (error) {
        console.error(error);

        if (error.code === 'auth/email-already-exists') {
            return res.status(409).json({ error: 'Email already exists' });
        }

        res.status(500).json({ error: 'Error creating user' });
    }
})

export default router;