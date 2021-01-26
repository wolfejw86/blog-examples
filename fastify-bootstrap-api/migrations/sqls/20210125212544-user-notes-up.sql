ALTER TABLE notes
ADD COLUMN user_id uuid NOT NULL;

ALTER TABLE notes
ADD CONSTRAINT fk_user_id_notes FOREIGN KEY(user_id) REFERENCES users(id);

CREATE INDEX idx_users_notes ON notes(user_id);
