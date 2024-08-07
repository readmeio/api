const PostPerformerSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Performer name"
      },
      "birthName": {
        "type": "string",
        "description": "Performer birth name"
      },
      "gender": {
        "type": "string",
        "description": "Performer gender"
      },
      "dateOfBirthFrom": {
        "type": "string",
        "description": "Minimal date the performer was born",
        "format": "date"
      },
      "dateOfBirthTo": {
        "type": "string",
        "description": "Maximal date the performer was born",
        "format": "date"
      },
      "placeOfBirth": {
        "type": "string",
        "description": "Place the performer was born"
      },
      "dateOfDeathFrom": {
        "type": "string",
        "description": "Minimal date the performer died",
        "format": "date"
      },
      "dateOfDeathTo": {
        "type": "string",
        "description": "Maximal date the performer died",
        "format": "date"
      },
      "placeOfDeath": {
        "type": "string",
        "description": "Place the performer died"
      },
      "animalPerformer": {
        "type": "boolean",
        "description": "Whether it should be an animal performer"
      },
      "disPerformer": {
        "type": "boolean",
        "description": "Whether it should be a performer that appeared in Star Trek: Discovery"
      },
      "ds9Performer": {
        "type": "boolean",
        "description": "Whether it should be a performer that appeared in Star Trek: Deep Space Nine"
      },
      "entPerformer": {
        "type": "boolean",
        "description": "Whether it should be a performer that appeared in Star Trek: Enterprise"
      },
      "filmPerformer": {
        "type": "boolean",
        "description": "Whether it should be a performer that appeared in a Star Trek movie"
      },
      "standInPerformer": {
        "type": "boolean",
        "description": "Whether it should be a stand-in performer"
      },
      "stuntPerformer": {
        "type": "boolean",
        "description": "Whether it should be a stunt performer"
      },
      "tasPerformer": {
        "type": "boolean",
        "description": "Whether it should be a performer that appeared in Star Trek: The Animated Series"
      },
      "tngPerformer": {
        "type": "boolean",
        "description": "Whether it should be a performer that appeared in Star Trek: The Next Generation"
      },
      "tosPerformer": {
        "type": "boolean",
        "description": "Whether it should be a performer that appeared in Star Trek: The Original Series"
      },
      "videoGamePerformer": {
        "type": "boolean",
        "description": "Whether it should be a video game performer"
      },
      "voicePerformer": {
        "type": "boolean",
        "description": "Whether it should be a voice performer"
      },
      "voyPerformer": {
        "type": "boolean",
        "description": "Whether it should be a performer that appeared in Star Trek: Voyager"
      }
    },
    "type": "object",
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "pageNumber": {
            "type": "integer",
            "format": "int32",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Zero-based page number"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Page size"
          },
          "sort": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Sorting, serialized like this: fieldName,ASC;anotherFieldName,DESC"
          },
          "apiKey": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "API key"
          }
        },
        "required": []
      }
    ]
  }
} as const;
export default PostPerformerSearch
