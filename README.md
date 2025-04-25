<h1>
        About the project
</h1>
Hello, this is my very first full-stack project. I’m aware there are critical mistakes, such as leaving .env files public (they must be kept private), but this project is solely for learning purposes. I’m uploading it in its entirety to showcase my skills.
<h2>Key Advice for Your Full-Stack Project</h2>
1. Never Expose Sensitive Data

-Files containing secret keys (.env, config.json, etc.) must not be public
 Use .gitignore to exclude them from version control.

-For public demos, replace secrets with placeholders (e.g., API_KEY=your_key_here).

-Avoid Uploading Unnecessary Files
 Do not upload node_modules/, vendor/, or other dependency folders. They bloat your repo and can be reinstalled via npm install or yarn.

-Add these to .gitignore:
<hr>
node_modules/
.env
*.log
build/
dist/
Document Thoroughly
<hr>

2- Before coding: Outline goals, architecture (e.g., "MERN stack with JWT auth"), and dependencies.

-While coding: Comment complex logic and track progress (e.g., TODOs). Example:

javascript
// TODO: Optimize database query to avoid N+1 problem  

-After coding: Write a clear README.md with:

Setup instructions (e.g., npm install && npm start).

Screenshots or GIFs of the UI.

Known issues/future improvements.
<hr>
<h3>Bonus Tips:</h3>

Use environment variables even in development to avoid hardcoding secrets.

Regularly git pull to sync with remote changes and avoid merge conflicts.

Test deployment locally (e.g., with Docker) before pushing to production.
