import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Email as EmailIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { auth } from '../config/firebase';
import { sendEmailVerification, signOut } from 'firebase/auth';

export default function VerifyEmail() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    // If no user or email already verified, redirect to login
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.emailVerified) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const handleResendEmail = async () => {
    if (!user) return;

    try {
      setSending(true);
      setError('');
      setMessage('');
      
      await sendEmailVerification(user);
      setMessage('Verification email sent! Please check your inbox.');
    } catch (error: any) {
      console.error('Failed to send verification email:', error);
      
      if (error.code === 'auth/too-many-requests') {
        setError('Too many requests. Please wait a few minutes before trying again.');
      } else {
        setError('Failed to send email. Please try again later.');
      }
    } finally {
      setSending(false);
    }
  };

  const handleCheckVerification = async () => {
    if (!user) return;

    try {
      setChecking(true);
      setError('');
      
      // Reload user to get latest email verification status
      await user.reload();
      
      if (user.emailVerified) {
        setMessage('Email verified successfully! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setError('Email not verified yet. Please check your inbox and click the verification link.');
      }
    } catch (error) {
      console.error('Failed to check verification:', error);
      setError('Failed to check verification status. Please try again.');
    } finally {
      setChecking(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
        }}
      >
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <EmailIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" component="h1" gutterBottom>
                Подтвердите Email
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Мы отправили письмо с подтверждением на:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, mt: 1 }}>
                {user.email}
              </Typography>
            </Box>

            <Alert severity="info" sx={{ mb: 3 }}>
              Пожалуйста, проверьте свою почту и перейдите по ссылке для подтверждения. 
              После этого нажмите кнопку "Проверить" ниже.
            </Alert>

            {message && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {message}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleCheckVerification}
                disabled={checking}
                startIcon={checking ? <CircularProgress size={20} /> : <CheckCircleIcon />}
              >
                {checking ? 'Проверка...' : 'Я подтвердил email'}
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={handleResendEmail}
                disabled={sending}
              >
                {sending ? 'Отправка...' : 'Отправить письмо повторно'}
              </Button>

              <Button
                variant="text"
                onClick={handleLogout}
                sx={{ mt: 1 }}
              >
                Выйти
              </Button>
            </Box>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary" display="block">
                💡 Подсказка: Если письма нет во входящих, проверьте папку "Спам"
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

