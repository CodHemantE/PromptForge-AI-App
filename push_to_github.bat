@echo off
echo Running git add
git add .
echo Running git commit
git commit -m "Initial commit"
echo Running git branch
git branch -M main
echo Running git remote
git remote add origin https://github.com/CodHemantE/PromptForge-AI-App.git
echo Running git push
git push -u origin main
