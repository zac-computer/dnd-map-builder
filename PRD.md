Product Requirements Document: DnD Map Builder Prototype
Version: 1.0
Date: June 26, 2024
Author: Gemini

1. Introduction & Vision
   This document outlines the requirements for a prototype of a web-based, interactive DnD map builder. The long-term vision is to create a feature-rich, collaborative platform where Dungeon Masters (DMs) can easily create, share, and present custom maps for their tabletop role-playing games.

This initial prototype will focus on establishing a solid technical foundation. We will use a modern, scalable tech stack to build a minimal viable product (MVP) that demonstrates the core functionality of the map builder. This will allow us to validate the concept, gather feedback, and provide a strong baseline for future development.

2. Target Audience
   The primary target audience for this tool is Dungeon Masters of tabletop role-playing games like Dungeons & Dragons. These users need a simple, intuitive tool to create custom maps for their campaigns without requiring advanced artistic or technical skills.

3. Prototype Goals
   The primary goals of this prototype are to:

Establish the core architecture: Build a well-structured, maintainable, and scalable application using Next.js.

Implement core features: Develop the basic functionality of a map editor, including a grid, terrain painting, and object placement.

Enable local persistence: Allow users to save their maps in their browser and return to them later.

Create a running build: Produce a functional, deployable prototype that can be used for demonstration and testing.

Onboard the team: Provide a clean and well-documented codebase that new developers can easily understand and contribute to.

4. Features (MVP)
   The prototype will include the following features:

Grid-based Canvas: A pannable and zoomable grid that serves as the foundation for the map.

Terrain Painting: A simple "brush" tool that allows users to paint different terrain types (e.g., grass, water, sand, stone) onto the grid.

Object Placement: The ability to select from a predefined set of simple objects (e.g., trees, rocks, basic building shapes) and place them on the map.

Toolbar: A user interface for selecting the active tool (e.g., paint, place object), terrain type, or object.

Local Save/Load: The map's state (terrain data and object positions) will be automatically saved to the browser's local storage. When the user revisits the page, their last saved map will be loaded.

5. Technical Architecture
   The prototype will be built using the following technologies:

Framework: Next.js 14+ with the App Router.

Language: TypeScript for type safety and improved developer experience.

Styling: Tailwind CSS for a utility-first approach to styling.

State Management: Zustand will be used for managing the global state of the map, including the grid, terrain, and object data. Its simplicity and performance make it a good choice for this prototype.

Canvas: The HTML5 Canvas API will be used directly for rendering the map. We will create a custom React component to encapsulate the canvas and its logic.

Data Persistence: The browser's Local Storage API will be used to save and load map data for the prototype. This is a simple solution that meets the MVP requirements.

Linting/Formatting: ESLint and Prettier will be used to maintain code quality and consistency.

6. Project Structure
   The project will follow a src directory structure for a clean separation of application code from configuration files.

```plaintext
my-dnd-map-builder/
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.js
├── prettier.config.js
├── public/
│   └── (static assets like fonts or icons)
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── core/
│   │   │   ├── Canvas.tsx
│   │   │   └── Toolbar.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── Tooltip.tsx
│   ├── lib/
│   │   ├── hooks/
│   │   │   └── useMapStore.ts
│   │   └── utils.ts
│   ├── stores/
│   │   └── mapStore.ts
│   └── styles/
│       └── (additional global styles)
└── tsconfig.json
```

Explanation of Directories:

src/app: Contains the main application routes, layouts, and global styles, following the Next.js App Router conventions.

src/components: Reusable React components.

core/: Core application components, like the main Canvas and Toolbar.

ui/: Generic, reusable UI components like buttons and tooltips.

src/lib: Utility functions and custom hooks.

hooks/: Custom React hooks.

src/stores: Zustand store definitions for state management.

public/: Static assets that are publicly accessible.

7. Getting Started
   To get the project running locally, developers will follow these steps:

Clone the repository.

Install dependencies: npm install

Run the development server: npm run dev

The application will be accessible at http://localhost:3000.

8. Future Considerations
   While not part of this initial prototype, the following features and improvements will be considered for future development:

Real-time Collaboration: Using a service like Firebase or a custom WebSocket server to allow multiple users to edit a map simultaneously.

Backend and Database: A proper backend service and database (e.g., PostgreSQL, MongoDB) for user authentication and persistent cloud storage of maps.

Advanced Editing Tools: More sophisticated tools like layers, custom object imports, and more terrain types.

Exporting Maps: The ability to export maps as images or PDFs.

Community Sharing: A platform for users to share their creations with the community.
