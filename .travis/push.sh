#!/bin/sh
setup_git() {
  git config --global user.email "contact@democracy-deutschland.de"
  git config --global user.name "Travis CI"
}
commit_ios_files() {
  git checkout $TRAVIS_BRANCH
  git pull --quiet
  git add .
  git reset -- packages/mobile-app/ios/Podfile.lock
  git reset -- packages/mobile-ui/ios/Podfile.lock
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER (no-deploy)"
}
upload_files() {
  git push --quiet
}
setup_git
commit_ios_files
upload_files