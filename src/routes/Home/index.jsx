import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import moh from '../../assets/images/moh.png';

function Home() {

  useEffect(() => {
    document.title = 'Home | Moh';
  }, []);

  return (
    <div className='home-container'>
      <div className='home-navbar'>
        <img src={moh} alt='logo' className='home-logo' />

        <div className='home-navlink'>
          <Link to='/signin' className='home-link'>SignIn</Link>

          <Link to='/signup' className='home-link'>SignUp</Link>
        </div>
      </div>

      {/* Home Content */}
      <div className='home-content'>
        <p className='home-title'>Admin Attendance Management System (A. A. M. S)</p>

        <p className='home-subtitle'>Kindly sign in to continue or create a new account.</p>
      </div>
    </div>
  );
}

export default Home;

