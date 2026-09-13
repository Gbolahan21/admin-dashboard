const SIGNIN_PATH = '/signin';

const isSafeRedirectPath = (path) => {
  if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) {
    return false;
  }

  return !(
    path === SIGNIN_PATH ||
    path.startsWith(`${SIGNIN_PATH}/`) ||
    path.startsWith(`${SIGNIN_PATH}?`)
  );
};

const getRedirectFromSearch = (search = '') => {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const path = params.get('continue');

  return isSafeRedirectPath(path) ? path : null;
};

const buildSigninPath = (returnPath) => {
  if (!isSafeRedirectPath(returnPath)) {
    return SIGNIN_PATH;
  }

  const params = new URLSearchParams();
  params.set('continue', returnPath);

  return `${SIGNIN_PATH}?${params.toString()}`;
};

const getCurrentReturnPath = () => {
  const {pathname, search} = window.location;
  const returnPath = `${pathname}${search}`;

  return isSafeRedirectPath(returnPath) ? returnPath : null;
};

export default {
  isSafeRedirectPath,
  getRedirectFromSearch,
  buildSigninPath,
  getCurrentReturnPath,
};