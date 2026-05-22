/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const usersCollection = app.findCollectionByNameOrId("users");

  const collection = new Collection({
    "createRule": "@request.auth.id != ''",
    "deleteRule": "userId = @request.auth.id",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3120831001",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "relation8820491002",
        "name": "userId",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "relation",
        "cascadeDelete": false,
        "collectionId": usersCollection.id,
        "displayFields": [],
        "maxSelect": 1,
        "minSelect": 0
      },
      {
        "hidden": false,
        "id": "text4921830003",
        "name": "arenaName",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text",
        "autogeneratePattern": "",
        "max": 0,
        "min": 0,
        "pattern": ""
      },
      {
        "hidden": false,
        "id": "text9210483004",
        "name": "date",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text",
        "autogeneratePattern": "",
        "max": 0,
        "min": 0,
        "pattern": ""
      },
      {
        "hidden": false,
        "id": "text7382910005",
        "name": "timeSlot",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text",
        "autogeneratePattern": "",
        "max": 0,
        "min": 0,
        "pattern": ""
      },
      {
        "hidden": false,
        "id": "number1029384006",
        "name": "players",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "number",
        "max": 4,
        "min": 1,
        "onlyInt": true
      },
      {
        "hidden": false,
        "id": "select6710293007",
        "name": "status",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "select",
        "maxSelect": 1,
        "values": ["confirmed", "pending", "cancelled"]
      },
      {
        "hidden": false,
        "id": "autodate1928374008",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate8374651009",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_9102837461",
    "indexes": [],
    "listRule": "userId = @request.auth.id",
    "name": "bookings",
    "system": false,
    "type": "base",
    "updateRule": "userId = @request.auth.id",
    "viewRule": "userId = @request.auth.id"
  });

  try {
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("Collection name must be unique")) {
      console.log("Collection already exists, skipping");
      return;
    }
    throw e;
  }
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("pbc_9102837461");
    return app.delete(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
});
