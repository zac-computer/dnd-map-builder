# Contributing to DnD Map Builder

Thank you for your interest in contributing to the DnD Map Builder! This document provides guidelines and information for contributors.

## 🎯 Project Vision

We're building the most intuitive and powerful web-based DnD map builder that combines traditional map-making tools with modern AI assistance, real-time collaboration, and seamless integration with popular VTT platforms.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher
- **Git** for version control

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/dnd-map-builder.git
   cd dnd-map-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Development Workflow

### Before You Start

1. **Check existing issues** - Look for existing issues or feature requests
2. **Create an issue** - If none exists, create one to discuss your contribution
3. **Get feedback** - Wait for maintainer feedback before starting work
4. **Check the roadmap** - Review `TODO.md` for planned features

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Follow existing code patterns
   - Write meaningful commit messages
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run lint          # Check linting
   npm run type-check     # Check TypeScript
   npm run format         # Format code
   npm run build          # Test build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add terrain blending feature"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Code Style Guidelines

### TypeScript
- Use strict TypeScript with proper type annotations
- Prefer interfaces over types for object definitions
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### React Components
- Use functional components with hooks
- Follow the existing component structure
- Use proper prop typing with TypeScript
- Keep components focused and single-purpose

### File Organization
```
src/
├── app/                 # Next.js pages and layouts
├── components/
│   ├── core/           # Core application components
│   └── ui/             # Reusable UI components
├── lib/
│   ├── hooks/          # Custom React hooks
│   └── utils.ts        # Utility functions
└── stores/             # Zustand state management
```

### Naming Conventions
- **Files**: Use kebab-case for files (`map-builder.tsx`)
- **Components**: Use PascalCase (`MapBuilder`)
- **Functions**: Use camelCase (`generateMap`)
- **Constants**: Use UPPER_SNAKE_CASE (`DEFAULT_GRID_SIZE`)

## 🧪 Testing Guidelines

### Manual Testing Checklist
When submitting PRs, verify:

- [ ] **Canvas Operations**: Pan, zoom, rendering performance
- [ ] **Terrain Painting**: All terrain types paint correctly
- [ ] **Object Placement**: Objects place and display properly
- [ ] **Demo Maps**: Both demo maps load correctly
- [ ] **Persistence**: Maps save and load from localStorage
- [ ] **UI Responsiveness**: Interface works on different screen sizes
- [ ] **Cross-browser**: Test in Chrome, Firefox, Safari

### Automated Testing
- Write unit tests for utility functions
- Add integration tests for complex features
- Ensure all tests pass before submitting PR

## 🎨 Design Guidelines

### UI/UX Principles
- **Simplicity**: Keep interfaces clean and intuitive
- **Accessibility**: Ensure features work with keyboard navigation
- **Performance**: Maintain smooth canvas operations
- **Consistency**: Follow existing design patterns

### Visual Standards
- Use Tailwind CSS for styling
- Follow existing color schemes and spacing
- Ensure proper contrast ratios
- Test on different screen sizes

## 🐛 Bug Reports

When reporting bugs, include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected vs actual behavior**
4. **Environment details** (browser, OS, device)
5. **Screenshots or videos** if applicable
6. **Map context** (size, terrain types, objects used)

## ✨ Feature Requests

For feature requests, provide:

1. **Problem statement** - What need does this address?
2. **Proposed solution** - How should it work?
3. **Use case scenarios** - When would this be used?
4. **Priority level** - How important is this feature?
5. **Alternative solutions** - What other approaches were considered?

## 📚 Documentation

### When to Update Documentation
- Adding new features or components
- Changing existing functionality
- Adding new configuration options
- Modifying development workflow

### Documentation Types
- **README.md** - Project overview and quick start
- **CLAUDE.md** - Claude Code integration guide
- **TODO.md** - Development roadmap and features
- **Code comments** - Complex logic explanation

## 🏆 Recognition

Contributors will be recognized in:
- Project README contributors section
- Release notes for significant contributions
- GitHub repository contributors page

## 🤝 Code of Conduct

### Our Standards
- **Be respectful** and inclusive in all interactions
- **Be constructive** in feedback and discussions
- **Be patient** with newcomers and questions
- **Be collaborative** in problem-solving

### Unacceptable Behavior
- Harassment or discriminatory language
- Personal attacks or trolling
- Spamming or off-topic discussions
- Sharing private information without consent

## 📞 Getting Help

### Communication Channels
- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and ideas
- **Pull Request Reviews** - Code-specific feedback

### Maintainer Response Times
- **Issues**: 24-48 hours for initial response
- **Pull Requests**: 48-72 hours for review
- **Critical Bugs**: Same day response when possible

## 🎮 Community

### Contribution Types
We welcome various types of contributions:

- **Code contributions** - Features, fixes, improvements
- **Documentation** - Guides, tutorials, API docs
- **Testing** - Bug reports, manual testing, test automation
- **Design** - UI/UX improvements, mockups, icons
- **Community** - Answering questions, helping newcomers

### Good First Issues
Look for issues labeled `good first issue` for beginner-friendly contributions.

---

Thank you for helping make DnD Map Builder better for the entire D&D community! 🎲✨