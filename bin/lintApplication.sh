#!/usr/bin/env bash
echo TODO: handle trailing quote and comma dangling rules that is causing these fixes
tslint ./server/**/*.{js,jsx,ts,tsx} ./src/**/*.{js,jsx,ts,tsx} --fix
eslint ./server/**/*.{js,jsx} ./src/**/*.{js,jsx} --fix
