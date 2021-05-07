# C19trace administration server

### Running
To get started, simply run the following:
`npm install`
`npm run build`
`node server.js`


### About
The administration server for c19trace.
It helps monitors the spread of COVID-19 at GMIT campuses by providing tables and charts based on data retrievedfrom the back-end server.

The application contains two components of note, the dashboard component and the database component.

#### Dashboard component

The dashboard component uses recharts to help monitor the analyse the spreadof COVID-19 in GMIT. Checks ins are separated by month, with non-exposed check ins coloured green and possible exposed check ins coloured red. The second graph shows the per-centage of attendances which have been potentially exposed to COVID-19

#### Database component
The Database component provides a view of the students in the database.
From this component the user can change the current COVID-19 status of astudent or can check for more information, which will show each of attendance by the selected student, along with the date and the exposure status of thatthat token.
