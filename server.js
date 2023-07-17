const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const AWS = require('aws-sdk');

// Set the AWS region
AWS.config.update({ region: 'ap-south-1' }); // Replace 'us-east-1' with your desired region

const dynamodb = new AWS.DynamoDB();

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/createTable', (req, res) => {
  const params = {
    TableName: 'mygymaitable',
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' }, // Replace 'id' with your desired primary key attribute
    ],
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'N' }, // Replace 'id' with your desired primary key attribute
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5, // Set the desired read capacity units
      WriteCapacityUnits: 5, // Set the desired write capacity units
    },
  };

  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created successfully:', data);
    }
  });
});


app.get('/addItem', (req, res) => {
  const params = {
    TableName: 'mygymaitable',
    Item: {
      id: { N: '2' },
      attribute1: { S: 'nothing' },
      attribute2: { N: '1232' },
      attribute3: { S: 'vicky' },
    }
  };
  dynamodb.putItem(params, (err, data) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created successfully:', data);
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
