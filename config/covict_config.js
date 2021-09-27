var convict = require('convict');
const convict_format_with_validator = require('convict-format-with-validator');

// Add all formats
convict.addFormats(convict_format_with_validator);

// Define a schema
var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 6000,
    arg: 'port'
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'dummy',
      arg:'db_host'
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'dummy',
      arg:'db_name'
    }
  }
});
var env = config.get('env');

config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config;