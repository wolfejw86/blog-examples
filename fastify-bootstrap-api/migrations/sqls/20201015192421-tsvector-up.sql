alter table notes
add column body_vector tsvector default null;

update notes
set body_vector = to_tsvector('pg_catalog.english', substring(body, 1, 1000000));

alter table notes
alter column body_vector set not null;

create index idx_body_vector_gin ON notes USING GIN(body_vector);
