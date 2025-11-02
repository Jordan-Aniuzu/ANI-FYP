'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './style.css';
import Typography from '@mui/material/Typography';
import { AppBar, Box, Button, Toolbar, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function MenuAppBar() {
  const theme = useTheme();
  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNavBar(false);
      else setShowNavBar(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflowX: 'hidden' }}>
      {/* Top Navigation Bar */}
      <AppBar
        position="sticky"
        color="default"
        sx={{
          bgcolor: 'white',
          boxShadow: 'none',
          zIndex: 1100,
          transition: 'transform 0.3s ease-in-out',
          transform: showNavBar ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img
              src="/images/ANILOGO.png"
              alt="ANI Logo"
              style={{
                width: '100%',
                maxWidth: '310px',
                height: 'auto',
                transition: 'opacity 0.3s ease-in-out',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            />
          </a>

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton sx={{ color: 'black' }} onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: '2rem', overflowX: 'hidden' }}>
              {['Home', 'Our Features', 'Research'].map((item) => (
                <Button
                  key={item}
                  variant="outlined"
                  sx={{
                    color: 'black',
                    borderColor: 'white',
                    borderRadius: '5px',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
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
          {['Home', 'Our Features', 'Research'].map((item) => (
            <Button
              key={item}
              fullWidth
              variant="outlined"
              sx={{
                color: '#507b41',
                borderColor: 'white',
                borderRadius: '5px',
                fontSize: '1.3rem',
                marginBottom: '1rem',
              }}
              onClick={toggleDrawer}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: { xs: '1rem', sm: '2rem' },
          height: 'calc(100vh - 64px)',
          flexDirection: { xs: 'column', sm: 'row' },
          overflowX: 'hidden',
        }}
      >
        {/* Text Section */}
        <Box sx={{ maxWidth: { xs: '100%', sm: '50%' }, textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              marginBottom: '1rem',
              marginTop: '3rem',
              fontSize: '2rem',
            }}
          >
            <span style={{ color: '#ffb81d' }}>ANI</span>-THING is possible
          </Typography>

          <Typography variant="body1" sx={{ fontSize: '1.7rem', marginBottom: '2rem' }}>
            Plan less with your mind and more with us!
            <br />
            ANI keeps your goals organized and your day optimized.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '1.5rem' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ffb81d',
                color: 'black',
                borderRadius: '10px',
                padding: '15px 25px',
                fontSize: '1.3rem',
                flex: 1,
              }}
            >
               <Link href="/TRYNOW">
    <strong>TRY NOW</strong>
  </Link>
            </Button>

          <Button
  variant="contained"
  sx={{
    backgroundColor: 'black',
    color: '#ffb81d',
    borderRadius: '10px',
    padding: '15px 25px',
    fontSize: '1.3rem',
    flex: 1,
  }}
>
  <Link href="/LOGIN">
    <strong>LOG IN</strong>
  </Link>
</Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ffb81d',
                color: 'black',
                borderRadius: '10px',
                padding: '15px 25px',
                fontSize: '1.3rem',
                flex: 1,
              }}
            >
            <Link href="/SIGNUP">
    <strong>SIGN UP</strong>
  </Link>
            </Button>
          </Box>
        </Box>

        {/* Image Section */}
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', marginTop: { xs: '2rem', sm: 0 } }}>
          <img
            src="/images/ANY.png"
            alt="ANYLTICS"
            style={{
              width: '150%',
              maxWidth: '200px',
              height: 'auto',
              borderRadius: '10px',
              position: 'absolute',
              left: '-40%',
              top: '5%',
              zIndex: 2,
            }}
          />
          <img
            src="/images/TDL.png"
            alt="TO DO"
            style={{
              width: '100%',
              maxWidth: '260px',
              height: 'auto',
              borderRadius: '10px',
              zIndex: 1,
            }}
          />

          <img
            src="/images/UX.png"
            alt="UX"
            style={{
              width: '200%',
              maxWidth: '250px',
              height: 'auto',
              borderRadius: '10px',
              zIndex: 1,
            }}
          />
        </Box>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          padding: '4rem',
          backgroundColor: '#f9f9f9',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: '2rem', textDecoration: 'underline' }}>
          Our Features
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '4rem',
            textAlign: 'center',
            maxWidth: '1200px',
          }}
        >
          {[
            { title: 'Unified Productivity Hub', description: 'All your notes, tasks and communication in one smart dashboard.' },
            { title: 'AI-Powered Assistance', description: 'Automates your workflow from summarizing notes to creating tasks for you.' },
            { title: 'Smart Calendar & Focus Mode', description: 'Schedule focus time, breaks and priorities intelligently.' },
            { title: 'Real-Time Collaboration', description: 'Work with your team instantly, share notes, chat and plan together.' },
            { title: 'Analytics Dashboard', description: 'Visualize your productivity trends and see how you’re improving.' },
          ].map((feature, index) => (
            <Box key={index} sx={{ width: '200px' }}>
              <img
                src={`/images/feature${index + 1}.png`}
                alt={feature.title}
                style={{ width: '80px', height: '80px', marginBottom: '1rem' }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {feature.title}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>


      {/* ✅ Research Section (new, replaces old reviews) */} 
      <Box sx={{ backgroundColor: '#ffffff', textAlign: 'center', padding: { xs: '3rem 1rem', md: '6rem 4rem' }, }} > 
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: '1.5rem', textDecoration: 'underline', }} > Professional Research & Insights </Typography> 
      <Typography variant="h6" sx={{ color: 'gray', maxWidth: '800px', margin: '0 auto', marginBottom: '3rem', }} > Findings from five technology professionals at <strong>Irish Life</strong> helped shape the ANI Productivity Suite, highlighting real challenges and aspirations within modern productivity workflows. </Typography> 
      <Box sx={{ display: 'grid', gridTemplateColumns: 
      { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: '2rem', justifyContent: 'center', maxWidth: '1100px', margin: '0 auto', }} > {[ 

      { title: 'Integration is Key', text: 'Respondents emphasized the need for a unified workspace where all core tools—notes, communication, and automation—interconnect seamlessly.', }, 
      { title: 'Collaboration Matters', text: 'Every participant highlighted collaboration and communication as vital in their day-to-day roles, especially for remote teamwork and shared project visibility.', }, 
      { title: 'AI & Simplicity Lead the Future', text: 'Users value AI-assisted productivity but want smarter, more reliable automation—without unnecessary complexity.', },
       ].map((insight, i) => ( <Box key={i} sx={{ padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', backgroundColor: '#f9f9f9', }} > 
       <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}> {insight.title} </Typography> <Typography variant="body1">{insight.text}</Typography> </Box> ))} 
       </Box> <Box sx={{ maxWidth: '850px', margin: '3rem auto 0 auto' }}> 
       <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}> Summary of Key Insights </Typography> 
       <Typography variant="body1" sx={{ color: 'gray', lineHeight: 1.7 }}> Professionals across IT, software, and business systems teams identified <strong>Microsoft 365</strong> 
       as their primary suite but expressed frustration with fragmentation between apps such as Loop, OneNote, and Co-Pilot. The ANI Suite aims to unify these capabilities into a single, intelligent platform focused on 
       <strong>integration, simplicity, and AI-driven efficiency</strong>. </Typography> </Box> </Box>

      {/* Footer Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: { xs: '2rem 2rem', sm: '3rem 3rem', md: '3rem 6rem' },
          backgroundColor: 'white',
          borderTop: '2px solid black',
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', md: 'row' },
          textAlign: { xs: 'center', md: 'left' },
          gap: { xs: '1.5rem', md: '0' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img
              src="/images/ANILOGO.png"
              alt="ANI Logo"
              style={{
                width: '190px',
                height: '100px',
                transition: 'opacity 0.3s ease-in-out',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            />
          </a>

          <Typography variant="h6" sx={{ color: 'black', paddingLeft: { xs: '0', sm: '1rem' } }}>
            © 2025 ANI LLC. All rights reserved
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
            TRY FOR FREE
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#ffb81d',
              fontWeight: 'bold',
              color: 'white',
              fontSize: '1rem',
              padding: '5px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              minWidth: '120px',
              '&:hover': { backgroundColor: '#ffb81d' },
            }}
          >
            <img src="/images/ANILOGO2.png" alt="ANI" style={{ width: '70px', height: '40px' }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
