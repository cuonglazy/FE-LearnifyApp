import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Fe-LearnifyApp';

  ngAfterViewInit(): void {
    let toggleBtn = document.getElementById('toggle-btn');
    let body = document.body;
    let darkMode = localStorage.getItem('dark-mode');
  
    const enableDarkMode = () => {
      toggleBtn!.classList.replace('fa-sun', 'fa-moon');
      body.classList.add('dark');
      localStorage.setItem('dark-mode', 'enabled');
    }
  
    const disableDarkMode = () => {
      toggleBtn!.classList.replace('fa-moon', 'fa-sun');
      body.classList.remove('dark');
      localStorage.setItem('dark-mode', 'disabled');
    }
  
    if (darkMode === 'enabled') {
      enableDarkMode();
    }
  
    toggleBtn!.onclick = (e) => {
      darkMode = localStorage.getItem('dark-mode');
      if (darkMode === 'disabled') {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    }
  
    let profile = document.querySelector('.header .flex .profile') as HTMLElement;
    let search = document.querySelector('.header .flex .search-form') as HTMLElement;
    let sideBar = document.querySelector('.side-bar') as HTMLElement;
  
    if (profile && search && sideBar) {
      let userBtn = document.querySelector('#user-btn') as HTMLButtonElement;
      let searchBtn = document.querySelector('#search-btn') as HTMLButtonElement;
      let menuBtn = document.querySelector('#menu-btn') as HTMLButtonElement;
      let closeBtn = document.querySelector('#close-btn') as HTMLButtonElement;
  
      if (userBtn && searchBtn && menuBtn && closeBtn) {
        userBtn.onclick = () => {
          profile.classList.toggle('active');
          search.classList.remove('active');
        }
  
        searchBtn.onclick = () => {
          search.classList.toggle('active');
          profile.classList.remove('active');
        }
  
        menuBtn.onclick = () => {
          sideBar.classList.toggle('active');
          body.classList.toggle('active');
        }
  
        closeBtn.onclick = () => {
          sideBar.classList.remove('active');
          body.classList.remove('active');
        }
      }
    }
  
    window.onscroll = () => {
      if (profile && search && sideBar) {
        profile.classList.remove('active');
        search.classList.remove('active');
  
        if (window.innerWidth < 1200) {
          sideBar.classList.remove('active');
          body.classList.remove('active');
        }
      }
    }
  }
  
}
