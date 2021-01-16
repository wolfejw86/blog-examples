CREATE EXTENSION pgcrypto; 

create table users (
  id uuid PRIMARY KEY default gen_random_uuid(),
  username text not null UNIQUE,
  password text not null
);
