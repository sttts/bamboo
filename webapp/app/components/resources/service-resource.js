module.exports = ["$resource", function ($resource) {
  var index = $resource("/api/services", {},
    {
      get: { method: "GET" },
      create: { method: "POST" },

    });

  var entity = $resource("/api/services/:id", { id: "@id" }, {
    update: { method: "PUT", params: { id: "@id"} },
    destroy: { method: "DELETE", params: { id: "@id"} }
  });

  var encodeId = function (params) {
    params.id = encodeURIComponent(params.id);
    return params;
  };

  return {
    all: function () {
      return index.get().$promise;
    },

    create: function (params) {
      return index.create(params).$promise;
    },

    update: function (params) {
      return entity.update(encodeId(params)).$promise;
    },

    destroy: function (params) {
      return entity.destroy(encodeId(params)).$promise;
    }
  }
}];