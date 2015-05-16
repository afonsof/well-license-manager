# code-challenge-afonsof

### Running
#### Server
```
npm start
```

#### Tests
```
npm test
```

### Problem Description

#### Background

The Government of Alberta manages the issuing of "well licenses" to companies or agencies who are interested in drilling for oil in the province. They want to deliver information about well licenses to companies and users through both a web app and a mobile app.

The task is to create a "well license" web application that talks to an existing backend REST API located at [petrofeed-coding-challenge.herokuapp.com](http://petrofeed-coding-challenge.herokuapp.com). 

**Note: This is a "live" data source and data may change throughout the course of the code challenge. Feel free to create new records, and edit/delete them too. However, we urge you not to edit/delete records you did not create.** 

The API server has the following end points:

* GET /
* GET /licenses/:id
* POST /licenses
* PUT /licenses/:id
* DELETE /licenses/:id

A typical well license has the following structure:

```json
{
    "_id": "5183016ff995190000000003",
    "applicant": "Paul Smith",
    "wellType": "New Field Wildcat",
    "company": "Suncor Energy",
    "latitude": 56.200876,
    "longitude": -112.714889,
    "dateModified": "2013-05-03T00:12:50.185Z",
    "dateIssued": "2013-05-03T00:12:50.183Z",
    "status": "active"
}
```

A well license can have the following status values:

* "active"
* "confidential"
* "expired"


A well license can have the following well type values:

* "New Field Wildcat"
* "New Pool Wildcat"
* "Deeper Pool Test"
* "Shallower Pool Test"
* "Development Well"


#### Requirements

1. You should be able to create a well license through the web interface

2. You should be able to update a well license through the web interface except for
    * The well Id
    * The date issued
    * The date modified

3. You should be able to delete a well license through the web interface

4. You should be able to view all the well licenses on a map

5. You should be able to view the details of an individual well license


#### Technical Notes

1. The web front-end solution should ideally be deployed/hosted on heroku, or any hosted web endpoint of your choice that can be accessed by PetroFeed in Calgary.

2. Your submission can be developed using any technologies/frameworks you would like.

3. The server always returns the acted on document/documents and/or "errors" field.

4. This private Github repo has been created just for you. Please push your code to it for review.

5. Design and presentation of the data are relevant considerations.
