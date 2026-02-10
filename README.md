# Portfolio Website

A minimalist, modern portfolio website built with React and Tailwind CSS.

## Features

- Clean, scientific aesthetic with IBM Plex Mono font
- Sections: About, Articles, Projects, Education, Contact
- Fully responsive design
- Easy to customize

## Setup Instructions

### Prerequisites

Make sure you have Node.js installed (version 16 or higher).
Download from: https://nodejs.org/

### Installation

1. Open your terminal/command prompt
2. Navigate to the project folder:
   ```bash
   cd portfolio-site
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

```bash
npm run dev
```

The website will open at: http://localhost:5173

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

## Customization

Edit `src/App.jsx` and update the `data` object with your information:

- Personal info (name, title, bio)
- Articles
- Projects
- Education
- Skills
- Contact information

## Project Structure

```
portfolio-site/
├── src/
│   ├── App.jsx          # Main component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind configuration
```

## Technologies Used

- React 18
- Vite (build tool)
- Tailwind CSS
- Lucide React (icons)
- IBM Plex Mono (font)
