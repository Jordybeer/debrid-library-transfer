<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Debrid Library Transferer</h3>

  <p align="center">
    A tool to migrate torrents from your media library from one debrid service to another
    <br />
    <a href="https://debrid.jordy.beer"><strong>« Try demo »</strong></a>
    <br />
    <br />
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a sideproject which is currently still a <strong>WORK IN PROGRESS</strong>.
Some functions may not work partially or in its entirety. Please don't open issues for incompleted code or functionality. Instead feel free to fork it and make a pull request.

I'm writing this webapp because as of right now it isn't possible to easily transfer your Debrid torrent library from one service to another. It can be done manually through Debrid Media Manager. However, this is really inconvenient for people with a large library. To avoid feeling locked in with one provider I want to simplify and streamline this process. I'm coding this for myself but feel free to use this tool as well (when/if it works). Currently there are only two providers supported: Real-Debrid & All Debrid. 

### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Current State

2024-09-25

You can succesfully link your device to Real Debrid & it accepts your All Debrid API key.
It generates a code and after pressing continue it starts polling RD api in the backend.
When succeeded it displays a list of all torrents from RD along with checkboxes.

At the bottom you'll find a button to export the checked torrents to All Debrid but it asks for authentication despite having provided the API key. 

Currently looking into that ^


<!-- GETTING STARTED -->
## Getting Started

Login to Real-Debrid [https://real-debrid.com/device] and enter the code displayed to link it to the web app.

Go to All Debrid [https://alldebrid.com/apikeys] and create a new API key.

Enter both on the homescreen and click on <strong>continue</strong> to see your torrent library. 

From here you can select the torrents you want to transfer.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Prerequisites

An active subscription for both Real Debrid & All Debrid

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact

info@jordy.beer


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
