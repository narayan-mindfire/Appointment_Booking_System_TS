import { loadFromStorage } from './app.storage.ts';
import { renderApp } from './components/App.ts';

// responsible for initialising applicaiton -> data loading and mounting the DOM
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();  
  renderApp();
});