# My Basic Web App

A simple web application that changes background color when a button is clicked.

## Project Structure

- `index.html` - Main HTML file
- `styles.css` - CSS styles for the application
- `app.js` - JavaScript functionality

## Hosting on GitHub Pages

Follow these steps to host your web application on GitHub Pages:

### 1. Create a GitHub Account

If you don't already have one, sign up for a GitHub account at [github.com](https://github.com).

### 2. Create a New Repository

1. Click the "+" icon in the top right corner of GitHub and select "New repository"
2. Name your repository (e.g., "my-basic-web-app")
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
7. GitHub will provide you with a URL where your site is published (usually https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/)

### 5. Access Your Live Website

After GitHub Pages is enabled, your web app will be available at:
`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

## Making Updates

Any time you push changes to your GitHub repository, the live site will automatically update.

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Guides](https://guides.github.com/)