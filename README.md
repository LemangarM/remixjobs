# Remixjobs

> Unofficial Remixjobs API

## Introduction

[RemixJobs](https://remixjobs.com/) is the best French job board for the Web Industry.

Today, no (un)official API was developed to allow developers to add jobs in their web application

## Our Files Structure
  
    - app/
    ----- models/
    ---------- job.js    // our job model
    - node_modules/     // created by npm. holds our dependencies/packages
    - package.json      // define all our node app and dependencies
    - server.js         // Scraping, configure our application and create routes

## Stack

* Node.js
* Express 4
* MongoDB
* Postman
* mongoose
* Cheerio

## How to install our API

* Installing Our Node Packages (command line in the root "npm install")
* Run mongod at bin mongoDB folder
* Starting our server. From the command line "node server.js")
* API run & waiting for a request.

## API description

We could define a job by its

1. Job title
1. Company
1. Localization
1. Category
1. Contract
1. Date
1. Tags

## How to use our API

* For Scraping follow this link [http://localhost:8080/scrape](http://localhost:8080/scrape)
* Then to have the results of your queries, follow this link [http://localhost:8080/api](http://localhost:8080/api)

###with

### /jobs

* Return all jobs
* Create a new job
* Return information of a job
* Update a jobs


### /jobs/job_id

* Return job with this id

### /jobs/latest

* Return all jobs of the current day

### /companies

* Return all companies

### /companies?company=name_of_company

* Return all jobs of a this company

## Licence

[Uncopyrighted](http://zenhabits.net/uncopyright/)
