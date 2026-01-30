# ⭐ Star Wars Character & Film Guide

An interactive front-end web project that allows users to explore **Star Wars characters** and view their related **movie details**, powered by the **SWAPI (Star Wars API)**.

This project focuses on **AJAX data fetching**, **DOM manipulation**, and **responsive UI design**, following a **mobile-first** approach.

---

## 🚀 Project Overview

The Star Wars Character Guide enables users to:

- Browse a list of Star Wars characters
- Search characters by name in real time
- Click on a character to view the movies they appear in
- Smoothly scroll to movie details after selection
- Experience loading feedback and error handling

The project was built as part of a front-end development course to practice working with APIs and dynamic content.

---

## 🛠 Technologies Used

- **HTML5** (semantic structure)
- **SCSS / CSS3** (custom styling, animations, responsive layout)
- **JavaScript (ES6)**  
- **GSAP** (smooth scrolling animation)
- **SWAPI** – https://swapi.dev/

---

## 📦 Features

✨ Character listing loaded dynamically from an external API  
✨ Movie details fetched based on character selection  
✨ Search bar with instant filtering  
✨ Loading spinner for better user experience  
✨ Error overlay for failed API requests  
✨ Responsive layout (Mobile → Tablet → Desktop)  
✨ Accessible markup with semantic HTML and ARIA where appropriate  

---

## 🧠 How It Works

1. Characters are fetched from the **SWAPI `/people` endpoint**
2. Since one API page only returns 10 characters, the app:
   - Fetches page 1
   - Fetches page 2
   - Combines the results and limits them to **12 characters**
3. Clicking a character:
   - Reads related film URLs from the API
   - Fetches each movie’s details
   - Renders movie cards dynamically
   - Scrolls smoothly to the movie section


---

## 🎨 Design Approach

- **Mobile-first** layout
- Sci-fi inspired UI with glowing accents
- High contrast for readability
- Card-based layout for characters and movies
- Subtle hover and focus states for better interaction feedback

---

## ⚠ Known Limitations

- Images are mapped locally by character name (manual mapping)
- API availability depends on SWAPI uptime
- No pagination beyond the initial character set (by design)

---

## 📚 Learning Outcomes

Through this project, I practiced:

- Working with third-party APIs
- Handling asynchronous JavaScript logic
- Managing UI state (loading, error, success)
- Structuring scalable front-end code
- Writing cleaner, more readable JavaScript

---

## 📜 Credits

- **Designer & Developer**: Linh Nguyen
- **Star Wars API (SWAPI)** – https://swapi.dev/
- **GSAP** – https://greensock.com/gsap/
- Star Wars is a property of Lucasfilm Ltd.  
  This project is for **educational purposes only**.

---


