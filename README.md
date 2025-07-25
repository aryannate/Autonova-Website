# From the repository root
# 1-a  Stage changes to tracked files + deletions
git add -u

# 1-b  Stage every untracked file and folder
git add .

# 2   Verify the staging area
git status          # should now show the files under “Changes to be committed”

# 3   Commit
git commit -m "Describe what you changed (backend fixes, rebuilt frontend, assets, etc.)"

# 4   Re-sync with GitHub, then push
git pull --rebase   # good habit; resolve any conflicts if prompted
git push            # uploads the new commit(s) to origin/main

