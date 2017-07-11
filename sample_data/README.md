About Sample Data
=======================

These are small snippets from our database, and should expose every possible type of input you should see.
Below is part of the SQL used to create the table. If you don't know SQL it's fine, but I think you can understand what the types are from this rather easily. The database is PostgresSQL.


```SQL
"entry_num" Bigint DEFAULT nextval('record_counter'::regclass) NOT NULL,  -- Not important
"userid" Character Varying( 255 ) NOT NULL,
"deviceid" Character Varying( 255 ) NOT NULL,
"sense_time" Timestamp Without Time Zone NOT NULL,  -- The time at which the location update was recorded (YYYY-MM-DD hh:mm:ss)
"sense_time_millisec" Bigint NOT NULL,  -- Same time, but in milliseconds
"upload_time" Timestamp Without Time Zone DEFAULT ('now'::text)::timestamp(0) with time zone,  -- Time when it reached our server
"sensor_type" Character Varying( 50 ) NOT NULL,  -- 'location' always
"os" Character Varying( 100 ) NOT NULL,  -- iOS or Android
"version" Character Varying( 255 ) NOT NULL,  -- app version
"latitude" Numeric( 11, 8 ) NOT NULL,  -- 11 digits long total, but 8 digits after decimal point
"longitude" Numeric( 11, 8 ) NOT NULL,
"provider" Character Varying( 50 ) NOT NULL,  -- GPS/gps/network/Network (just realized this ... just cast them all to lowercase)
"accuracy" Integer NOT NULL,  -- How far off (i.e. error) in meters is the measurement
"speed" Integer NOT NULL,  -- meters/second
"bearing" Integer,  -- direction
"config_accuracy" Character Varying( 255 ) NOT NULL,
CONSTRAINT "location_ak_userid_sense_time_millisec_provider" UNIQUE( "userid", "sense_time_millisec", "provider" ) );  -- a row is unique based on the userid, sense_time_millisec, and provider
```
