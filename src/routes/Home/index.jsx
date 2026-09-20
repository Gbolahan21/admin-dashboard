import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, UserCog, GraduationCap } from 'lucide-react';
import moh from '../../assets/images/moh.png';

function Home() {
  const navigate = useNavigate();

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    document.title = 'Home | Moh';
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowRoleModal(false);
    setShowActionModal(true);
  };

  const closeModals = () => {
    setShowRoleModal(false);
    setShowActionModal(false);
    setSelectedRole('');
  };

  const handleSignIn = () => {
    navigate(`/signin?role=${selectedRole}`);
    closeModals();
  };

  const handleSignUp = () => {
    navigate(`/signup?role=${selectedRole}`);
    closeModals();
  };

  return (
    <div className='home-container'>

      {/* Navbar */}
      <div className='home-navbar'>
        <img
          src={moh}
          alt='logo'
          className='home-logo'
        />

        <div className='home-navlink'>
          <button
            className='home-link home-account-button'
            onClick={() => setShowRoleModal(true)}
          >
            Account
          </button>
        </div>
      </div>

      {/* Home Content */}
      <div className='home-content'>
        <p className='home-title'>
          Admin Attendance Management System (A. A. M. S)
        </p>

        <p className='home-subtitle'>
          Kindly select your account type to continue.
        </p>

        <button
          className='home-get-started'
          onClick={() => setShowRoleModal(true)}
        >
          Get Started
        </button>
      </div>

      {/* Role Modal */}
      {showRoleModal && (
        <div className='home-modal-overlay'>
          <div className='home-modal'>

            <button
              className='home-modal-close'
              onClick={closeModals}
            >
              <X size={20} />
            </button>

            <div className='home-modal-header'>
              <h2>Select Account Type</h2>
              <p>
                Choose the type of account you want to continue with.
              </p>
            </div>

            <div className='home-role-options'>

              <button
                className='home-role-card'
                onClick={() => handleRoleSelect('admin')}
              >
                <div className='home-role-icon'>
                  <UserCog size={28} />
                </div>

                <div>
                  <h3>Admin</h3>
                  <p>Manage students, courses, attendance and system settings.</p>
                </div>
              </button>

              <button
                className='home-role-card'
                onClick={() => handleRoleSelect('lecturer')}
              >
                <div className='home-role-icon'>
                  <GraduationCap size={28} />
                </div>

                <div>
                  <h3>Lecturer</h3>
                  <p>Manage courses and lecturer attendance activities.</p>
                </div>
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {showActionModal && (
        <div className='home-modal-overlay'>
          <div className='home-modal home-action-modal'>

            <button
              className='home-modal-close'
              onClick={closeModals}
            >
              <X size={20} />
            </button>

            <div className='home-modal-header'>
              <h2>
                {selectedRole === 'admin'
                  ? 'Admin Account'
                  : 'Lecturer Account'}
              </h2>

              <p>
                Would you like to sign in or create a new account?
              </p>
            </div>

            <div className='home-action-buttons'>

              <button
                className='home-action-button home-signin-button'
                onClick={handleSignIn}
              >
                Sign In
              </button>

              <button
                className='home-action-button home-signup-button'
                onClick={handleSignUp}
              >
                Sign Up
              </button>

            </div>

            <button
              className='home-back-button'
              onClick={() => {
                setShowActionModal(false);
                setShowRoleModal(true);
              }}
            >
              Change account type
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Home;