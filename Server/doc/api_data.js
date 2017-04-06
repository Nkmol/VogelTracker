define({ "api": [
  {
    "type": "get",
    "url": "/birds/:id",
    "title": "Request Bird",
    "name": "GetBird",
    "group": "Bird",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>bird ID <code>match(/^[0-9a-fA-F]{24}$/)</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "text",
            "optional": false,
            "field": "400/BadRequest",
            "description": "<p>Please provide a valid '_id'</p>"
          },
          {
            "group": "Error 4xx",
            "type": "text",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You have not provided your Token credentials as header request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "modules/birds/router.js",
    "groupTitle": "Bird",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "-",
            "description": "<p>array of Birds</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-.name",
            "description": "<p>name of the Bird.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-.latinname",
            "description": "<p>latin_name of the Bird.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-.information",
            "description": "<p>some information about the bird</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-.trend_and_amount",
            "description": "<p>trends and history about the bird.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/birds/",
    "title": "Update Bird",
    "name": "UpdateBird",
    "group": "Bird",
    "version": "0.0.0",
    "filename": "modules/birds/router.js",
    "groupTitle": "Bird",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 204": [
          {
            "group": "Error 204",
            "type": "text",
            "optional": false,
            "field": "204/NoContent",
            "description": "<p>Please provide values with your PUT request'</p>"
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 400",
            "type": "text",
            "optional": false,
            "field": "400/BadRequest",
            "description": "<p>Please provide a valid '_id'</p>"
          },
          {
            "group": "Error 401",
            "type": "text",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You have not provided your Token credentials as header request</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Body": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>bird ID <code>match(/^[0-9a-fA-F]{24}$/)</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the Bird.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "latin_name",
            "description": "<p>latin_name of the Bird.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "information",
            "description": "<p>some information about the bird</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trend_and_amount",
            "description": "<p>trends and history about the bird.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/birds/",
    "title": "Delete Bird",
    "name": "DeleteBird",
    "group": "Bird",
    "version": "0.0.0",
    "filename": "modules/birds/router.js",
    "groupTitle": "Bird",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 400",
            "type": "text",
            "optional": false,
            "field": "401/BadRequest",
            "description": "<p>Please provide a valid '_id'</p>"
          },
          {
            "group": "Error 401",
            "type": "text",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You have not provided your Token credentials as header request</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Body": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>bird ID <code>match(/^[0-9a-fA-F]{24}$/)</code></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/birds/",
    "title": "Request Bird Collecton",
    "name": "GetBirds",
    "group": "Bird",
    "version": "0.0.0",
    "filename": "modules/birds/router.js",
    "groupTitle": "Bird",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "text",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You have not provided your Token credentials as header request</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "-",
            "description": "<p>array of Birds</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-.name",
            "description": "<p>name of the Bird.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-.latinname",
            "description": "<p>latin_name of the Bird.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-.information",
            "description": "<p>some information about the bird</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-.trend_and_amount",
            "description": "<p>trends and history about the bird.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/register/",
    "title": "Create a User",
    "name": "Register",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username login</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password login</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>emailadress for you account</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "text",
            "optional": false,
            "field": "400/BadRequest",
            "description": "<p>Please provide 'username', 'password' and 'email'</p>"
          },
          {
            "group": "Error 4xx",
            "type": "text",
            "optional": false,
            "field": "409/Conflict",
            "description": "<p>An account has already been registrated to this mailadress.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "-",
            "description": "<p>JSON wrapper</p>"
          },
          {
            "group": "Success 200",
            "type": "text",
            "optional": false,
            "field": "-.message",
            "description": "<p>&quot;ok&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "modules/users/router.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login/",
    "title": "Request JWT Token",
    "name": "Validation",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username login</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password login</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "text",
            "optional": false,
            "field": "400/BadRequest",
            "description": "<p>Please provide 'username' and 'password'</p>"
          },
          {
            "group": "Error 4xx",
            "type": "text",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>Password and/or username did not match</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "-",
            "description": "<p>JSON wrapper</p>"
          },
          {
            "group": "Success 200",
            "type": "text",
            "optional": false,
            "field": "-.message",
            "description": "<p>&quot;ok&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "text",
            "optional": false,
            "field": "-.token",
            "description": "<p>JWT token</p>"
          },
        ]
      }
    },
    "version": "0.0.0",
    "filename": "modules/users/router.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/reports/:id",
    "title": "Request Report",
    "name": "GetReport",
    "group": "Report",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Report ID <code>match(/^[0-9a-fA-F]{24}$/)</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "text",
            "optional": false,
            "field": "400/BadRequest",
            "description": "<p>Please provide a valid '_id'</p>"
          },
          {
            "group": "Error 4xx",
            "type": "text",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You have not provided your Token credentials as header request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "modules/birds/router.js",
    "groupTitle": "Report",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "-",
            "description": "<p>array of Report properties</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-.user_id",
            "description": "<p>user identification</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-.date",
            "description": "<p>the creation date of the report</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-.description",
            "description": "<p>detailed explanation</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-.lat",
            "description": "<p>registered latitude of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "-.long",
            "description": "<p>registered longtitude of the user</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/reports/",
    "title": "Delete Report",
    "name": "DeleteReport",
    "group": "Report",
    "version": "0.0.0",
    "filename": "modules/reports/router.js",
    "groupTitle": "Report",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The JWT-token header: &quot;JWT {{ TOKEN }}&quot;.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 400",
            "type": "text",
            "optional": false,
            "field": "401/BadRequest",
            "description": "<p>Please provide a valid '_id'</p>"
          },
          {
            "group": "Error 401",
            "type": "text",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You have not provided your Token credentials as header request</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Body": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>report ID <code>match(/^[0-9a-fA-F]{24}$/)</code></p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/reports/",
    "title": "Create a Report",
    "name": "Create",
    "group": "Report",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bird_id",
            "description": "<p>bird identification</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>user identification</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>the creation date of the report</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>detailed explanation</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lat",
            "description": "<p>registered latitude of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "long",
            "description": "<p>registered longtitude of the user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "text",
            "optional": false,
            "field": "400/BadRequest",
            "description": "<p>Please provide 'proper report info</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "-",
            "description": "<p>JSON wrapper</p>"
          },
          {
            "group": "Success 200",
            "type": "text",
            "optional": false,
            "field": "-.message",
            "description": "<p>&quot;ok&quot;</p>"
          }
        ]
      }
    },
    
    "version": "0.0.0",
    "filename": "modules/users/router.js",
    "groupTitle": "Report"
  }
] });
