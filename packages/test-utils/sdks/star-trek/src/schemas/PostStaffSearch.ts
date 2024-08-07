const PostStaffSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Staff name"
      },
      "birthName": {
        "type": "string",
        "description": "Staff birth name"
      },
      "gender": {
        "type": "string",
        "description": "Staff gender"
      },
      "dateOfBirthFrom": {
        "type": "string",
        "description": "Minimal date the staff was born",
        "format": "date"
      },
      "dateOfBirthTo": {
        "type": "string",
        "description": "Maximal date the staff was born",
        "format": "date"
      },
      "placeOfBirth": {
        "type": "string",
        "description": "Place the staff was born"
      },
      "dateOfDeathFrom": {
        "type": "string",
        "description": "Minimal date the staff died",
        "format": "date"
      },
      "dateOfDeathTo": {
        "type": "string",
        "description": "Maximal date the staff died",
        "format": "date"
      },
      "placeOfDeath": {
        "type": "string",
        "description": "Place the staff died"
      },
      "artDepartment": {
        "type": "boolean",
        "description": "Whether this person should be from art department"
      },
      "artDirector": {
        "type": "boolean",
        "description": "Whether this person should be an art director"
      },
      "productionDesigner": {
        "type": "boolean",
        "description": "Whether this person should be a production designer"
      },
      "cameraAndElectricalDepartment": {
        "type": "boolean",
        "description": "Whether this person should be from camera and electrical department"
      },
      "cinematographer": {
        "type": "boolean",
        "description": "Whether this person should be a cinematographer"
      },
      "castingDepartment": {
        "type": "boolean",
        "description": "Whether this person should be from casting department"
      },
      "costumeDepartment": {
        "type": "boolean",
        "description": "Whether this person should be from costume department"
      },
      "costumeDesigner": {
        "type": "boolean",
        "description": "Whether this person should be a custume designer"
      },
      "director": {
        "type": "boolean",
        "description": "Whether this person should be a director"
      },
      "assistantOrSecondUnitDirector": {
        "type": "boolean",
        "description": "Whether this person should be an assistant or secound unit director director"
      },
      "exhibitAndAttractionStaff": {
        "type": "boolean",
        "description": "Whether this person should be an exhibit and attraction staff"
      },
      "filmEditor": {
        "type": "boolean",
        "description": "Whether this person should be a film editor"
      },
      "linguist": {
        "type": "boolean",
        "description": "Whether this person should be a linguist"
      },
      "locationStaff": {
        "type": "boolean",
        "description": "Whether this person should be a location staff"
      },
      "makeupStaff": {
        "type": "boolean",
        "description": "Whether this person should be a make-up staff"
      },
      "musicDepartment": {
        "type": "boolean",
        "description": "Whether this person should be from music department"
      },
      "composer": {
        "type": "boolean",
        "description": "Whether this person should be a composer"
      },
      "personalAssistant": {
        "type": "boolean",
        "description": "Whether this person should be a personal assistant"
      },
      "producer": {
        "type": "boolean",
        "description": "Whether this person should be a producer"
      },
      "productionAssociate": {
        "type": "boolean",
        "description": "Whether this person should be a production associate"
      },
      "productionStaff": {
        "type": "boolean",
        "description": "Whether this person should be a production staff"
      },
      "publicationStaff": {
        "type": "boolean",
        "description": "Whether this person should be a publication staff"
      },
      "scienceConsultant": {
        "type": "boolean",
        "description": "Whether this person should be a science consultant"
      },
      "soundDepartment": {
        "type": "boolean",
        "description": "Whether this person should be from sound department"
      },
      "specialAndVisualEffectsStaff": {
        "type": "boolean",
        "description": "Whether this person should be a special and visual effects staff"
      },
      "author": {
        "type": "boolean",
        "description": "Whether this person should be an author"
      },
      "audioAuthor": {
        "type": "boolean",
        "description": "Whether this person should be an audio author"
      },
      "calendarArtist": {
        "type": "boolean",
        "description": "Whether this person should be a calendar artist"
      },
      "comicArtist": {
        "type": "boolean",
        "description": "Whether this person should be a comic artist"
      },
      "comicAuthor": {
        "type": "boolean",
        "description": "Whether this person should be a comic author"
      },
      "comicColorArtist": {
        "type": "boolean",
        "description": "Whether this person should be a comic color artist"
      },
      "comicInteriorArtist": {
        "type": "boolean",
        "description": "Whether this person should be a comic interior artist"
      },
      "comicInkArtist": {
        "type": "boolean",
        "description": "Whether this person should be a comic ink artist"
      },
      "comicPencilArtist": {
        "type": "boolean",
        "description": "Whether this person should be a comic pencil artist"
      },
      "comicLetterArtist": {
        "type": "boolean",
        "description": "Whether this person should be a comic letter artist"
      },
      "comicStripArtist": {
        "type": "boolean",
        "description": "Whether this person should be a comic strip artist"
      },
      "gameArtist": {
        "type": "boolean",
        "description": "Whether this person should be a game artist"
      },
      "gameAuthor": {
        "type": "boolean",
        "description": "Whether this person should be a game author"
      },
      "novelArtist": {
        "type": "boolean",
        "description": "Whether this person should be a novel artist"
      },
      "novelAuthor": {
        "type": "boolean",
        "description": "Whether this person should be a novel author"
      },
      "referenceArtist": {
        "type": "boolean",
        "description": "Whether this person should be a reference artist"
      },
      "referenceAuthor": {
        "type": "boolean",
        "description": "Whether this person should be a reference author"
      },
      "publicationArtist": {
        "type": "boolean",
        "description": "Whether this person should be a publication artist"
      },
      "publicationDesigner": {
        "type": "boolean",
        "description": "Whether this person should be a publication designer"
      },
      "publicationEditor": {
        "type": "boolean",
        "description": "Whether this person should be a publication editor"
      },
      "publicityArtist": {
        "type": "boolean",
        "description": "Whether this person should be a publicity artist"
      },
      "cbsDigitalStaff": {
        "type": "boolean",
        "description": "Whether this person should be a part of CBS digital staff"
      },
      "ilmProductionStaff": {
        "type": "boolean",
        "description": "Whether this person should be a part of ILM production staff"
      },
      "specialFeaturesStaff": {
        "type": "boolean",
        "description": "Whether this person should be a special features artist"
      },
      "storyEditor": {
        "type": "boolean",
        "description": "Whether this person should be a story editor"
      },
      "studioExecutive": {
        "type": "boolean",
        "description": "Whether this person should be a studio executive"
      },
      "stuntDepartment": {
        "type": "boolean",
        "description": "Whether this person should be from stunt department"
      },
      "transportationDepartment": {
        "type": "boolean",
        "description": "Whether this person should be from transportation department"
      },
      "videoGameProductionStaff": {
        "type": "boolean",
        "description": "Whether this person is video game production staff"
      },
      "writer": {
        "type": "boolean",
        "description": "Whether this person should be a writer"
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
export default PostStaffSearch
