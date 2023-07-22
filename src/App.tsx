import React from 'react';

import './App.css';
import { Carousel } from './layout/HomePage/components/Carousel';
import { ExploreTopBooks } from './layout/HomePage/components/ExploreTopBooks';
import { Heros } from './layout/HomePage/components/Heros';
import { LibraryServices } from './layout/HomePage/components/LibraryServices';
import { Navbar } from './layout/NavbarAndFooter/Navbar';
import { Footer } from './layout/HomePage/components/Footer';
import { HomePage } from './layout/HomePage/HomePage';
import { SearchBooksPage } from './layout/SearchBookPage/SearchBooksPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { BookCheckoutPage } from './layout/BookCheckoutPage/BookCheckoutpage';
import {OktaAuth , toRelativeUrl} from '@okta/okta-auth-js';
import { oktaConfig } from './lib/oktaConfig';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './layout/BookCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './ShelfPage/ShelfPage';
import { MessagesPage } from './layout/MessagesPage/MessagesPage';
import { ManageLibraryPage } from './layout/ManageLibraryPage/ManageLibraryPage';
import { PaymentPage } from './layout/PaymentPage/PaymentPage';

const oktaAuth = new OktaAuth(oktaConfig);


export const App = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  };

  const restoreOriginalUri = async (_oktaAuth: any, originalUri?: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler} >
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <Route path='/search'>
            <SearchBooksPage />
          </Route>
          <Route path='/reviewlist/:bookId'>
            <ReviewListPage/>
          </Route>
          <Route path='/checkout/:bookId'>
            <BookCheckoutPage/>
          </Route>
          <Route path='/login' render={
            () => <LoginWidget config={oktaConfig} /> 
            } 
          />
          <Route path='/login/callback' component={LoginCallback} />
          <SecureRoute path='/shelf'> <ShelfPage/> </SecureRoute>
          <SecureRoute path='/messages'> <MessagesPage/> </SecureRoute>
          <SecureRoute path='/admin'> <ManageLibraryPage/> </SecureRoute>
          <SecureRoute path='/fees'> <PaymentPage/> </SecureRoute>
        </Switch>
      </div>
      <Footer />
      </Security>
    </div>
  );
};



