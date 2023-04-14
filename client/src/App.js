import './App.css';

import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Main from './components/Main';
import { AuthProvider } from './contexts/AuthContext';


function App() {

  

  return (
    <AuthProvider>
      <>
        <Header />

        <Aside />

        <Main />

        <Footer />
      </>
    </AuthProvider>
  );
}

export default App;
