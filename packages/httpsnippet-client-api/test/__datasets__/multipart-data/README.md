This test case is testing that when we have HAR `postData` of a file and the `value` is present within the HAR we should still prioritize the `fileName` within the code snippet.

```js
"postData": {
  "mimeType": "multipart/form-data",
  "params": [
    {
      "name": "foo",
      "value": "Hello World",
      "fileName": "test/__fixtures__/files/hello.txt",
      "contentType": "text/plain"
    }
  ]
}
```
