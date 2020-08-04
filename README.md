# Proffy:
## *App Backend*

## Content

1. [Motivation](#Motivation) 
2. [Requirements](#Requirements)
3. [API](#API)
    - [Survivors](#Classes)
    - [Flags](#Connections)
4. [Additional Notes](#AdditionalNotes)

## Motivation

This repository holds the API for a project called [`Proffy`](https://proffys.vercel.app/), created during [Next Level Week #2](https://nextlevelweek.com/inscricao/2). In this bootcamp, we created a platform in which teachers can promote their services and students can get in contact with them.

You can run it by cloning the repository. Execute the command `npm run knex:migrate` then `npm run start`.

## Requirements

Express, cors, typescript, ts-node-dev, knex and sqlite3.

## Api
## *Classes*

#### Create
Create new classes.
##### Endpoint
`POST /classes`
##### Request paramenter
`{
	"name": "Some Dude/Chick",
	"avatar": "www.some_place.com/some_image_location",
	"whatsapp": "07XXXXXXXX",
	"bio" : "Freedom or jail, clips inserted, a baby's being born, Same time my man is murdered, the beginning and end, As far as rap goes, it's only natural, I explain, My plateau, and also, what defines my name",
	"subject": "Music",
	"cost": 80,
	"schedule": [
	{ "week_day": 1, "from": "8:00", "to": "12:00" },
	{ "week_day": 2, "from": "10:00", "to": "18:00" },
	{ "week_day": 5, "from": "12:00", "to": "20:00" }
	]
}`
##### Response paramenter
`Status 201 or error message`
#### Retrieve
Retrieve class details.
##### Endpoint
`GET /classes` `?week_day=1&subject=Music&time=9%3A00`
##### Query paramenter
`week_day`, `subject`, `time`
##### Response paramenter
`{
	"name": "Some Dude/Chick",
	"avatar": "www.some_place.com/some_image_location",
	"whatsapp": "0797XXXXXX",
	"bio" : "Freedom or jail, clips inserted, a baby's being born, Same time my man is murdered, the beginning and end, As far as rap goes, it's only natural, I explain, My plateau, and also, what defines my name",
	"subject": "Music",
	"cost": 80,
	"schedule": [
	{ "week_day": 1, "from": "8:00", "to": "12:00" },
	{ "week_day": 2, "from": "10:00", "to": "18:00" },
	{ "week_day": 5, "from": "12:00", "to": "20:00" }
	]
}`
#### Update
Still needs implementation
##### Endpoint
`PUT`
#### Request parameter
``
##### Query paramenter
``
##### Response paramenter
``

## *Connections*

#### Create
Create connections
##### Endpoint
`POST /connections`
##### Request paramenter
`No params`
##### Response paramenter
`Status 201 or error`
#### Retrieve
Visualize connection count
##### Endpoint
`GET /connections`
##### Response parameter
`{ "total": 1 }`

## Additional Notes
