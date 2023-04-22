<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://user-images.githubusercontent.com/33402995/233778117-610f2f17-6669-4601-8b1d-609693484484.png" alt="Dashboard" width="80" height="80">



  <h1 align="center" style="display: inline-block;">CPAP App</h1>
  <h3>A Continuous Positive Airway Pressure (CPAP) Web Application</h3>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <ul>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#home">Home</a></li>
    <li><a href="#fourteen-and-thirty-day-dashboards">Fourteen & Thirty Days</a></li>
    <li><a href="#database">Database</a></li>
    <li><a href="#parts-lifecycle">Parts Lifecycle</a></li>
    </ul>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

![image](https://user-images.githubusercontent.com/33402995/233778323-b7f27de4-eb45-4dd5-b9da-3841197fc07f.png)

**Problem:** Users of CPAP machines without a wifi integration are unable to easily access their therapy data. 

**Solution:** This web application empowers persons diagnosed with Obstructive Sleep Apnea to monitor their therapy without needing to physically visit a doctor, sleep clinic, or medical supply store. Providing a range of short and long-term data, users can observe and detect trends within their therapy: increases in pressure, the Apnea-Hypopnea Indexes (AHI), and duration of therapy. Using Chart.js, their data is presented in an easy to interpret format. Additionaly, raw data is presented in a table format. Finally, patients can read and update when the components of their CPAP machines are replaced. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With


Front End | Back End | Library
| :---: | :---: | :---:
[![Bootstrap][Bootstrap.com]][Bootstrap-url] | [![MongoDB][Mongo.js]][Mongo-url] | [![Chart.js][Chart.js]][Chartjs-url]
[![jQuery][JQuery.com]][JQuery-url] | [![Express.js][Express]][Express-url] | 
 &nbsp; | [![NodeJS][Node.js]][Node-url] | 
 &nbsp; | [![Nodemon][Nodemon.js]][Nodemon-url] | 
 &nbsp; | [![SQLite][SqLite.js]][SqLite-url] | 


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- HOME -->
### Home

Home gives patients a view of all uploaded Data. Immediately grabbing attention with a large-format chart showing all therapy data organized by year and month, users can scroll down to view the uses for each associated page selectable in the header. Further below, data is presented to the patient summarizing their total hours of therapy, days used, and charts for pressure & AHI. 


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FOURTEEN THIRTY -->
### Fourteen and Thirty Day Dashboards
![image](https://user-images.githubusercontent.com/33402995/233785723-120e517b-df94-4f5c-9178-7fa60101de29.png)

Both Dashboards provide a summary of therapy for the last 14 and 30 days respectively. Paired with a table of each day's usage, the dashboards provide users with a short-term perspective of their therapy.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Database -->
### Database
![image](https://user-images.githubusercontent.com/33402995/233786340-5bdce439-f857-4114-8a96-4998ae7fa1fa.png)

The Database page provides a table for the user to view the history of their therapy that looks as great on a desktop as it does on a mobile.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Parts -->
### Parts Lifecycle
![image](https://user-images.githubusercontent.com/33402995/233786462-a1cc7989-c6fe-4420-8ba2-8c72e4d38920.png)
![image](https://user-images.githubusercontent.com/33402995/233786502-2cc632a9-f734-4e4c-acab-3659b3429621.png)


The Parts Lifecycle page provides the ability to view, then update the components on their machine. Users select the part, and can update the last time a part was changed. When selecting a new part on the edit page, the information automatically imports into the form. Although I would have wanted to display full CRUD capabilities, I don't see the real world applicability for users to create or delete parts from the database.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Prior to importing their data, users need to transfer the propietary data from their CPAP's SD card via [iMatrix](https://smart-med.com.au/imatrix-software-download-and-installation/ "iMatrix")

<a href="#[readme-top](https://smart-med.com.au/imatrix-software-download-and-installation/)">iMatrix</a>

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png


[Mongo.js]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com/atlas/database
[Express]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[Nodemon.js]: https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD
[Nodemon-url]: https://nodemon.io/
[SQLite.js]: https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white
[SQLite-url]: https://sqlite.org/index.html
[Chart.js]: https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white
[Chartjs-url]: https://www.chartjs.org/
[Bootstrap.com]: https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
