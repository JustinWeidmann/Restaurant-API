db.createCollection("Restaurants", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "chain", "location"],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' of the restauant is required and is a string"
        },
        chain: {
          bsonType: "bool",
          description: "Is the resteraunt a chain or not is a bool"
        },
        location: {
          bsonType: ["object"],
          required: ['type', 'coordinates'],
          properties: {
            "type": { bsonType: ["array"] },
            "coordinates": { bsonType: ["int"] }
        },
            description: "Discribes the location as a geoJson type"
        },
        menu: {
          bsonType: ["object"],
          description: "Discribes the restaurants menu in standerd json"
        },
        hours: {
          bsonType: ["object"],
          required: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
          description: "Hours of operation as a list of isoOpen, isoClose"
        },
        catagories: {
            bsonType: ["array"],
            description: "Catagories of resturants"
        },
        cuisene: {
            bsonType: ["array"],
            description: "Catagories of resturants"
        }
      }
    }
  }
});