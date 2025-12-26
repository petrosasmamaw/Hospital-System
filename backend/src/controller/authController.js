import supabase from '../config/supabase.js';
import cookie from 'cookie';

/* REGISTER */
export const register = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({
    message: 'Registered successfully. Check email for verification.',
    user: data.user,
  });
};

/* LOGIN */
export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(401).json({ error: error.message });

  // Set token in httpOnly cookie
  res.setHeader('Set-Cookie', cookie.serialize('sb_token', data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  }));

  res.json({ message: 'Login successful', user: data.user });
};

/* LOGOUT */
export const logout = async (req, res) => {
  // Clear cookie
  res.setHeader('Set-Cookie', cookie.serialize('sb_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  }));
  res.json({ message: 'Logged out successfully' });
};

/* GET ACTIVE SESSION */
export const getSession = async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.sb_token;

  if (!token) return res.status(401).json({ error: 'No session' });

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) return res.status(401).json({ error: 'Invalid session' });

  res.json({ user: data.user });
};

/* FORGOT PASSWORD */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/reset-password',
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Password reset email sent' });
};
