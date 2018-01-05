const fs = require('fs');
const path = require('path');
const assert = require('assert');

const fileUtils = require('../../utils/file-utils');

describe('file-utils', () => {
  describe('#isUrl', () => {
    it('should return true if valid url', () => {
      assert(fileUtils.isUrl('https://google.com'));
    });

    it('should return false if not valid url', () => {
      assert.equal(false, fileUtils.isUrl('/path/to/image'));
    });
  });

  describe('#streamToBuffer', () => {
    it('should convert stream to buffer', async () => {
      const filePath = path.join(__dirname, './utils.test.js');
      const stream = fs.createReadStream(filePath);
      const file = fs.readFileSync(filePath);
      const buffer = await fileUtils.streamToBuffer(stream);
      assert.equal(buffer.toString(), file.toString());
    });
  });

  describe('#parseFileResponse', () => {
    it('should convert a buffer response to our file type', () => {
      const file = fs.readFileSync(path.join(__dirname, '../fixtures/image.JPG'));
      const response = JSON.stringify(file);
      const parsedResponse = fileUtils.parseFileResponse(response);

      assert.equal(parsedResponse.type, 'jpg');
      assert.equal(Buffer.isBuffer(parsedResponse.file), true);
    });

    it('Should work if buffer is in nested object', () => {
      const file = fs.readFileSync(path.join(__dirname, '../fixtures/image.JPG'));
      const response = JSON.stringify({
        file: {
          test: 1,
          file,
        },
        width: 100,
      });
      const parsedResponse = fileUtils.parseFileResponse(response);

      assert.equal(parsedResponse.file.file.type, 'jpg');
      assert.equal(Buffer.isBuffer(parsedResponse.file.file.file), true);
      assert.equal(parsedResponse.file.test, 1);
      assert.equal(parsedResponse.width, 100);
    });

    it('Should work if response is single value', () => {
      const response = 1;
      const parsedResponse = fileUtils.parseFileResponse(response);
      assert.equal(response, parsedResponse);
    });
  });

  describe('#convertToFileType', () => {
    it('should convert streams to file type', async () => {
      const data = {
        image: fs.createReadStream(path.join(__dirname, '../fixtures/image.JPG')),
      };
      const imageBuffer = fs.readFileSync(path.join(__dirname, '../fixtures/image.JPG'));
      const parsedData = await fileUtils.convertToFileType(data);
      assert.deepEqual(parsedData, {
        image: {
          file: JSON.parse(JSON.stringify(imageBuffer)),
          type: 'jpg',
        },
      });
    });

    it('should convert buffers to file type', async () => {
      const data = {
        image: fs.readFileSync(path.join(__dirname, '../fixtures/image.JPG')),
      };

      const parsedData = await fileUtils.convertToFileType(data);
      assert.deepEqual(parsedData, {
        image: {
          file: JSON.parse(JSON.stringify(data.image)),
          type: 'jpg',
        },
      });
    });

    it('should leave other types alone', async () => {
      const data = {
        a: 1,
        b: 2,
      };

      const parsedData = await fileUtils.convertToFileType(data);
      assert.deepEqual(data, parsedData);
    });

    it('should leave original object unmodified', async () => {
      const data = {
        image: fs.readFileSync(path.join(__dirname, '../fixtures/image.JPG')),
      };
      const originalData = Object.assign({}, data);
      await fileUtils.convertToFileType(data);
      assert.deepEqual(data, originalData);
    });
  });
});
