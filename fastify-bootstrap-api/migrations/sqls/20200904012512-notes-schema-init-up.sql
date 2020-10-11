create table notes (
	id serial not null primary key,
	title text not null,
	body text not null,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);