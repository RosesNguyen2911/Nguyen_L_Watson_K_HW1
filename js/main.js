(() => {
  
    const characterBox = document.querySelector("#character-box");
    const movieContainer = document.querySelector("#movie-con");
    const searchInput = document.querySelector("#search");
    const logoLink = document.querySelector(".logo-link");
    const navLinks = document.querySelectorAll(".main-nav a");
  
    const characterTemplate = document.querySelector("#character-template");
    const movieTemplate = document.querySelector("#movie-template");
  
    const spinner = document.querySelector("#spinner");
  
    // SWAPI Root
    const baseUrl = `https://swapi.info/api/`;
  
    // I match character names with character images
    const characterImageMap = {
      "Luke Skywalker": "images/luke.jpg",
      "C-3PO": "images/c3po.jpg",
      "R2-D2": "images/r2d2.jpg",
      "Leia Organa": "images/leia.jpg",
      "Darth Vader": "images/vader.jpg",
      "Owen Lars": "images/owen.jpg",
      "Beru Whitesun lars": "images/beru.jpg",
      "R5-D4": "images/r5d4.jpg",
      "Biggs Darklighter": "images/biggs.jpg",
      "Obi-Wan Kenobi": "images/obi.jpg",
      "Anakin Skywalker": "images/anakin.jpg",
      "Wilhuff Tarkin": "images/wilhuff.jpg",
    };
  
    // I match movie titles with poster images
    const posterImageMap = {
      "A New Hope": "images/a-new-hope.jpg",
      "The Empire Strikes Back": "images/empire-strikes-back.jpg",
      "Return of the Jedi": "images/return-of-the-jedi.jpg",
      "The Phantom Menace": "images/phantom-menace.jpg",
      "Attack of the Clones": "images/attack-of-the-clones.jpg",
      "Revenge of the Sith": "images/revenge-of-the-sith.jpg",
    };
  
  
    let allCharacters = [];
  
    let moviesToLoad = 0;
  
    // I show the loading spinner
    function showSpinner() {
      spinner.classList.remove("hidden");
    }
  
    // I hide the loading spinner
    function hideSpinner() {
      spinner.classList.add("hidden");
    }
  
    // I show error message using spinner text
    function showError(message) {
      spinner.classList.add("has-error");
      spinner.classList.remove("hidden");
  
      spinner.querySelector(".spinner-text").textContent = message;
    }
  
    // I reset error state and restore loading text
    function clearError() {
      spinner.classList.remove("has-error");
      spinner.querySelector(".spinner-text").textContent = "Loading data…";
    }
  
    // I start fetching characters from the API
    function getCharacters() {
      showSpinner();
      clearError();
  
      fetch(`${baseUrl}people`)
        .then(results => results.json())
        .then(function (results) {
          console.log("Characters API:", results);
  
          allCharacters = results.slice(0, 12);
          characterBox.innerHTML = "";
  
          allCharacters.forEach(function (character) {
            const clone = characterTemplate.content.cloneNode(true);
  
            clone.querySelector(".character-name").textContent = character.name;
  
            const img = clone.querySelector(".character-img");
            img.src = characterImageMap[character.name];
            img.alt = character.name;
  
            clone.querySelector(".character-link").dataset.movies =
              character.films.join(",");
  
            characterBox.appendChild(clone);
          });
        })
        .then(function () {
          const links = document.querySelectorAll(".character-link");
          console.log("Character link NodeList:", links);
  
          links.forEach(function (link) {
            link.addEventListener("click", getMovies);
          });
        })
        .then(function () {
          hideSpinner();
          animateCharacterCards(); 
        })
        
        .catch(function (err) {
          console.log(err);
          showError("Failed to load characters. Please try again later.");
        });
    }
  
    // I load movies when user clicks a character
    function getMovies(e) {
      e.preventDefault();
  
      movieContainer.innerHTML = "";
      showSpinner();
      clearError();
  
      const name = e.currentTarget
        .closest(".character-card")
        .querySelector(".character-name").textContent;
  
      console.log("Clicked character:", name);
  
      const movieUrls = e.currentTarget.dataset.movies.split(",");
      console.log("Movie URLs:", movieUrls);
  
      moviesToLoad = movieUrls.length;
  
      movieUrls.forEach(function (url) {
        fetch(url)
          .then(results => results.json())
          .then(function (results) {
            console.log("Movie API response:", results);
  
            const clone = movieTemplate.content.cloneNode(true);
  
            clone.querySelector(".movie-title").textContent = results.title;
            clone.querySelector(".movie-episode").textContent =
              "Episode: " + results.episode_id;
            clone.querySelector(".movie-director").textContent =
              "Director: " + results.director;
            clone.querySelector(".movie-release").textContent =
              "Release Date: " + results.release_date;
            clone.querySelector(".movie-crawl").textContent =
              results.opening_crawl;
  
            const poster = clone.querySelector(".movie-poster");
            poster.src =
              posterImageMap[results.title];
            poster.alt = results.title;
  
            movieContainer.appendChild(clone);
  
            moviesToLoad--;
  
            if (moviesToLoad === 0) {
              hideSpinner();
              scrollToMovies();
            }
          })
          .catch(function (error) {
            console.log(error);
            showError("Failed to load movie details.");
          });
      });
    }
  
    // I scroll down so movies are easier to see
    function scrollToMovies() {
      let offset = 300;
  
      if (window.innerWidth >= 1200) {
        offset = 420;
      }
  
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: "#movies",
          offsetY: offset,
        },
        ease: "power2.out",
      });
    }
  
    // I filter characters as user types
    function handleSearchInput() {
      const filtered = allCharacters.filter(function (character) {
        return character.name
          .toLowerCase()
          .includes(searchInput.value.toLowerCase());
      });
  
      console.log("Filtered characters:", filtered);
  
      characterBox.innerHTML = "";
  
      filtered.forEach(function (character) {
        const clone = characterTemplate.content.cloneNode(true);
  
        clone.querySelector(".character-name").textContent = character.name;
        clone.querySelector(".character-img").src =
          characterImageMap[character.name];
  
        clone.querySelector(".character-link").dataset.movies =
          character.films.join(",");
  
        characterBox.appendChild(clone);
      });
  
      document.querySelectorAll(".character-link").forEach(function (link) {
        link.addEventListener("click", getMovies);
      });
    }
  
    // I scroll when clicking nav links
    function handleNavClick(event) {
      event.preventDefault();
  
      gsap.to(window, {
        duration: 0.9,
        scrollTo: event.currentTarget.getAttribute("href"),
        ease: "power2.out",
      });
    }
  
    // I scroll back to top when clicking logo
    function handleLogoClick(event) {
      event.preventDefault();
  
      gsap.to(window, {
        duration: 0.8,
        scrollTo: 0,
        ease: "power2.out",
      });
    }
  
    searchInput.addEventListener("input", handleSearchInput);
    logoLink.addEventListener("click", handleLogoClick);
    navLinks.forEach(function (link) {
      link.addEventListener("click", handleNavClick);
    });
  
  // I animate the page intro content on load
  function animatePageIntro() {
    gsap.from(".section-header h2", {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: "power2.out",
    });
  
    gsap.from(".search-form", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power2.out",
    });
  
    gsap.from(".main-nav li", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.2,
      ease: "power2.out",
    });
  }
  
  // I animate character cards after they render
  function animateCharacterCards() {
    gsap.from(".character-card", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      clearProps: "all",
    });
  }
  
  getCharacters();
  animatePageIntro();
  
  // Back to Top Button
  const backToTopBtn = document.querySelector("#backToTop");
  
  backToTopBtn.addEventListener("click", () => {
    gsap.to(window, {
      duration: 0.9,
      scrollTo: 0,
      ease: "power2.out",
    });
  });
  
  
  })();
  