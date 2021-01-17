create extension if not exists pgcrypto;

create table users (
  id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  username text not null UNIQUE,
  password_hash text not null
);

create index idx_users_username ON users(username);
