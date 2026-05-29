/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_8347793657");

  collection.fields.add({
    "hidden": false, "id": "select_partners_status", "name": "status",
    "presentable": false, "primaryKey": false, "required": false, "system": false,
    "type": "select", "maxSelect": 1, "values": ["pending", "active", "blocked"]
  });
  collection.fields.add({
    "hidden": false, "id": "number_partners_lat", "name": "latitude",
    "presentable": false, "primaryKey": false, "required": false, "system": false,
    "type": "number", "max": null, "min": null, "onlyInt": false
  });
  collection.fields.add({
    "hidden": false, "id": "number_partners_lng", "name": "longitude",
    "presentable": false, "primaryKey": false, "required": false, "system": false,
    "type": "number", "max": null, "min": null, "onlyInt": false
  });
  collection.fields.add({
    "hidden": false, "id": "text_partners_admin_notes", "name": "adminNotes",
    "presentable": false, "primaryKey": false, "required": false, "system": false,
    "type": "text", "autogeneratePattern": "", "max": 0, "min": 0, "pattern": ""
  });

  collection.listRule = "status = 'active' || @request.auth.collectionName = '_superusers'";
  collection.viewRule = "status = 'active' || @request.auth.collectionName = '_superusers'";
  collection.updateRule = "@request.auth.collectionName = '_superusers'";
  collection.deleteRule = "@request.auth.collectionName = '_superusers'";

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_8347793657");
  collection.fields.removeById("select_partners_status");
  collection.fields.removeById("number_partners_lat");
  collection.fields.removeById("number_partners_lng");
  collection.fields.removeById("text_partners_admin_notes");
  collection.listRule = "@request.auth.collectionName = 'admins'";
  collection.viewRule = "@request.auth.collectionName = 'admins'";
  collection.updateRule = "@request.auth.collectionName = 'admins'";
  collection.deleteRule = "@request.auth.collectionName = 'admins'";
  return app.save(collection);
});
