#!/usr/bin/env bash
tslint ./server/**/*.{js,jsx,ts,tsx} ./src/**/*.{js,jsx,ts,tsx} --fix
eslint ./server/**/*.{js,jsx} ./src/**/*.{js,jsx} --fix
