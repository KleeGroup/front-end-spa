#! /bin/sh
BOWER_PATH="bower_components"
ASSETS_FONTS="app/assets/fonts/"
echo '# Copy fonts:'

echo '- font-awesome:'
cp $BOWER_PATH/font-awesome/fonts/* $ASSETS_FONTS

echo '- bootstrap:'
cp $BOWER_PATH/bootstrap/dist/fonts/* $ASSETS_FONTS