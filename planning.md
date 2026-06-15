# Flixster Planning Document

## Component Architecture

App
- Responsibility: Root component that manages global state and coordinates all child components
- Renders: Header, SearchBar, sort controls, MovieList, Footer
- Props: None
- State: movies array, searchQuery string, currentPage number, sortOption string, isLoading boolean, error string
- CSS Theme: Dark AMC-inspired with black backgrounds (#0a0a0a, #0f0f0f), purple accents (#646cff, #764ba2), white/gray text, creating a cinematic theater experience.

Header
- Responsibility: Display the app title and branding
- Renders: App logo and title
- Props: None
- State: None
- CSS: Purple gradient background, white text with shadows, 🎬 logo, generous padding.

SearchBar
- Responsibility: Allow users to input search queries
- Renders: Input field and search button
- Props: onSearch callback, currentQuery string
- State: None (controlled by parent)
- CSS: Dark input (#1a1a1a), purple focus border (#646cff), purple button (#646cff) with hover effect, 8px border radius.

SortControls
- Responsibility: Allow users to sort movies
- Renders: Dropdown select menu
- Props: sortOption, onSortChange
- State: None
- CSS: Dark select dropdown (#1a1a1a), purple hover/focus (#646cff), white text, 8px radius.

MovieList
- Responsibility: Display movies in a grid layout
- Renders: Array of MovieCard components
- Props: movies array, onMovieClick callback
- State: None
- CSS: CSS Grid with auto-fill responsive columns, 24px gap (12px mobile), max-width 1400px centered.

MovieCard
- Responsibility: Display individual movie information
- Renders: Movie poster, title, rating
- Props: movie object (id, title, poster_path, vote_average), onClick callback
- State: None
- CSS: Dark background (#1a1a1a), 8px radius, hover lift effect, gold rating (#ffd700), 2-line title clamp.

MovieModal
- Responsibility: Show detailed movie information in a modal
- Renders: Large poster, title, overview, runtime, genres, rating, AI recommendation
- Props: movie object, onClose callback, isOpen boolean
- State: aiRecommendation string, isLoadingAI boolean
- CSS: Semi-transparent backdrop, dark content (#1a1a1a), 12px radius, backdrop image header, genre pills, gold rating, deep shadow.

Footer
- Responsibility: Display footer information
- Renders: Copyright or credits text
- Props: None
- State: None
- CSS: Very dark background (#0f0f0f), gray text, purple links (#646cff), centered layout, 32px padding.

Hierarchy:
App > Header
App > SearchBar
App > MovieList > MovieCard (multiple)
App > MovieModal
App > SortControls



## API Contracts

Now Playing Endpoint
- URL: https://api.themoviedb.org/3/movie/now_playing
- Parameters: api_key (required), page (optional, default 1)
- Response fields used: results array (id, title, poster_path, vote_average, overview)
- Error cases: 401 unauthorized, 404 not found, network timeout

Search Endpoint
- URL: https://api.themoviedb.org/3/search/movie
- Parameters: api_key (required), query (required), page (optional)
- Response fields used: results array (id, title, poster_path, vote_average, overview)
- Error cases: 401 unauthorized, 422 query too short, network timeout

Movie Details Endpoint
- URL: https://api.themoviedb.org/3/movie/{movie_id}
- Parameters: api_key (required), movie_id in URL path
- Response fields used: runtime, genres array, title, overview, poster_path, vote_average
- Error cases: 401 unauthorized, 404 movie not found, network timeout




## State Architecture

movies
- Type: Array of movie objects
- Initial value: []
- Owner: App
- Update trigger: API response from Now Playing or Search endpoint

searchQuery
- Type: String
- Initial value: ""
- Owner: App
- Update trigger: User input in SearchBar

currentPage
- Type: Number
- Initial value: 1
- Owner: App
- Update trigger: User pagination action, search query change

selectedMovie
- Type: Object or null
- Initial value: null
- Owner: App
- Update trigger: User clicks MovieCard

sortOption
- Type: String
- Initial value: "rating" (options: "rating", "title", "release_date")
- Owner: App
- Update trigger: User selects sort dropdown
- Sort transformation: Applied during rendering by creating a derived sorted copy of the movies array
- Sort directions:
  - "rating": Vote average, highest first (descending)
  - "title": Alphabetical, A-Z (ascending)
  - "release_date": Newest first (descending)

isLoading
- Type: Boolean
- Initial value: false
- Owner: App
- Update trigger: Before/after API calls

error
- Type: String or null
- Initial value: null
- Owner: App
- Update trigger: API error response

aiRecommendation
- Type: String or null
- Initial value: null
- Owner: MovieModal
- Update trigger: AI API response after modal opens

isLoadingAI
- Type: Boolean
- Initial value: false
- Owner: MovieModal
- Update trigger: Before/after AI API call




## Data Flow

1. On app load, App component fetches from Now Playing endpoint
2. API returns array of movie objects with basic info
3. App stores raw response in movies state array
4. App passes movies array down to MovieList as prop
5. MovieList maps over movies array and renders MovieCard for each item
6. MovieCard receives individual movie object as prop and displays poster/title/rating
7. When user clicks MovieCard, onClick handler fires with movie.id
8. App updates selectedMovie state with the clicked movie object
9. App passes selectedMovie to MovieModal which triggers open
10. MovieModal fetches full details using movie.id from Movie Details endpoint
11. MovieModal displays combined data: basic info from selectedMovie + runtime/genres from details API
12. MovieModal also sends movie title, genres, overview to AI API for recommendation
13. AI response is stored in aiRecommendation state and displayed in modal

Search flow:
1. User types in SearchBar, App updates searchQuery state
2. When user submits, App calls Search endpoint with searchQuery parameter
3. Search results replace movies array, triggering re-render of MovieList
4. Rest of flow is same as above

Sort flow:
1. User selects sort option, App updates sortOption state
2. App sorts movies array in memory based on sortOption (rating or title)
3. Sorted array triggers MovieList re-render




## AI Feature Spec

Display component: MovieModal

Inputs:
- movie.title (string)
- movie.genres (array of genre names)
- movie.overview (string)
- movie.vote_average (number)

Role: Knowledgeable movie critic and entertainment advisor who helps viewers make informed decisions about what to watch. Provide balanced, honest recommendations that appeal to different audiences.

Task: Generate a personalized 2-3 sentence watch recommendation explaining why the user should or should not watch this movie based on the genres and plot summary.

Output format: Plain text string, displayed below the movie overview in the modal

Constraints: 
- Must be at most 2-3 sentences
- Must reference at least one genre from the movie's genres array
- Do not include plot spoilers
- Do not include emojis
- Do not use phrases like "I recommend" or "I think" - speak directly to the viewer

Failiure behavior: If AI call fails, display "Recommendation unavailable" message instead of the AI response

### AI Feature — Decisions Log

**What the API returned initially:**
Using meta-llama/llama-3.3-70b-instruct:free model. Initial responses are expected to be conversational and direct, referencing genres and staying within 2-3 sentences. The model should provide balanced recommendations that acknowledge both strengths and potential weaknesses of movies.

**What I changed in my prompt:**
- Combined the system message constraints into a single cohesive message to reduce token usage
- Added explicit movie context in the user message: title, genres, rating, and plot
- Included rating explicitly to help the AI acknowledge low-rated movies appropriately
- Removed the "constraints" role (not a valid OpenAI role) and merged everything into system message

**What fallback behavior I implemented:**
- If API key is missing: logs error and returns "Recommendation unavailable"
- If API call fails: catches error, logs to console, returns "Recommendation unavailable"
- If modal is closed: resets aiInsight and loadingInsight to null/false
- Loading state shows "Getting recommendation..." text with gray italic styling
- Error state shows "Recommendation unavailable" in gray text

**What I learned:**
- Prompt engineering requires being very specific about constraints - combining them into the system message works better than separate fields
- React's useEffect cleanup is crucial for modal components - need to reset state when modal closes to avoid stale data showing on next open
- OpenRouter's free tier models work well but require clear, concise prompts to avoid token limits
- The AI API call is async and independent from the movie details fetch, so we need separate loading states to track both operations




