const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const AWS = require('aws-sdk');
const helper=require('./helper/objectservices.js')

// Set the AWS region
AWS.config.update({ region: 'ap-south-1' }); // Replace 'us-east-1' with your desired region

const dynamodb = new AWS.DynamoDB();
app.use(express.json());
// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/createTable/:tableName', (req, res) => {
  const params = {
    TableName: req.params.tableName,
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
      res.send(err)
      console.error('Error creating table:', err);
    } else {
      res.send(data)
      console.log('Table created successfully:', data);
    }
  });
});


app.post('/addItem/:tableName/:id', (req, res) => {
  let help=new helper()
  let obj=help.convertToDynamoDBFormat(req.body)
  const params = {
    TableName: req.params.tableName,
    Item: {
      id: { N: req.params.id }
    }
  };
  params.Item={...params.Item,...obj}
  console.log(params)

  dynamodb.putItem(params, (err, data) => {
    if (err) {
      res.send(err);
      console.error('Error adding item:', err);
    } else {
      res.send(req.params.id)
      console.log('Item added successfully:', params.Item);
    }
  });
});

app.post('/deletetable/:tableName', (req, res) => {
  const params = {
    TableName: req.params.tableName, // Replace with the name of your table
  };
  
  dynamodb.deleteTable(params, (err, data) => {
    if (err) {
      console.error('Error deleting table:', err);
    } else {
      console.log('Table deleted successfully:', data);
    }
  });
});
app.get('/getwholetableItem/:tableName', (req, res) => {
  let dynamodb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: req.params.tableName, // Replace with the name of your table
  };  
  dynamodb.scan(params, (err, data) => {
    if (err) {
      console.error('Error retrieving table data:', err);
    } else {
      console.log('Table data retrieved successfully:', data.Items);
    }
  });
});
app.get('/getsingleItem/:tableName/:id', (req, res) => {
  const params = {
    TableName:req.params.tableName, // Replace with the name of your table
    Key: {
      id: req.params.id, // Replace 'id' with the name of your primary key attribute and '1' with the desired value
    },
  };
  
  dynamodb.get(params, (err, data) => {
    if (err) {
      console.error('Error retrieving item:', err);
      res.status(500).send('Error retrieving item');
    } else {
      console.log('Item retrieved successfully:', data.Item);
      res.status(200).json(data.Item);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
