## Blog With NodeJS and ExpressJS

### Install

```
npm install
```

```
create database db_blog;
```

```
create table blog
(
id serial primary key,
name varchar(50) not null,
title varchar not null,
user_id integer not null references user,
body text
img varchar
created_at timestamp not null,
updated_at timestamp
);

create table user
(
id serial primary key,
name varchar not null,
email varchar not null unique ,
password varchar not null
);
```

### API Spec

- Host: `localhost`
- Port: `3000`
- For Testing: [Blog](https://documenter.getpostman.com/view/21912533/VUxRNkrb)
