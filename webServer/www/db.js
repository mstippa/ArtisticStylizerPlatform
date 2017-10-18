var mysql = require('mysql');
var async = require('async');

var PRODUCTION_DB = 'asp_database';
var TEST_DB = 'asp_test_database';

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

var state = {
  pool: null,
  mode: null,
}

exports.connect = function(mode, done) {
  if (mode === exports.MODE_PRODUCTION) {
    state.pool = mysql.createPoolCluster();

    state.pool.add('WRITE', {
      host: 'localhost',
      user: 'asp_read_write',
      password: 'readWrite',
      database: PRODUCTION_DB
    });

    state.pool.add('READ', {
      host: 'localhost',
      user: 'asp_read_only',
      password: 'readOnly',
      database: PRODUCTION_DB
    });
  } else {
    state.pool = mysql.createPool({
      host: 'localhost',
      user: 'asp_read_write',
      password: 'readWrite',
      database: TEST_DB
    });
  }

  state.mode = mode;
  done();

}

exports.READ = 'READ';
exports.WRITE = 'WRITE';


exports.get = function(type, done) {
	var pool = state.pool;
	if(!pool) return done(new Error('Missing database connection dummy'));

	if(type === exports.WRITE){
		state.pool.getConnection('WRITE', function (err, connection){
			if(err) return done(err);
			done(null, connection);
		});
	} else {
		state.pool.getConnection('READ', function(err, connection) {
			if (err) return done(err);
			done(null, connection);
		});
	}
}