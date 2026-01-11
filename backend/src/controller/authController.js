import supabase from '../config/supabase.js';
import cookie from 'cookie';

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Registered successfully. Check your email for verification.',
      user: data.user,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // 🔴 REQUIRED FOR PRODUCTION (Render + Vercel)
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('sb_token', data.session.access_token, {
        httpOnly: true,
        secure: true,       // HTTPS only
        sameSite: 'none',   // allow cross-site cookie
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    );

    res.json({
      message: 'Login successful',
      user: data.user,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

/* ================= LOGOUT ================= */
export const logout = async (req, res) => {
  try {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('sb_token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        expires: new Date(0),
      })
    );

    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

/* ================= GET ACTIVE SESSION ================= */
export const getSession = async (req, res) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.sb_token;

    if (!token) {
      return res.status(401).json({ error: 'No active session' });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    res.json({ user: data.user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://YOUR-FRONTEND.vercel.app/reset-password',
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
