/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": "",
    "deleteRule": "@request.auth.collectionName = '_superusers'",
    "fields": [
      { "autogeneratePattern": "[a-z0-9]{15}", "hidden": false, "id": "text_st_id", "max": 15, "min": 15, "name": "id", "pattern": "^[a-z0-9]+$", "presentable": false, "primaryKey": true, "required": true, "system": true, "type": "text" },
      { "hidden": false, "id": "text_st_name", "name": "name", "presentable": false, "primaryKey": false, "required": true, "system": false, "type": "text", "autogeneratePattern": "", "max": 0, "min": 0, "pattern": "" },
      { "hidden": false, "id": "email_st_email", "name": "email", "presentable": false, "primaryKey": false, "required": true, "system": false, "type": "email", "exceptDomains": [], "onlyDomains": [] },
      { "hidden": false, "id": "text_st_subject", "name": "subject", "presentable": false, "primaryKey": false, "required": true, "system": false, "type": "text", "autogeneratePattern": "", "max": 200, "min": 0, "pattern": "" },
      { "hidden": false, "id": "text_st_message", "name": "message", "presentable": false, "primaryKey": false, "required": true, "system": false, "type": "text", "autogeneratePattern": "", "max": 2000, "min": 0, "pattern": "" },
      { "hidden": false, "id": "select_st_status", "name": "status", "presentable": false, "primaryKey": false, "required": false, "system": false, "type": "select", "maxSelect": 1, "values": ["open", "in_progress", "closed"] },
      { "hidden": false, "id": "select_st_priority", "name": "priority", "presentable": false, "primaryKey": false, "required": false, "system": false, "type": "select", "maxSelect": 1, "values": ["low", "medium", "high"] },
      { "hidden": false, "id": "text_st_reply", "name": "adminReply", "presentable": false, "primaryKey": false, "required": false, "system": false, "type": "text", "autogeneratePattern": "", "max": 0, "min": 0, "pattern": "" },
      { "hidden": false, "id": "autodate_st_created", "name": "created", "onCreate": true, "onUpdate": false, "presentable": false, "system": false, "type": "autodate" },
      { "hidden": false, "id": "autodate_st_updated", "name": "updated", "onCreate": true, "onUpdate": true, "presentable": false, "system": false, "type": "autodate" }
    ],
    "id": "pbc_support_tickets_01",
    "indexes": [],
    "listRule": "@request.auth.collectionName = '_superusers'",
    "name": "support_tickets",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.collectionName = '_superusers'",
    "viewRule": "@request.auth.collectionName = '_superusers'"
  });

  try {
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("Collection name must be unique")) { return; }
    throw e;
  }
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("pbc_support_tickets_01");
    return app.delete(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) { return; }
    throw e;
  }
});
