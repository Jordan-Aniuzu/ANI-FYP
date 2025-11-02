'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './style.css';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  TextField,
  Paper,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

export default function MenuAppBar() {
  const theme = useTheme();
  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleChat = () => setChatOpen(!chatOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNavBar(false);
      else setShowNavBar(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Send message to backend GPT wrapper
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      const botReply = { role: 'assistant', content: data.reply || 'Sorry, I had trouble replying.' };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error connecting to AI service.' },
      ]);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, overflowX: 'hidden' }}>
      {/* NAVBAR */}
      <AppBar
        position="sticky"
        color="default"
        sx={{
          bgcolor: '#ffb81d',
          boxShadow: 'none',
          zIndex: 1100,
          transition: 'transform 0.3s ease-in-out',
          transform: showNavBar ? 'translateY(0)' : 'translateY(-100%)',
          minHeight: '45px',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '45px', padding: '0 0.8rem' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img
              src="/images/ANILOGO2.png"
              alt="ANI Logo"
              style={{
                width: '95%',
                maxWidth: '100px',
                height: 'auto',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease-in-out',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            />
          </a>

          {isMobile && (
            <IconButton sx={{ color: 'black', p: 0 }} onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {['HOMEPAGE', 'SIGN UP', 'LOG IN'].map((item) => (
                <Button
                  key={item}
                  variant="text"
                  sx={{
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '1px 6px',
                    minWidth: 'auto',
                    '&:hover': {
                      color: '#000',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            padding: '1rem',
            width: 250,
            backgroundColor: 'white',
            color: '#507b41',
          },
        }}
      >
        <Box sx={{ width: 250, padding: '1rem' }}>
          {['HOMEPAGE', 'SIGN UP', 'LOG IN'].map((item) => (
            <Button
              key={item}
              fullWidth
              variant="outlined"
              sx={{
                color: '#507b41',
                borderColor: 'white',
                borderRadius: '5px',
                fontSize: '1.1rem',
                marginBottom: '1rem',
              }}
              onClick={toggleDrawer}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Drawer>

     {/* FLOATING CHATBOT */}
<IconButton
  onClick={toggleChat}
  sx={{
    position: 'fixed',
    bottom: 24,
    right: 24,
    width: 60,               // adjust size
    height: 60,
    borderRadius: '50%',
    backgroundColor: '#ffb81d',
    boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
    backgroundImage: chatOpen
      ? 'url("/images/ANILOGO2.png")'       // image when chat is open
      : 'url("/images/ANILOGO2.png")',   // your custom chat image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundSize: '118%',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',           // hover bounce
      backgroundColor: '#ffcc33',
    },
    zIndex: 2000,
  }}
/>


      {/* CHAT WINDOW */}
      {chatOpen && (
        <Paper
          elevation={4}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 24,
            width: 320,
            height: 400,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            zIndex: 2000,
            borderRadius: '12px',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              mb: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {messages.map((msg, i) => (
              <Typography
                key={i}
                sx={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.role === 'user' ? '#ffb81d' : '#eaeaea',
                  color: msg.role === 'user' ? 'white' : 'black',
                  p: 1,
                  borderRadius: '10px',
                  maxWidth: '80%',
                }}
              >
                {msg.content}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
