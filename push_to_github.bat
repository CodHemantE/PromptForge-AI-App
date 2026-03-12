@echo off
echo Configuring git identity
git config user.name "CodHemantE"
git config user.email "CodHemantE@users.noreply.github.com"
echo Running git commit
git commit -m "Initial commit"
echo Running git branch
git branch -M main
echo Updating git remote
git remote set-url origin https://github.com/CodHemantE/PromptForge-AI-App.git
echo Running git push
git push -u origin main
