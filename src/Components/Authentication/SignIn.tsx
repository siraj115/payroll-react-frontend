import { Box, Link, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { selectIsAuthenticated, setUser,clearUser } from '../../Store/Slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Authentication.scss'

const test_API=`https://reqres.in/api/login`;
const test_email='eve.holt@reqres.in';
const test_password='cityslicka';

const Signin = () => {

    const [email, setEmail] = useState(test_email);
    const [password, setPassword] = useState(test_password);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    // const router = useRouter();
    const [cookies, setCookie] = useCookies(['accessToken']);
    const dispatch = useDispatch();
    
  const [checked, setChecked] = useState(false);
  const [inactivityTimer, setInactivityTimer] = useState(0);
  const navigate = useNavigate();

 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    
    try {
        
        const response = await axios.post(`${test_API}`, {
                email: email,
                password: password,
            },{
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              
              
        if(response){
            console.log('found token:', response.data);
            const token=response.data.token;
            handleLoginSuccess();
            setCookie("accessToken",token);
            const userObj={
              useremail:response.data.useremail,
              user_id:response.data.user_id}
              
            dispatch(setUser(userObj));
            navigate('/home');
            const timer = setTimeout(() => {
              // Log the user out here
              dispatch(clearUser()); // Clear user data in Redux
              // localStorage.removeItem('userData'); // Clear user data in localStorage
              toast.info('You have been logged out due to inactivity.', {
                position: 'top-right',
                autoClose: 3000,
              });
              navigate('/');
            }, 5 * 60 * 1000);
            if (inactivityTimer) {
              clearTimeout(inactivityTimer);
            }
            //@ts-ignore
            setInactivityTimer(timer);
          }
          else{
            handleLoginFailure();
          }
        
        
        
    } catch (error) {
        console.error(error)
    } finally{
        setEmail('');
        setPassword('');
    }
  };
  if (isAuthenticated) {
    // Redirect to the product page
    // router.push('/products'); 
  }

  
  const handleUserActivity = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    // Set a new inactivity timer
    const timer = setTimeout(() => {
      // Log the user out due to inactivity
      dispatch(clearUser());
      // localStorage.removeItem('userData');
      toast.info('You have been logged out due to inactivity.', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/');
    }, 5 * 60 * 1000);
    //@ts-ignore
    setInactivityTimer(timer);
  };

  const handleLoginSuccess = () => {
    toast.success('Successfully logged in!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleLoginFailure = () => {
    toast.error('Invalid username or password. Please try again.', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
    };
  }, []);

  return (
    <div className="form-container">
    <div className='image-container'>
      {/* <img src={} alt='company-logo'/> */}
    </div>
    <Typography className='subText'><strong>Hello there, Sign in to Continue</strong></Typography>
    <form>
      <div className="form-group">
        <label className="label">Email</label>
        <TextField
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="label">Password</label>
        <TextField
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{endAdornment:<VisibilityIcon color='action'/>}}
        />
      </div>
      <Box sx={{
        display:'flex',
        justifyContent:'space-between',
        textAlign:'left',
        pt:2,
        pb:4
        }}>
        <input
          type='checkbox'
          checked={checked}
          onChange={handleChange}
          required
          className='checkBox-input'
         
        />
        
          <label>By creating or logging into an account, you <br/>
            are agreeing with our <strong>Terms & Conditions</strong><br/>
            and <strong>Privacy Policies.</strong>
          </label>
        
      </Box>
      <button disabled={!checked || !email.length|| !password.length} className="button" onClick={handleSubmit}>Login</button>
    </form>
    <div style={{paddingTop:'40px'}}>
      <Link underline='none'><strong>Signin with company SSO</strong></Link>
    </div>
    <ToastContainer />
  </div>
  )
}

export default Signin