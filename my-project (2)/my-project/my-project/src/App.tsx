

import './App.css'
import { createTheme, Divider, MantineProvider  } from '@mantine/core';
// core styles are required for all packages
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import HomePage from './Pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FindJobs from './Pages/FindJobs';
import Header from './Header/Header';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import Footer from './Footer/Footer';
import FindTalentPage from './Pages/FindTalentPage';
import TalentProfilePage from './Pages/TalentProfilePage';
import PostJobPage from './Pages/PostJobPage';
import JobDescPage from './Pages/JobDescPage';
import ApplyJobPage from './Pages/ApplyJobPage';
import CompanyPage from './Pages/CompanyPage';
import PostedJobPage from './Pages/PostedJobPage';
import JobHistoryPage from './Pages/JobHistoryPage';
import SignUpPage from './Pages/SignUpPage';
import ProfilePage from './Pages/ProfilePage';
import ChatPage from './Pages/ChatPage';
import MessagesPage from './Pages/MessagesPage';
import NotificationPage from './Pages/NotificationPage';

function App() {
  const theme=createTheme({
    focusRing:"never",
    fontFamily:"poppins, sans-serif",
    primaryColor:'bright-sun',
    primaryShade:4,

    colors:{
      'bright-sun':
      ['#fffbeb','#fff3c6','#ffe588','#ffd149','#ffbd20',
        '#f99b07','#dd7302','#b75006','#943c0c','#7a330d','#461902',],
        
          'mine-shaft': [
      '#ffffff','#ffffff','#ffffff','#ffffff','#ffffff',
       '#6d6d6d','#5d5d5d','#4f4f4f','#454545','#3d3d3d',
       '#2d2d2d',]},
      

  })
  

  return (
    
      <MantineProvider forceColorScheme='dark' theme={theme}>
        <Notifications position="top-right" zIndex={1000} />
        <BrowserRouter>
        <div className='relative'>
        <Header/>
        <Divider size="xs" mx="md"/>
        <Routes>
          <Route path='/find-jobs' element={<FindJobs/>}/>
          <Route path='/find-talent' element={<FindTalentPage/>}/>
          <Route path='/jobs/:id' element={<JobDescPage/>}/>
          <Route path='/company' element={<CompanyPage/>}/>
          <Route path='/apply-job' element={<ApplyJobPage/>}/>
          <Route path='/post-job' element={<PostJobPage/>}/>
          <Route path='/posted-job' element={<PostedJobPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/login' element={<SignUpPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/job-history' element={<JobHistoryPage/>}/>
          <Route path='/talent-profile/:id' element={<TalentProfilePage/>}/>
          <Route path='*' element={<HomePage/>}/>    
           <Route path="/chat/:id" element={<ChatPage/>}/>
          <Route path="/messages" element={<MessagesPage/>}/>
 <Route
 path="/notifications"
 element={<NotificationPage />}
/>
        </Routes>

        
        <Footer/>
        </div>
      </BrowserRouter>
    </MantineProvider>
  
  )
}

export default App
