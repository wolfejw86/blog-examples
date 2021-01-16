module.exports = () => {
  process.env.POSTGRES_URI = 'postgres://notes_admin:localhost@localhost:5432/notes_db_test'
  process.env.SESSION_SECRET = new Array(32).fill('a').join('');
  process.env.NODE_ENV = 'development';
}