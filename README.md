# Auto Marker Planning Software

A web application for planning and distributing marking workload among multiple markers.

## Features

- Create marking projects with deadlines
- Add markers with different expertise areas and daily capacity
- Distribute papers to markers using different assignment strategies:
  - Even distribution
  - Distribution based on marker capacity
  - Distribution based on expertise (foundation for future enhancement)
- Visualize the assignment plan with completion estimates

## Project Structure

- `index.html` - Main application structure and UI
- `styles.css` - Styling for the application
- `app.js` - Application logic and functionality

## How to Use

1. Enter your project name and deadline
2. Add markers with their names, area of expertise, and daily marking capacity
3. Enter the total number of papers to be marked
4. Select an assignment strategy
5. Click "Assign Papers" to generate the assignment plan
6. View the distribution and time estimates for each marker

## Future Backend Integration

This front-end application is designed to be easily integrated with a backend system. The JavaScript code already prepares structured data objects that can be sent to a backend API:

- Project details
- Marker information
- Assignment plans

## Hosting on GitHub Pages

Follow these steps to host your application on GitHub Pages:

### 1. Create a GitHub Account

If you don't already have one, sign up for a GitHub account at [github.com](https://github.com).

### 2. Create a New Repository

1. Click the "+" icon in the top right corner of GitHub and select "New repository"
2. Name your repository (e.g., "auto-marker-planning")
3. Add a description (optional)
4. Leave it as a Public repository
5. Click "Create repository"

### 3. Upload Your Files

#### Option A: Using GitHub Web Interface

1. In your new repository, click the "Add file" button and select "Upload files"
2. Drag and drop all your project files (index.html, styles.css, app.js, and README.md) or use the file selector
3. Add a commit message like "Initial commit"
4. Click "Commit changes"

#### Option B: Using Git (Command Line)

If you have Git installed, you can use these commands:

```bash
# Navigate to your project directory
cd "path/to/your/project"

# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit"

# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Push to GitHub
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" (tab with gear icon)
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait a few minutes for GitHub to build your site
7. GitHub will provide you with a URL where your site is published