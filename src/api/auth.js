export const login = async (username, password) => {
    if (username === 'admin' && password === 'adminpassword') {
      return { token: 'fake-admin-token', user: { username: 'admin', role: 'admin' } };
    } else if (username === 'assistant' && password === 'assistantpassword') {
      return { token: 'fake-assistant-token', user: { username: 'assistant', role: 'assistant' } };
    } else {
      throw new Error('Invalid credentials');
    }
  };
  
  export const googleLogin = async () => {
    return { token: 'google-fake-token', user: { username: 'google_user', role: 'user' } };
  };
  
  export const passkeyLogin = async () => {
    return { token: 'passkey-fake-token', user: { username: 'passkey_user', role: 'user' } };
  };
  
  export const getUsers = async () => {
    return [
      { id: 1, username: 'assistant1', role: 'assistant', status: 'active' },
      { id: 2, username: 'assistant2', role: 'assistant', status: 'active' },
      { id: 3, username: 'assistant3', role: 'assistant', status: 'frozen' },
    ];
  };
  
  export const createUser = async (userInfo) => {
    return { link: 'http://example.com/complete-registration?token=unique-token' };
  };
  
  export const freezeUser = async (userId) => {
    return { message: 'User account has been frozen' };
  };
  
  export const deleteUser = async (userId) => {
    return { message: 'User account has been deleted' };
  };
  
  export const resetPassword = async (userId) => {
    return { message: 'Password reset link has been sent' };
  };
  