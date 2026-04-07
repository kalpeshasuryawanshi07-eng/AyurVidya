const mongoose = require('mongoose');
const connectDB = require('./database');

// Mock the config module
jest.mock('./env', () => ({
  mongodbUri: 'mongodb://localhost:27017/test-db',
  nodeEnv: 'test',
}));

describe('Database Connection', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(async () => {
    // Close connection after each test
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  });

  describe('connectDB', () => {
    it('should connect to MongoDB successfully', async () => {
      // Mock mongoose.connect to resolve successfully
      const mockConnection = {
        connection: {
          host: 'localhost',
          name: 'test-db',
        },
      };
      jest.spyOn(mongoose, 'connect').mockResolvedValue(mockConnection);

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const result = await connectDB();

      expect(mongoose.connect).toHaveBeenCalledWith(
        'mongodb://localhost:27017/test-db',
        expect.objectContaining({
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
      );
      expect(result).toEqual(mockConnection);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('MongoDB Connected')
      );

      consoleSpy.mockRestore();
    });

    it('should handle connection errors and exit process', async () => {
      // Mock mongoose.connect to reject with error
      const mockError = new Error('Connection failed');
      jest.spyOn(mongoose, 'connect').mockRejectedValue(mockError);

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();

      await connectDB();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('MongoDB Connection Failed')
      );
      expect(processExitSpy).toHaveBeenCalledWith(1);

      consoleErrorSpy.mockRestore();
      processExitSpy.mockRestore();
    });

    it('should log connection details on successful connection', async () => {
      const mockConnection = {
        connection: {
          host: 'localhost',
          name: 'test-db',
        },
      };
      jest.spyOn(mongoose, 'connect').mockResolvedValue(mockConnection);

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      await connectDB();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('MongoDB Connected: localhost')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Database: test-db')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Environment: test')
      );

      consoleSpy.mockRestore();
    });
  });
});
