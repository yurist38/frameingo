# Trigger mup deploy if current branch is 'master'

#!/bin/bash

echo "On branch '$TRAVIS_BRANCH'."

if [ "$TRAVIS_BRANCH" == "master" ]; then
  echo "Triggering Mupx deployment..."
  mupx setup
  mupx deploy
else
  echo "Not deploying. Use 'master' branch to deploy."
fi
