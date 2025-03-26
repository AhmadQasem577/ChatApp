import express from 'express';

const router = express.Router();

router.post('/signup', (req, res) => { 
res.send('Hello from auth route! signup');
    });

router.post('/login', (req, res) => { 
        res.send('Hello from auth route! login');
    }); 

router.post('/logout', (req, res) => { 
        res.send('Hello from auth route! logout');
    });

export default router;