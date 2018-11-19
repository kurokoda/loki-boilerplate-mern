#!/usr/bin/env bash
echo removing previous build
rm -rf build
echo removing previous node modules
rm -rf node-modules
react-scripts build
