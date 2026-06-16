# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Unit Assignment: Flixster

Submitted by: **Zainab Adeola**

Estimated time spent: **10** hours spent in total

Deployed Application (optional): [Flixster Deployed Site](https://flixster-starter-tbse.onrender.com/)

### Application Features

#### REQUIRED FEATURES

- [X] **Display Movies**
  - [X] Users can view a list of current movies from The Movie Database API in a grid view.
    - [X] Movie tiles should be reasonably sized (at least 6 playlists on your laptop when full screen; large enough that the playlist components detailed in the next feature are legible).
  - [X] For each movie displayed, users can see the movie's:
    - [X] Title
    - [X] Poster image
    - [X] Vote average
  - [X] Users can load more current movies by clicking a button which adds more movies to the grid without reloading the entire page. 
- [X] **Search Functionality**
  - [X] Users can use a search bar to search for movies by title.
  - [X] The search bar should include:
    -[X] Text input field
    - [X] Submit/Search button
    - [X] Clear button
  - [X] Movies with a title containing the search query in the text input field are displayed in a grid view when the user either:
    - [X] Presses the Enter key
    - [X] Clicks the Submit/Search button
  - [X] Users can click the Clear button. When clicked:
    - [X] All text in the text input field is deleted
    - [X] The most recent search results are cleared from the text input field and the grid view and all current movies are displayed in a grid view
- [X] **Design Features**
  - [X] Website implements all of the following accessibility features:
    - [X] Semantic HTML
    - [X] [Color contrast](https://webaim.org/resources/contrastchecker/)
    - [X] Alt text for images 
  - [X] Website implements responsive web design.
    - [X] Uses CSS Flexbox or CSS Grid
    - [X] Movie tiles and images shrink/grow in response to window size
  - [X] Users can click on a movie tile to view more details about a movie in a pop-up modal.
    - [X] The pop-up window is centered in the screen and does not occupy the entire screen.
    - [X] The pop-up window has a shadow to show that it is a pop-up and appears floating on the screen.
    - [X] The backdrop of the pop-up appears darker or in a different shade than before. including:
    - [X] The pop-up displays additional details about the moving including:
      - [X] Runtime in minutes
      - [X] Backdrop poster
      - [X] Release date
      - [X] Genres
      - [X] An overview
  - [X] Users can use a drop-down menu to sort movies.
    - [X] Drop-down allows movies to be sorted by:
      - [X] Title (alphabetic, A-Z)
      - [X] Release date (chronologically, most recent to oldest)
      - [X] Vote average (descending, highest to lowest)
    - [X] When a sort option is clicked, movies display in a grid according to selected criterion.
  - [X] Website displays:
    - [X] Header section
    - [X] Banner section
    - [X] Search bar
    - [X] Movie grid
    - [X] Footer section
    - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: To ease the grading process, please use the [color contrast checker](https://webaim.org/resources/contrastchecker/) to demonstrate to the grading team that text and background colors on your website have appropriate contrast. The Contrast Ratio should be above 4.5:1 and should have a green box surrounding it. 
- [X] **Planning Documentation**
  - [X] Repository includes a `planning.md` file with:
    - [X] A **Component Architecture** section listing at least 5 components, each with its responsibility, what it renders, and its props.
    - [X] An **API Contracts** section documenting at least 2 TMDb endpoints used, with URL, query parameters, and relevant response fields for each.
    - [X] A **State Architecture** section listing state variables with name, type, initial value, owner component, and what user action triggers an update.
    - [X] A **Data Flow** section (paragraph or diagram) explaining how data flows from the TMDb API response through the component hierarchy to the `MovieCard`, including any transformations.
- [X] **AI Watch Recommendation**
  - [X] When a movie's detail modal is opened, an AI-generated watch recommendation is displayed alongside the movie details.
  - [X] A loading state is shown while the AI response is being generated, and a graceful fallback message is shown if the AI call fails.
  - [X] `planning.md` includes an **AI Feature Spec** documenting role, task, inputs, output format, constraints, and failure behavior for the AI call.
  - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: To ease the grading process, open your browser's DevTools **Network** tab, trigger the AI recommendation (open a movie modal), and show the outbound request going **directly to an AI API URL** (e.g., `openrouter.ai`) — not to a backend server URL. Graders need to see this call in the Network tab to award full credit.

#### STRETCH FEATURES

- [X] **Deployment**
  - [X] Website is deployed via Render.
  - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: For ease of grading, please use the deployed version of your website when creating your walkthrough. 
- [X] **Embedded Movie Trailers**
  - [X] Within the pop-up modal displaying a movie's details, the movie trailer is viewable.
    - [X] When the trailer is clicked, users can play the movie trailer.
- [X] **Favorite Button**
  - [X] For each movie displayed, users can favorite the movie.
  - [X] There should be visual element (such as a heart icon) on each movie's tile to show whether or not the movie has been favorited.
  - [X] If the movie is not favorited:
    - [X] Clicking on the visual element should mark the movie as favorited
    - [X] There should be visual feedback (such as the heart turning a different color) to show that the movie has been favorited by the user.
  - [X] If the movie is already favorited:
    - [X] Clicking on the visual element should mark the movie as *not* favorited.
    - [X] There should be visual feedback (such as the heart turning a different color) to show that the movie has been unfavorited. 
- [X] **Watched Checkbox**
  - [X] For each movie displayed, users can mark the movie as watched.
  - [X] There should be visual element (such as an eye icon) on each movie's tile to show whether or not the movie has been watched.
  - [X] If the movie has not been watched:
    - [X] Clicking on the visual element should mark the movie as watched
    - [X] There should be visual feedback (such as the eye turning a different color) to show that the movie has been watched by the user.
  - [X] If the movie is already watched:
    - [X] Clicking on the visual element should mark the movie as *not* watched.
    - [X] There should be visual feedback (such as the eye turning a different color) to show that the movie has not been watched.
- [X] **Sidebar**
  - [X] The website includes a side navigation bar.
  - [X] The sidebar has three pages:
    - [X] Home
    - [X] Favorites
    - [X] Watched
  - [X] The Home page displays all current movies in a grid view, the search bar, and the sort movies drop-down.
  - [X] The Favorites page displays all favorited movies in a grid view.
  - [X] The Watched page displays all watched movies in a grid view.

### Walkthrough Video

**Walkthrough video:** [Flixster Walkthrough](https://www.loom.com/share/f128d317bb8b43ee9733dc9856bcdf09)

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Yes, the labs helped to understand the content in the project. Since the labs buildt on one another, Lab 2 served as an intro to react, and writing in react instead of html and javascript separately, then Lab 3, helped me understand how to create functions, and Lab 4, helped me understand how to integrate API's.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
I would have added more animations to display my creativity more and make my website more interesting. It would also push my knowlegdge and learn keyframes and other animation functions although it's something we're not learning.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

The flow of my project went well, I knew how to connect the components and I had an idea of the functions I would need. A couple things that didn't go well, were my CSS design and trying to implement a card and having to fix the margins, colror etc., multiple tiems because it didn't look as I wanted it to. I would like to do a different color pallet next time, I feel like I could have been more creative. 

### Open-source libraries used

- Add any links to open-source libraries used in your project.

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.

I would like to shout Enes, he helped me with fix my open router API, he also walked me through teh steps on how to deploy my website.
