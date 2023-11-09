export const isAuthenticated = () => {
    return sessionStorage.getItem('authIs') === 'true';
  };
  
  export const redirectToLogin = () => {
    if (!isAuthenticated()) {
      window.location.replace('http://localhost:3000/login');
    }
  };
  
  export const redirectToDashboard = () => {
    if (isAuthenticated()) {
      window.location.replace('http://localhost:3000/');
    }
  };
  
  export const logout = () => {
    sessionStorage.removeItem('authIs');
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('userInfo');
    window.location.replace('http://localhost:3000/login');
  };