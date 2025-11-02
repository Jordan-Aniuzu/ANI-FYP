'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function LoginPage() {
  const [message, setMessage] = useState('');
  const router = useRouter(); // ✅ Hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('pass');

    console.log('🧠 Attempting login with:', email);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();
      setMessage(result.message);

      if (result.success) {
        console.log('✅ Logged in as', email);
        // ⏩ Redirect to dashboard after 1 second delay
        setTimeout(() => router.push('/'), 1000);
      } else {
        console.log('❌ Login failed for', email);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setMessage('❌ <strong>Connection failed. Please try again.</strong>');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: '3rem' }}>
        <img src="/images/ANILOGO.png" alt="ANI Logo" style={{ width: '220px', height: 'auto' }} />
      </Box>

      <Box
        sx={{
          height: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mt: '1rem',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            width: '100%',
            backgroundColor: 'white',
            p: '2.5rem',
            borderRadius: '15px',
            boxShadow: '0 6px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              fontSize: '1.7rem',
              color: 'black',
            }}
          >
            LOG IN
          </Typography>

          <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" sx={{ mb: 2 }} />
          <TextField required fullWidth name="pass" label="Password" type="password" id="pass" autoComplete="current-password" sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                flex: 1,
                p: '10px',
                fontSize: '1.1rem',
                backgroundColor: '#ffb81d',
                color: 'black',
                fontWeight: 'bold',
                borderRadius: '10px',
                '&:hover': { backgroundColor: '#e6a800' },
              }}
            >
              LOG IN
            </Button>

            <Button
              variant="contained"
              sx={{
                flex: 1,
                p: '10px',
                fontSize: '1.1rem',
                backgroundColor: 'black',
                color: '#ffb81d',
                fontWeight: 'bold',
                borderRadius: '10px',
              }}
            >
              <Link href="/SIGNUP" style={{ color: '#ffb81d', textDecoration: 'none' }}>
                SIGN UP?
              </Link>
            </Button>
          </Box>

          {message && (
            <Typography
              variant="body1"
              sx={{ mt: 3, textAlign: 'center' }}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
}
