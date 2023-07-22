import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import {BrowserRouter} from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NWPfGE13s88TBcsQn2oxKAnatqNAVl7gqi8n2DiJkwjSLPZpqkgwpDorQKsKPcOa6KNdMoERiuehNyFj2rftQmA00OPh3ULAX')

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <Elements stripe={stripePromise}>
  <App />
  </Elements>
   
  </BrowserRouter>
);


