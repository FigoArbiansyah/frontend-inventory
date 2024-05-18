export const routeNamesWithoutLayout = [
  'Login', 'NotFound', 'ErrorPage', 'Register',
];

export const axiosConfig = (token: string) => ({
  headers: {
    'Authorization': `Bearer ${token}`,
  }
});
