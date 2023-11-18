FROM postgres:16

# Copy the SQL dump file into the container
COPY ./database_backup.sql /docker-entrypoint-initdb.d/

# Grant permissions for the SQL dump file
RUN chown postgres:postgres /docker-entrypoint-initdb.d/database_backup.sql


EXPOSE 5432

